export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { resetPassword } from '@/services/auth.service';

export async function POST(req) {
  try {
    const { token, newPassword } = await req.json();
    await resetPassword(token, newPassword);

    return NextResponse.json({
      message: 'Password successfully change, try again to login',
    });
  } catch (error) {
    const isClientError =
      error.message.includes('required') ||
      error.message.includes('Invalid or Expired') ||
      error.message.includes('Password');

    if (isClientError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error('Reset Password error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
