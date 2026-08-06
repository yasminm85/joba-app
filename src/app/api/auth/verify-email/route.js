export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { verifyEmail } from '@/services/auth.service';

export async function POST(request) {
  try {
    const { token } = await request.json();
    await verifyEmail(token);

    return NextResponse.json({
      message: 'Verify Email Successfully. You can login',
    });
  } catch (error) {
    const isClientError =
      error.message === 'Invalid Token' ||
      error.message === 'Verification Link Invalid or Expired';

    if (isClientError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error('Verify error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
