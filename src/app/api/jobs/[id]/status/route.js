export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { editStatus } from '@/services/job.service';

export async function PATCH(request, { params }) {
  try {
    const session = await auth();
    const { id } = await params;

    if (!session?.user?.id && !session?.user?._id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id || session.user._id;

    const { status } = await request.json();

    const updatedStatus = await editStatus(userId, id, status);

    return NextResponse.json({ job: updatedStatus }, { status: 200 });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'Status is required') {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    if (error.message === 'Data not found') {
      return NextResponse.json(
        { message: 'Data not found or access denied' },
        { status: 404 },
      );
    }
    console.error('PATCH Status Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
