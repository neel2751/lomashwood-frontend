import type { NextRequest} from 'next/server';
import { NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const authToken = request.cookies.get('auth_token')?.value;
    
    if (!authToken) {
      return NextResponse.json(
        {
          success: false,
          message: 'No active session found',
        },
        { status: 401 }
      );
    }
    
    const response = NextResponse.json(
      {
        success: true,
        message: 'Logout successful',
      },
      { status: 200 }
    );

    response.cookies.delete('auth_token');
    response.cookies.delete('refresh_token');

    response.cookies.set('auth_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    response.cookies.set('refresh_token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Logout error:', error);
    
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during logout',
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  return POST(request);
}

export async function DELETE(request: NextRequest) {
  return POST(request);
}