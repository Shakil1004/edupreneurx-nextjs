interface StatusUpdateData {
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

export function generateStatusUpdateEmail(data: StatusUpdateData): string {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusLabel = (status: string) => {
    const labels: Record<string, string> = {
      'new': 'New Submission',
      'contacted': 'Contacted',
      'in-progress': 'In Progress',
      'completed': 'Completed',
      'rejected': 'Not Successful'
    };
    return labels[status] || status;
  };

  const getStatusColor = (status: string) => {
    const colors: Record<string, string> = {
      'new': '#3b82f6',
      'contacted': '#8b5cf6',
      'in-progress': '#f59e0b',
      'completed': '#10b981',
      'rejected': '#ef4444'
    };
    return colors[status] || '#6b7280';
  };

  const getStatusMessage = (status: string) => {
    const messages: Record<string, string> = {
      'new': 'Your submission has been received and is awaiting review.',
      'contacted': 'Our team has reached out to you. Please check your email and phone for our communication.',
      'in-progress': 'Your submission is currently being processed. We will update you on the progress soon.',
      'completed': 'Congratulations! Your submission has been successfully processed.',
      'rejected': 'Thank you for your interest. Unfortunately, we are unable to proceed with your submission at this time.'
    };
    return messages[status] || 'Your submission status has been updated.';
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Status Update - EduPreneurX</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">

          <!-- Header with gradient and diamonds -->
          <tr>
            <td style="background: linear-gradient(135deg, #ff6b35 0%, #f7931e 100%); padding: 30px 20px; text-align: center; position: relative;">
              <div style="color: #ffffff; font-size: 24px; font-weight: bold; letter-spacing: 1px;">
                ◆◆◆◆◆◆ EduPreneurX Status Update
              </div>
              <div style="color: #ffffff; font-size: 14px; margin-top: 10px; opacity: 0.95;">
                SUBMISSION STATUS NOTIFICATION
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 30px 40px;">

              <!-- Status Change Indicator -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background-color: ${getStatusColor(data.newStatus)}; color: white; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                  Status Updated: ${getStatusLabel(data.newStatus)}
                </div>
              </div>

              <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 20px; text-align: center;">
                Hello ${data.firstName} ${data.lastName},
              </h2>

              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
                Your submission status has been updated. Please see the details below.
              </p>

              <!-- Reference Number Section -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 25px; border-radius: 4px;">
                <div style="font-size: 12px; color: #92400e; font-weight: 600; margin-bottom: 5px;">Reference Number</div>
                <div style="font-size: 18px; color: #78350f; font-weight: bold; font-family: 'Courier New', monospace;">
                  ${data.referenceNumber}
                </div>
              </div>

              <!-- Status Transition -->
              <div style="background-color: #f3f4f6; padding: 20px; margin-bottom: 25px; border-radius: 6px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; text-align: center;">
                  Status Progress
                </h3>
                <div style="text-align: center;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="text-align: center; width: 45%;">
                        <div style="background-color: #e5e7eb; color: #6b7280; padding: 10px; border-radius: 4px; font-size: 14px; font-weight: 600;">
                          ${getStatusLabel(data.oldStatus)}
                        </div>
                      </td>
                      <td style="text-align: center; width: 10%; font-size: 20px; color: #10b981;">
                        →
                      </td>
                      <td style="text-align: center; width: 45%;">
                        <div style="background-color: ${getStatusColor(data.newStatus)}; color: white; padding: 10px; border-radius: 4px; font-size: 14px; font-weight: 600;">
                          ${getStatusLabel(data.newStatus)}
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
              </div>

              <!-- Status Message -->
              <div style="background-color: #eff6ff; border-left: 4px solid #3b82f6; padding: 16px; margin-bottom: 25px; border-radius: 4px;">
                <div style="font-size: 14px; color: #1e40af; line-height: 1.6;">
                  ${getStatusMessage(data.newStatus)}
                </div>
              </div>

              <!-- Submission Details -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Submission Details
                </h3>

                <table width="100%" cellpadding="8" cellspacing="0">
                  <tr>
                    <td style="background-color: #f9fafb; padding: 12px; border-radius: 4px; margin-bottom: 8px; width: 50%;">
                      <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Name</div>
                      <div style="font-size: 14px; color: #1f2937;">${data.firstName} ${data.lastName}</div>
                    </td>
                    <td style="width: 10px;"></td>
                    <td style="background-color: #f9fafb; padding: 12px; border-radius: 4px; margin-bottom: 8px; width: 50%;">
                      <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Email</div>
                      <div style="font-size: 14px; color: #1f2937;">${data.email}</div>
                    </td>
                  </tr>
                </table>

                <table width="100%" cellpadding="8" cellspacing="0" style="margin-top: 8px;">
                  <tr>
                    <td style="background-color: #f9fafb; padding: 12px; border-radius: 4px; width: 50%;">
                      <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Submission Type</div>
                      <div style="font-size: 14px; color: #1f2937; text-transform: capitalize;">${data.submissionType}</div>
                    </td>
                    <td style="width: 10px;"></td>
                    <td style="background-color: #f9fafb; padding: 12px; border-radius: 4px; width: 50%;">
                      <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Submission Date</div>
                      <div style="font-size: 14px; color: #1f2937;">${formatDate(data.submissionDate)}</div>
                    </td>
                  </tr>
                </table>

                ${data.programPosition ? `
                <div style="background-color: #f9fafb; padding: 12px; border-radius: 4px; margin-top: 8px;">
                  <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Program/Position</div>
                  <div style="font-size: 14px; color: #1f2937; font-weight: 600;">${data.programPosition}</div>
                </div>
                ` : ''}
              </div>

              <!-- Next Steps / Action -->
              ${data.newStatus === 'in-progress' ? `
              <div style="background-color: #10b981; padding: 20px; border-radius: 6px; margin-top: 30px;">
                <div style="text-align: center; color: white;">
                  <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                    ◆◆◆◆◆◆ Next Steps
                  </div>
                  <div style="font-size: 14px; opacity: 0.95; margin-bottom: 10px;">
                    We are actively processing your submission
                  </div>
                  <div style="background-color: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; margin-top: 10px;">
                    <div style="font-size: 13px;">
                      Please ensure all required documents are ready. We may contact you for additional information.
                    </div>
                  </div>
                </div>
              </div>
              ` : data.newStatus === 'completed' ? `
              <div style="background-color: #10b981; padding: 20px; border-radius: 6px; margin-top: 30px;">
                <div style="text-align: center; color: white;">
                  <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                    ◆◆◆◆◆◆ Congratulations!
                  </div>
                  <div style="font-size: 14px; opacity: 0.95; margin-bottom: 10px;">
                    Your submission has been successfully completed
                  </div>
                  <div style="background-color: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; margin-top: 10px;">
                    <div style="font-size: 13px;">
                      Our team will reach out to you with the next steps shortly.
                    </div>
                  </div>
                </div>
              </div>
              ` : data.newStatus === 'contacted' ? `
              <div style="background-color: #10b981; padding: 20px; border-radius: 6px; margin-top: 30px;">
                <div style="text-align: center; color: white;">
                  <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                    ◆◆◆◆◆◆ We've Reached Out
                  </div>
                  <div style="font-size: 14px; opacity: 0.95; margin-bottom: 10px;">
                    Please check your inbox and phone
                  </div>
                  <div style="background-color: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; margin-top: 10px;">
                    <div style="font-size: 13px;">
                      If you haven't received our communication, please check your spam folder or contact us directly.
                    </div>
                  </div>
                </div>
              </div>
              ` : ''}

              <!-- Contact Information -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-top: 25px; border-radius: 4px;">
                <div style="font-size: 12px; color: #92400e; font-weight: 600; margin-bottom: 8px;">Need Help?</div>
                <div style="font-size: 14px; color: #78350f; line-height: 1.6;">
                  If you have any questions about this status update, please contact us at:<br>
                  <strong>Email:</strong> info@edupreneurx.com<br>
                  <strong>Reference:</strong> ${data.referenceNumber}
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
                Building tomorrow's entrepreneurs today - Global Executive Through Innovation
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
