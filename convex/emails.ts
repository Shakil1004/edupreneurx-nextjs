import { internalAction } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

// Helper function to send email via Resend API
async function sendEmailViaResend(to: string, subject: string, html: string) {
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  const FROM_EMAIL = 'notification@access.edupreneurx.com';

  if (!RESEND_API_KEY) {
    throw new Error('RESEND_API_KEY environment variable is not set in Convex. Run: npx convex env set RESEND_API_KEY your_key_here');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: FROM_EMAIL,
      to: [to],
      subject,
      html,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Resend API error: ${response.status} ${error}`);
  }

  return await response.json();
}

// Helper to format dates
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

// Generate confirmation email HTML (simplified for Convex)
function generateConfirmationHTML(args: any): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);padding:30px 20px;text-align:center;">
            <div style="color:#ffffff;font-size:24px;font-weight:bold;">◆◆◆◆◆◆ EduPreneurX New Submission</div>
            <div style="color:#ffffff;font-size:14px;margin-top:10px;">ENTREPRENEURSHIP EXCELLENCE</div>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 40px;">
            <div style="text-align:center;margin-bottom:30px;">
              <div style="display:inline-block;background-color:#10b981;color:white;padding:12px 24px;border-radius:6px;font-size:16px;font-weight:600;">✓ Submission Successful</div>
            </div>
            <h2 style="color:#1f2937;font-size:20px;margin-bottom:20px;text-align:center;">Thank you for your submission!</h2>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;margin-bottom:30px;text-align:center;">We have received your submission and our team will review it shortly.</p>
            <div style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin-bottom:25px;border-radius:4px;">
              <div style="font-size:12px;color:#92400e;font-weight:600;margin-bottom:5px;">Reference Number</div>
              <div style="font-size:18px;color:#78350f;font-weight:bold;font-family:monospace;">${args.referenceNumber}</div>
            </div>
            <div style="background-color:#f3f4f6;padding:16px;margin-bottom:25px;border-radius:4px;">
              <div style="font-size:12px;color:#6b7280;font-weight:600;margin-bottom:5px;">Submission Date</div>
              <div style="font-size:14px;color:#1f2937;">${formatDate(args.submissionDate)}</div>
            </div>
            <div style="background-color:#f9fafb;padding:12px;border-radius:4px;margin-bottom:10px;">
              <div style="font-size:12px;color:#6b7280;font-weight:600;">Name:</div>
              <div style="font-size:14px;color:#1f2937;">${args.firstName} ${args.lastName}</div>
            </div>
            <div style="background-color:#f9fafb;padding:12px;border-radius:4px;margin-bottom:10px;">
              <div style="font-size:12px;color:#6b7280;font-weight:600;">Email:</div>
              <div style="font-size:14px;color:#1f2937;">${args.email}</div>
            </div>
            ${args.programPosition ? `<div style="background-color:#f9fafb;padding:12px;border-radius:4px;margin-bottom:10px;">
              <div style="font-size:12px;color:#6b7280;font-weight:600;">Program:</div>
              <div style="font-size:14px;color:#1f2937;font-weight:600;">${args.programPosition}</div>
            </div>` : ''}
          </td>
        </tr>
        <tr>
          <td style="background-color:#374151;padding:25px 40px;text-align:center;">
            <div style="color:#d1d5db;font-size:11px;line-height:1.8;">
              <strong style="color:#ffffff;font-size:13px;display:block;margin-bottom:10px;">EduPreneurX Privacy-Protected System v4.8</strong>
              Building tomorrow's entrepreneurs today - Global Executive Through Innovation
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Generate status update email HTML
function generateStatusUpdateHTML(args: any): string {
  const statusColors: Record<string, string> = {
    'new': '#3b82f6', 'contacted': '#8b5cf6', 'in-progress': '#f59e0b',
    'completed': '#10b981', 'rejected': '#ef4444'
  };
  const statusLabels: Record<string, string> = {
    'new': 'New', 'contacted': 'Contacted', 'in-progress': 'In Progress',
    'completed': 'Completed', 'rejected': 'Not Successful'
  };

  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:20px 0;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);padding:30px 20px;text-align:center;">
            <div style="color:#ffffff;font-size:24px;font-weight:bold;">◆◆◆◆◆◆ EduPreneurX Status Update</div>
            <div style="color:#ffffff;font-size:14px;margin-top:10px;">SUBMISSION STATUS NOTIFICATION</div>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 40px;">
            <div style="text-align:center;margin-bottom:30px;">
              <div style="display:inline-block;background-color:${statusColors[args.newStatus]};color:white;padding:12px 24px;border-radius:6px;font-size:16px;font-weight:600;">Status: ${statusLabels[args.newStatus]}</div>
            </div>
            <h2 style="color:#1f2937;font-size:20px;margin-bottom:20px;text-align:center;">Hello ${args.firstName} ${args.lastName},</h2>
            <p style="color:#4b5563;font-size:14px;line-height:1.6;margin-bottom:30px;text-align:center;">Your submission status has been updated.</p>
            <div style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin-bottom:25px;border-radius:4px;">
              <div style="font-size:12px;color:#92400e;font-weight:600;margin-bottom:5px;">Reference Number</div>
              <div style="font-size:18px;color:#78350f;font-weight:bold;font-family:monospace;">${args.referenceNumber}</div>
            </div>
            <div style="background-color:#f3f4f6;padding:20px;margin-bottom:25px;border-radius:6px;text-align:center;">
              <h3 style="color:#1f2937;font-size:16px;margin-bottom:15px;">Status Change</h3>
              <div><span style="padding:8px 16px;background-color:#e5e7eb;color:#6b7280;border-radius:4px;margin:0 10px;">${statusLabels[args.oldStatus]}</span> → <span style="padding:8px 16px;background-color:${statusColors[args.newStatus]};color:white;border-radius:4px;margin:0 10px;">${statusLabels[args.newStatus]}</span></div>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background-color:#374151;padding:25px 40px;text-align:center;">
            <div style="color:#d1d5db;font-size:11px;line-height:1.8;">
              <strong style="color:#ffffff;font-size:13px;display:block;margin-bottom:10px;">EduPreneurX Privacy-Protected System v4.8</strong>
              Building tomorrow's entrepreneurs today
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Generate admin digest email HTML (simplified)
function generateAdminDigestHTML(submissions: any[]): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f5f5f5;padding:20px 0;">
    <tr><td align="center">
      <table width="700" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
        <tr>
          <td style="background:linear-gradient(135deg,#ff6b35 0%,#f7931e 100%);padding:30px 20px;text-align:center;">
            <div style="color:#ffffff;font-size:26px;font-weight:bold;">◆◆◆◆◆◆ EduPreneurX Admin Digest</div>
            <div style="color:#ffffff;font-size:14px;margin-top:10px;">DAILY PENDING SUBMISSIONS REPORT</div>
          </td>
        </tr>
        <tr>
          <td style="padding:30px 40px;">
            <h2 style="color:#1f2937;font-size:22px;margin-bottom:10px;text-align:center;">Daily Submission Digest</h2>
            <p style="color:#6b7280;font-size:14px;margin:0 0 30px 0;text-align:center;">${new Date().toLocaleDateString()}</p>
            <div style="background:linear-gradient(135deg,#3b82f6 0%,#2563eb 100%);padding:25px;border-radius:8px;margin-bottom:30px;text-align:center;">
              <div style="color:rgba(255,255,255,0.9);font-size:14px;margin-bottom:8px;">Total Pending Submissions (New)</div>
              <div style="color:#ffffff;font-size:48px;font-weight:bold;margin-bottom:5px;">${submissions.length}</div>
              <div style="color:rgba(255,255,255,0.8);font-size:13px;">Submissions awaiting review</div>
            </div>
            ${submissions.length === 0 ? `
              <div style="background-color:#f0fdf4;border:2px dashed #10b981;padding:30px;border-radius:8px;text-align:center;">
                <div style="font-size:48px;margin-bottom:15px;">✓</div>
                <div style="color:#065f46;font-size:18px;font-weight:600;margin-bottom:10px;">All Clear!</div>
                <div style="color:#047857;font-size:14px;">No pending submissions at this time.</div>
              </div>
            ` : `
              <div style="background-color:#fef3c7;border-left:4px solid #f59e0b;padding:16px;margin-bottom:25px;border-radius:4px;">
                <div style="font-size:12px;color:#92400e;font-weight:600;margin-bottom:5px;">⚠️ ACTION REQUIRED</div>
                <div style="font-size:14px;color:#78350f;">You have <strong>${submissions.length}</strong> pending submission${submissions.length > 1 ? 's' : ''}.</div>
              </div>
              ${submissions.map((sub, idx) => `
                <div style="background-color:#f9fafb;border:1px solid #e5e7eb;border-radius:6px;padding:20px;margin-bottom:15px;${idx < 3 ? 'border-left:4px solid #ef4444;' : ''}">
                  <div style="font-size:16px;font-weight:600;color:#1f2937;margin-bottom:5px;">${sub.firstName} ${sub.lastName}</div>
                  <div style="font-size:12px;color:#6b7280;font-family:monospace;margin-bottom:15px;">${sub.referenceNumber}</div>
                  <div style="background-color:#ffffff;padding:10px;border-radius:4px;margin-bottom:8px;">
                    <div style="font-size:11px;color:#6b7280;font-weight:600;">EMAIL</div>
                    <div style="font-size:13px;color:#1f2937;">${sub.email}</div>
                  </div>
                  <div style="background-color:#ffffff;padding:10px;border-radius:4px;margin-bottom:8px;">
                    <div style="font-size:11px;color:#6b7280;font-weight:600;">PHONE</div>
                    <div style="font-size:13px;color:#1f2937;">${sub.phone}</div>
                  </div>
                  ${sub.programPosition ? `<div style="background-color:#ffffff;padding:10px;border-radius:4px;margin-bottom:8px;">
                    <div style="font-size:11px;color:#6b7280;font-weight:600;">PROGRAM</div>
                    <div style="font-size:13px;color:#1f2937;font-weight:600;">${sub.programPosition}</div>
                  </div>` : ''}
                </div>
              `).join('')}
            `}
          </td>
        </tr>
        <tr>
          <td style="background-color:#374151;padding:25px 40px;text-align:center;">
            <div style="color:#d1d5db;font-size:11px;line-height:1.8;">
              <strong style="color:#ffffff;font-size:13px;display:block;margin-bottom:10px;">EduPreneurX Privacy-Protected System v4.8</strong>
              This is an automated admin notification.
            </div>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// Action to send submission confirmation email
export const sendSubmissionConfirmationEmail = internalAction({
  args: {
    referenceNumber: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    submissionType: v.string(),
    programPosition: v.optional(v.string()),
    submissionDate: v.string(),
    businessIdea: v.optional(v.string()),
    motivation: v.optional(v.string()),
    enquiryMessage: v.optional(v.string()),
    reservationReason: v.optional(v.string()),
    interestMessage: v.optional(v.string()),
    paymentMessage: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    try {
      const htmlContent = generateConfirmationHTML(args);
      const result = await sendEmailViaResend(
        args.email,
        `✓ Submission Received - ${args.referenceNumber} | EduPreneurX`,
        htmlContent
      );
      console.log('Confirmation email sent:', result);
      return { success: true, messageId: result.id };
    } catch (error) {
      console.error('Error sending confirmation email:', error);
      throw error;
    }
  },
});

// Action to send status update email
export const sendStatusUpdateEmail = internalAction({
  args: {
    referenceNumber: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    submissionType: v.string(),
    programPosition: v.optional(v.string()),
    oldStatus: v.string(),
    newStatus: v.string(),
    submissionDate: v.string(),
  },
  handler: async (ctx, args) => {
    try {
      const statusLabels: Record<string, string> = {
        'new': 'New Submission', 'contacted': 'Contacted', 'in-progress': 'In Progress',
        'completed': 'Completed', 'rejected': 'Not Successful'
      };

      const htmlContent = generateStatusUpdateHTML(args);
      const result = await sendEmailViaResend(
        args.email,
        `Status Update: ${statusLabels[args.newStatus]} - ${args.referenceNumber} | EduPreneurX`,
        htmlContent
      );
      console.log('Status update email sent:', result);
      return { success: true, messageId: result.id };
    } catch (error) {
      console.error('Error sending status update email:', error);
      throw error;
    }
  },
});

// Internal action to send daily admin digest (called by cron)
export const sendDailyAdminDigest = internalAction({
  args: {},
  handler: async (ctx): Promise<any> => {
    try {
      // Query all submissions with "new" status
      const newSubmissions: any = await ctx.runQuery(api.submissions.getSubmissionsByStatus, {
        status: "new",
      });

      // Prepare submissions data
      const submissions = newSubmissions.map((sub: any) => ({
        referenceNumber: sub.referenceNumber,
        firstName: sub.firstName,
        lastName: sub.lastName,
        email: sub.email,
        phone: sub.phone,
        country: sub.country,
        submissionType: sub.submissionType,
        programPosition: sub.programPosition,
        submissionDate: sub.submissionDate,
      }));

      const htmlContent = generateAdminDigestHTML(submissions);
      const result = await sendEmailViaResend(
        'info@edupreneurx.com',
        `📊 Daily Digest: ${submissions.length} Pending Submission${submissions.length !== 1 ? 's' : ''} | EduPreneurX Admin`,
        htmlContent
      );

      console.log('Daily admin digest sent:', result);
      return { success: true, messageId: result.id, count: submissions.length };
    } catch (error) {
      console.error('Error sending daily admin digest:', error);
      throw error;
    }
  },
});
