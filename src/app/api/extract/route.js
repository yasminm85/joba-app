export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import { extractApplication } from '@/services/extract.service';

export const runtime = 'nodejs';

export async function POST(request) {
  try {
    const { image, text } = await request.json();

    const extractedData = await extractApplication(image, text);

    return NextResponse.json(extractedData, { status: 200 });
  } catch (error) {
    if (error.message === 'Image or text is required') {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    console.error('Extraction Error:', error);
    return NextResponse.json(
      { message: 'Failed Process Data', detail: error.message },
      { status: 500 },
    );
  }
}
