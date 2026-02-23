import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = loginSchema.parse(body);
    const mockUser = {
      id: '1',
      email: validatedData.email,
      name: 'John Doe',
      role: 'customer',
    };

    const token = Buffer.from(
      JSON.stringify({
        userId: mockUser.id,
        email: mockUser.email,
        exp: Date.now() + (validatedData.rememberMe ? 30 : 7) * 24 * 60 * 60 * 1000,
      })
    ).toString('base64');

    const refreshToken = Buffer.from(
      JSON.stringify({
        userId: mockUser.id,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      })
    ).toString('base64');
    
    const response = NextResponse.json(
      {
        success: true,
        message: 'Login successful',
        data: {
          user: mockUser,
          token,
          refreshToken,
        },
      },
      { status: 200 }
    );

    const cookieMaxAge = validatedData.rememberMe
      ? 30 * 24 * 60 * 60 
      : 7 * 24 * 60 * 60;
    
    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: cookieMaxAge,
      path: '/',
    });
    
    response.cookies.set('refresh_token', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 30 * 24 * 60 * 60, 
      path: '/',
    });
    
    return response;
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: 'Validation error',
          errors: error.errors.map((err) => ({
            field: err.path.join('.'),
            message: err.message,
          })),
        },
        { status: 400 }
      );
    }

    if (error instanceof Error && error.message === 'INVALID_CREDENTIALS') {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        },
        { status: 401 }
      );
    }
    
    console.error('Login error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during login',
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      message: 'Method not allowed',
    },
    { status: 405 }
  );
}