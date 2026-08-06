export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { editJob, deleteJob } from '@/services/job.service';

export async function PUT(request, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id && !session?.user?._id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id || session.user._id;
    const body = await request.json();
    const { id } = await params;

    const updatedJob = await editJob(userId, body, id);

    return NextResponse.json({ job: updatedJob }, { status: 200 });
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'Data not found') {
      return NextResponse.json(
        { message: 'Data not found or access denied' },
        { status: 404 }
      );
    }

    console.error('PUT Job Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const session = await auth();

    if (!session?.user?.id && !session?.user?._id) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const userId = session.user.id || session.user._id;
    const { id } = await params;

    await deleteJob(userId, id);

    return NextResponse.json(
      { message: 'Delete Data Successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error.message === 'Unauthorized') {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    if (error.message === 'Data not found') {
      return NextResponse.json(
        { message: 'Data not found or access denied' },
        { status: 404 }
      );
    }

    console.error('DELETE Job Error:', error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 }
    );
  }
}