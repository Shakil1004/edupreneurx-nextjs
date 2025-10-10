import { Resend } from 'resend';
import { generateSubmissionConfirmationEmail } from './emails/submission-confirmation';
import { generateStatusUpdateEmail } from './emails/status-update';
import { generateAdminDigestEmail } from './emails/admin-digest';

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM_EMAIL = 'notification@access.edupreneurx.com';
const ADMIN_EMAIL = 'info@edupreneurx.com';

export interface SubmissionEmailData {
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  submissionType: string;
  programPosition?: string;
  submissionDate: string;
  businessIdea?: string;
  motivation?: string;
  enquiryMessage?: string;
  reservationReason?: string;
  interestMessage?: string;
  paymentMessage?: string;
}

export interface StatusUpdateEmailData {
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  submissionType: string;
  programPosition?: string;
  oldStatus: string;
  newStatus: string;
  submissionDate: string;
}

export interface PendingSubmission {
  referenceNumber: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  submissionType: string;
  programPosition?: string;
  submissionDate: string;
}

export async function sendSubmissionConfirmation(data: SubmissionEmailData) {
  try {
    const htmlContent = generateSubmissionConfirmationEmail(data);

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `✓ Submission Received - ${data.referenceNumber} | EduPreneurX`,
      html: htmlContent,
    });

    console.log('Submission confirmation email sent:', result);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending submission confirmation email:', error);
    return { success: false, error: String(error) };
  }
}

export async function sendStatusUpdateEmail(data: StatusUpdateEmailData) {
  try {
    const htmlContent = generateStatusUpdateEmail(data);

    const statusLabels: Record<string, string> = {
      'new': 'New Submission',
      'contacted': 'Contacted',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'rejected': 'Not Successful'
    };

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: data.email,
      subject: `Status Update: ${statusLabels[data.newStatus] || data.newStatus} - ${data.referenceNumber} | EduPreneurX`,
      html: htmlContent,
    });

    console.log('Status update email sent:', result);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending status update email:', error);
    return { success: false, error: String(error) };
  }
}

export async function sendAdminDigest(pendingSubmissions: PendingSubmission[]) {
  try {
    const htmlContent = generateAdminDigestEmail({
      pendingSubmissions,
      totalNew: pendingSubmissions.length,
      digestDate: new Date().toISOString(),
    });

    const result = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📊 Daily Digest: ${pendingSubmissions.length} Pending Submission${pendingSubmissions.length !== 1 ? 's' : ''} | EduPreneurX Admin`,
      html: htmlContent,
    });

    console.log('Admin digest email sent:', result);
    return { success: true, messageId: result.data?.id };
  } catch (error) {
    console.error('Error sending admin digest email:', error);
    return { success: false, error: String(error) };
  }
}
