import { NextRequest, NextResponse } from 'next/server';
import {
  sendSubmissionConfirmation,
  sendStatusUpdateEmail,
  sendAdminDigest,
  SubmissionEmailData,
  StatusUpdateEmailData,
  PendingSubmission
} from '@/lib/email-service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { success: false, error: 'Missing type or data' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'confirmation':
        result = await sendSubmissionConfirmation(data as SubmissionEmailData);
        break;

      case 'status-update':
        result = await sendStatusUpdateEmail(data as StatusUpdateEmailData);
        break;

      case 'admin-digest':
        result = await sendAdminDigest(data.pendingSubmissions as PendingSubmission[]);
        break;

      default:
        return NextResponse.json(
          { success: false, error: 'Invalid email type' },
          { status: 400 }
        );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in send-email API route:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 }
    );
  }
}
