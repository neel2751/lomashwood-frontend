import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';
import { z } from 'zod';

const registerSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(10, 'Phone number must be at least 10 digits'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  acceptTerms: z.boolean().refine((val) => val === true, {
    message: 'You must accept the terms and conditions',
  }),
  newsletter: z.boolean().optional(),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const validatedData = registerSchema.parse(body);

    const existingUser = false; 
    
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'User with this email already exists',
          errors: [
            {
              field: 'email',
              message: 'This email is already registered',
            },
          ],
        },
        { status: 409 }
      );
    }

    const newUser = {
      id: Math.random().toString(36).substring(7),
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      phone: validatedData.phone,
      role: 'customer',
      emailVerified: false,
      newsletter: validatedData.newsletter || false,
      createdAt: new Date().toISOString(),
    };
    const token = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        email: newUser.email,
        exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
      })
    ).toString('base64');
    
    const refreshToken = Buffer.from(
      JSON.stringify({
        userId: newUser.id,
        exp: Date.now() + 30 * 24 * 60 * 60 * 1000,
      })
    ).toString('base64');

    const response = NextResponse.json(
      {
        success: true,
        message: 'Registration successful. Please check your email to verify your account.',
        data: {
          user: {
            id: newUser.id,
            firstName: newUser.firstName,
            lastName: newUser.lastName,
            email: newUser.email,
            phone: newUser.phone,
            role: newUser.role,
            emailVerified: newUser.emailVerified,
          },
          token,
          refreshToken,
        },
      },
      { status: 201 }
    );

    response.cookies.set('auth_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60,
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
    
    console.error('Registration error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during registration',
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