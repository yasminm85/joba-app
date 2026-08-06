export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { sendResetPassword } from '@/services/auth.service';

export async function POST(req) {
  try {
    const { email } = await req.json();
    await sendResetPassword(email);

    return NextResponse.json({
      message: 'If the email is registered, a reset link will be sent.',
    });
  } catch (error) {
    const isClientError =
      error.message === 'Email is required' ||
      error.message === 'Please login using Google';

    if (isClientError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error('Forgot password error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
