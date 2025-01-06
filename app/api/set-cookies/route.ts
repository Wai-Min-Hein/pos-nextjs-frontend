import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { token } = await request.json();


  if (!token) {
    return NextResponse.json({ message: 'Token is required' }, { status: 400 });
  }

  const cookieStore = cookies();
  cookieStore.set('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure only in production
    sameSite: 'lax', // Allow cross-origin usage
    path: '/', // Cookie path
    maxAge: 3600 * 24, // 1 day expiration
  });

  return NextResponse.json({ message: 'Token set successfully!' });
}
