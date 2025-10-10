interface SubmissionData {
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

export function generateSubmissionConfirmationEmail(data: SubmissionData): string {
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

  const getSubmissionTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      'application': 'Program Application',
      'reservation': 'Program Reservation',
      'enquiry': 'General Enquiry',
      'interest': 'Expression of Interest',
      'payment-inquiry': 'Payment Inquiry'
    };
    return labels[type] || type;
  };

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Submission Confirmation - EduPreneurX</title>
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
                ◆◆◆◆◆◆ EduPreneurX New Submission
              </div>
              <div style="color: #ffffff; font-size: 14px; margin-top: 10px; opacity: 0.95;">
                ENTREPRENEURSHIP EXCELLENCE
              </div>
            </td>
          </tr>

          <!-- Main Content -->
          <tr>
            <td style="padding: 30px 40px;">

              <!-- Success Message -->
              <div style="text-align: center; margin-bottom: 30px;">
                <div style="display: inline-block; background-color: #10b981; color: white; padding: 12px 24px; border-radius: 6px; font-size: 16px; font-weight: 600;">
                  ✓ Submission Successful
                </div>
              </div>

              <h2 style="color: #1f2937; font-size: 20px; margin-bottom: 20px; text-align: center;">
                Thank you for your ${getSubmissionTypeLabel(data.submissionType)}!
              </h2>

              <p style="color: #4b5563; font-size: 14px; line-height: 1.6; margin-bottom: 30px; text-align: center;">
                We have received your submission and our team will review it shortly.
                Please keep your reference number for future correspondence.
              </p>

              <!-- Reference Number Section -->
              <div style="background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 16px; margin-bottom: 25px; border-radius: 4px;">
                <div style="font-size: 12px; color: #92400e; font-weight: 600; margin-bottom: 5px;">Reference Number</div>
                <div style="font-size: 18px; color: #78350f; font-weight: bold; font-family: 'Courier New', monospace;">
                  ${data.referenceNumber}
                </div>
              </div>

              <!-- Submission Date -->
              <div style="background-color: #f3f4f6; padding: 16px; margin-bottom: 25px; border-radius: 4px;">
                <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 5px;">Submission Date</div>
                <div style="font-size: 14px; color: #1f2937;">${formatDate(data.submissionDate)}</div>
              </div>

              <!-- Personal Information -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Personal Information
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
                      <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Phone</div>
                      <div style="font-size: 14px; color: #1f2937;">${data.phone}</div>
                    </td>
                    <td style="width: 10px;"></td>
                    <td style="background-color: #f9fafb; padding: 12px; border-radius: 4px; width: 50%;">
                      <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Country</div>
                      <div style="font-size: 14px; color: #1f2937;">${data.country}</div>
                    </td>
                  </tr>
                </table>
              </div>

              ${data.programPosition ? `
              <!-- Program Information -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Program/Position Information
                </h3>
                <div style="background-color: #f9fafb; padding: 12px; border-radius: 4px;">
                  <div style="font-size: 12px; color: #6b7280; font-weight: 600; margin-bottom: 4px;">Selected Program/Position</div>
                  <div style="font-size: 14px; color: #1f2937; font-weight: 600;">${data.programPosition}</div>
                </div>
              </div>
              ` : ''}

              ${data.businessIdea ? `
              <!-- Business Idea -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Business Idea
                </h3>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 4px;">
                  <div style="font-size: 14px; color: #374151; line-height: 1.6;">${data.businessIdea}</div>
                </div>
              </div>
              ` : ''}

              ${data.motivation ? `
              <!-- Motivation -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Motivation
                </h3>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 4px;">
                  <div style="font-size: 14px; color: #374151; line-height: 1.6;">${data.motivation}</div>
                </div>
              </div>
              ` : ''}

              ${data.enquiryMessage ? `
              <!-- Enquiry Message -->
              <div style="margin-bottom: 25px;">
                <h3 style="color: #1f2937; font-size: 16px; margin-bottom: 15px; padding-bottom: 10px; border-bottom: 2px solid #e5e7eb;">
                  Your Message
                </h3>
                <div style="background-color: #f9fafb; padding: 16px; border-radius: 4px;">
                  <div style="font-size: 14px; color: #374151; line-height: 1.6;">${data.enquiryMessage}</div>
                </div>
              </div>
              ` : ''}

              <!-- Payment Information / Action Required -->
              <div style="background-color: #10b981; padding: 20px; border-radius: 6px; margin-top: 30px;">
                <div style="text-align: center; color: white;">
                  <div style="font-size: 16px; font-weight: bold; margin-bottom: 10px;">
                    ◆◆◆◆◆◆ Payment Information - ADMIN ACTION REQUIRED
                  </div>
                  <div style="font-size: 14px; opacity: 0.95; margin-bottom: 10px;">
                    Send this payment link to the customer:
                  </div>
                  <div style="background-color: rgba(255,255,255,0.2); padding: 10px; border-radius: 4px; margin-top: 10px;">
                    <div style="font-size: 12px; opacity: 0.9; margin-bottom: 5px;">Admin Note:</div>
                    <div style="font-size: 13px;">
                      Follow up with payment link within 24-48 hours
                    </div>
                  </div>
                </div>
              </div>

              <!-- Action Required -->
              <div style="background-color: #fee2e2; border-left: 4px solid #dc2626; padding: 16px; margin-top: 25px; border-radius: 4px;">
                <div style="font-size: 12px; color: #991b1b; font-weight: 600; margin-bottom: 5px;">◆◆◆◆◆◆ Action Required</div>
                <div style="font-size: 14px; color: #7f1d1d; line-height: 1.5;">
                  <strong>Response Timeline:</strong> 2-4 working weeks<br>
                  <strong>Next Steps:</strong> Prepare your documents and follow the link sent<br>
                  <strong>Assigned To:</strong> Team Lead (TBD)
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
