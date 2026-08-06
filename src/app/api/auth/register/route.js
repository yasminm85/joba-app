export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { registerUser } from '@/services/auth.service';

export async function POST(request) {
  try {
    const body = await request.json();
    const user = await registerUser(body);

    return NextResponse.json(
      {
        message: 'Registered Successfully. Please Check Your Email to Verify',
        user,
      },
      { status: 201 },
    );
  } catch (error) {
    const isValidationError =
      error.message.includes('required') ||
      error.message.includes('registered') ||
      error.message.includes('Password');

    if (isValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error('Registration API Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
