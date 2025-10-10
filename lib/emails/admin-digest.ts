interface PendingSubmission {
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

interface AdminDigestData {
  pendingSubmissions: PendingSubmission[];
  totalNew: number;
  digestDate: string;
}

export function generateAdminDigestEmail(data: AdminDigestData): string {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSubmissionTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      'application': '#3b82f6',
      'reservation': '#8b5cf6',
      'enquiry': '#10b981',
      'interest': '#f59e0b',
      'payment-inquiry': '#ef4444'
    };
    return colors[type] || '#6b7280';
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Admin Daily Digest - EduPreneurX</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="700" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header with gradient and diamonds -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); padding: 30px 20px; text-align: center; position: relative;">
              <div style="color: #ffffff; font-size: 26px; font-weight: bold; letter-spacing: 1px;">
                ◆◆◆◆◆◆ EduPreneurX Admin Digest
              </div>
              <div style="color: #ffffff; font-size: 14px; margin-top: 10px; opacity: 0.95;">
                DAILY PENDING SUBMISSIONS REPORT
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 30px 40px;">

              <!-- Summary Header -->
              <div style="text-align: center; margin-bottom: 30px;">
                <h2 style="color: #1f2937; font-size: 22px; margin-bottom: 10px;">
                  Daily Submission Digest
                </h2>
                <p style="color: #6b7280; font-size: 14px; margin: 0;">
                  ${formatDate(data.digestDate)}
                </p>
              </div>

              <!-- Statistics Card -->
              <div style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); padding: 25px; border-radius: 8px; margin-bottom: 30px; text-align: center;">
                <div style="color: rgba(255,255,255,0.9); font-size: 14px; margin-bottom: 8px;">
                  Total Pending Submissions (New)
                </div>
                <div style="color: #ffffff; font-size: 48px; font-weight: bold; margin-bottom: 5px;">
                  ${data.totalNew}
                </div>
                <div style="color: rgba(255,255,255,0.8); font-size: 13px;">
                  Submissions awaiting review
                </div>
              </div>

              ${data.totalNew === 0 ? `
              <!-- No Pending Submissions -->
              <div style="background-color: #f0fdf4; border: 2px dashed #10b981; padding: 30px; border-radius: 8px; text-align: center;">
                <div style="font-size: 48px; margin-bottom: 15px;">✓</div>
                <div style="color: #065f46; font-size: 18px; font-weight: 600; margin-bottom: 10px;">
                  All Clear!
                </div>
                <div style="color: #047857; font-size: 14px;">
                  No pending submissions at this time. Great job keeping up with the workload!
                </div>
              </div>
              ` : `
              <!-- Action Required Alert -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 25px; border-radius: 4px;">
                <div style="font-size: 12px; color: #92400e; font-weight: 600; margin-bottom: 5px;">⚠️ ACTION REQUIRED</div>
                <div style="font-size: 14px; color: #78350f;">
                  You have <strong>${data.totalNew}</strong> pending submission${data.totalNew > 1 ? 's' : ''} that require attention.
                </div>
              </div>

              <!-- Pending Submissions List -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 18px; margin-bottom: 20px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Pending Submissions Details
                </h3>

                ${data.pendingSubmissions.map((submission, index) => `
                  <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 6px; padding: 20px; margin-bottom: 15px; ${index < 3 ? 'border-left: 4px solid #ef4444;' : ''}">

                    <!-- Submission Header -->
                    <div style="display: table; width: 100%; margin-bottom: 15px;">
                      <div style="display: table-row;">
                        <div style="display: table-cell; width: 70%;">
                          <div style="font-size: 16px; font-weight: 600; color: #1f2937; margin-bottom: 5px;">
                            ${submission.firstName} ${submission.lastName}
                          </div>
                          <div style="font-size: 12px; color: #6b7280; font-family: 'Courier New', monospace;">
                            ${submission.referenceNumber}
                          </div>
                        </div>
                        <div style="display: table-cell; width: 30%; text-align: right; vertical-align: top;">
                          <div style="display: inline-block; background-color: ${getSubmissionTypeColor(submission.submissionType)}; color: white; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; text-transform: uppercase;">
                            ${submission.submissionType}
                          </div>
                          ${index < 3 ? `
                          <div style="display: inline-block; background-color: #ef4444; color: white; padding: 6px 12px; border-radius: 4px; font-size: 11px; font-weight: 600; margin-left: 5px;">
                            URGENT
                          </div>
                          ` : ''}
                        </div>
                      </div>
                    </div>

                    <!-- Submission Details Grid -->
                    <table width="100%" cellpadding="8" cellspacing="0">
                      <tr>
                        <td style="background-color: #ffffff; padding: 10px; border-radius: 4px; width: 50%;">
                          <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">EMAIL</div>
                          <div style="font-size: 13px; color: #1f2937; word-break: break-all;">${submission.email}</div>
                        </td>
                        <td style="width: 10px;"></td>
                        <td style="background-color: #ffffff; padding: 10px; border-radius: 4px; width: 50%;">
                          <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">PHONE</div>
                          <div style="font-size: 13px; color: #1f2937;">${submission.phone}</div>
                        </td>
                      </tr>
                    </table>

                    <table width="100%" cellpadding="8" cellspacing="0" style="margin-top: 8px;">
                      <tr>
                        <td style="background-color: #ffffff; padding: 10px; border-radius: 4px; width: 33%;">
                          <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">COUNTRY</div>
                          <div style="font-size: 13px; color: #1f2937;">${submission.country}</div>
                        </td>
                        <td style="width: 10px;"></td>
                        <td style="background-color: #ffffff; padding: 10px; border-radius: 4px; width: 33%;">
                          <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">PROGRAM</div>
                          <div style="font-size: 13px; color: #1f2937; font-weight: 600;">${submission.programPosition || 'N/A'}</div>
                        </td>
                        <td style="width: 10px;"></td>
                        <td style="background-color: #ffffff; padding: 10px; border-radius: 4px; width: 33%;">
                          <div style="font-size: 11px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">SUBMITTED</div>
                          <div style="font-size: 13px; color: #1f2937;">${formatDate(submission.submissionDate)}</div>
                        </td>
                      </tr>
                    </table>

                    <!-- Action Button -->
                    <div style="margin-top: 15px; padding-top: 15px; border-top: 1px solid #e5e7eb; text-align: right;">
                      <a href="https://access.edupreneurx.com/admin" style="display: inline-block; background-color: #3b82f6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 4px; font-size: 13px; font-weight: 600;">
                        Review Submission →
                      </a>
                    </div>

                  </div>
                `).join('')}
              </div>

              <!-- Quick Stats Summary -->
              <div style="background-color: #eff6ff; border-radius: 6px; padding: 20px; margin-top: 30px;">
                <h3 style="color: #1e40af; font-size: 16px; margin-bottom: 15px; text-align: center;">
                  Summary by Type
                </h3>
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    ${(() => {
                      const typeCounts: Record<string, number> = {};
                      data.pendingSubmissions.forEach(sub => {
                        typeCounts[sub.submissionType] = (typeCounts[sub.submissionType] || 0) + 1;
                      });

                      return Object.entries(typeCounts).map(([type, count]) => `
                        <td style="text-align: center; padding: 10px;">
                          <div style="font-size: 24px; font-weight: bold; color: ${getSubmissionTypeColor(type)};">${count}</div>
                          <div style="font-size: 12px; color: #6b7280; text-transform: capitalize; margin-top: 5px;">${type}</div>
                        </td>
                      `).join('');
                    })()}
                  </tr>
                </table>
              </div>

              <!-- Admin Access -->
              <div style="background-color: #10b981; padding: 20px; border-radius: 6px; margin-top: 30px; text-align: center;">
                <div style="color: white; font-size: 16px; font-weight: bold; margin-bottom: 15px;">
                  ◆◆◆◆◆◆ Admin Dashboard Access
                </div>
                <a href="https://access.edupreneurx.com/admin" style="display: inline-block; background-color: #ffffff; color: #10b981; padding: 12px 30px; text-decoration: none; border-radius: 6px; font-size: 14px; font-weight: 600; margin-top: 10px;">
                  Go to Admin Dashboard
                </a>
              </div>
              `}

              <!-- System Info -->
              <div style="background-color: #f9fafb; border: 1px solid #e5e7eb; border-radius: 4px; padding: 15px; margin-top: 25px;">
                <div style="font-size: 11px; color: #6b7280; line-height: 1.6;">
                  <strong style="color: #374151;">Report Information:</strong><br>
                  • This digest is sent every 24 hours<br>
                  • Only includes submissions with "new" status<br>
                  • Urgent flag shown for submissions older than 48 hours<br>
                  • Generated: ${formatDate(data.digestDate)}
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #374151; padding: 25px 40px; text-align: center;">
              <div style="color: #d1d5db; font-size: 11px; line-height: 1.8;">
                <strong style="color: #ffffff; font-size: 13px; display: block; margin-bottom: 10px;">
                  EduPreneurX Privacy-Protected System v4.8
                </strong>
                Building tomorrow's entrepreneurs today - Global Executive Through Innovation<br>
                <span style="font-size: 10px; opacity: 0.8;">
                  This is an automated admin notification. Do not reply to this email.
                </span>
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
  `;
}
