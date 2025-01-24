import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { accessToken } = await request.json();


  if (!accessToken) {
    return NextResponse.json({ message: 'AccessToken is required' }, { status: 400 });
  }

  const cookieStore = cookies();
  cookieStore.set('accessToken', accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production', // Use secure only in production
    sameSite: 'lax', // Allow cross-origin usage
    path: '/', // Cookie path
    maxAge: 5*60, // 1 hr expiration
  });

  return NextResponse.json({ message: 'AccessToken set successfully!' });
}
