# Email Automation System Guide

## Overview
The EduPreneurX platform now includes a fully automated email notification system using Resend. All emails are sent from `notification@access.edupreneurx.com` and follow the professional design pattern shown in the submission confirmation emails.

## Email Types

### 1. Submission Confirmation Email
**Triggered:** Automatically when a new submission is created
**Sent to:** User's email address
**Subject:** `✓ Submission Received - [Reference Number] | EduPreneurX`

**Content:**
- Reference number (highlighted in yellow box)
- Submission date
- Personal information (name, email, phone, country)
- Program/position information
- Business idea, motivation, or enquiry message (if applicable)
- Payment information section (green box)
- Action required section (red box)

### 2. Status Update Email
**Triggered:** Automatically when submission status changes (e.g., new → in-progress)
**Sent to:** User's email address
**Subject:** `Status Update: [New Status] - [Reference Number] | EduPreneurX`

**Content:**
- Current status badge
- Status transition (old → new)
- Submission details summary
- Status-specific next steps message
- Contact information

**Supported Status Values:**
- `new` - New Submission
- `contacted` - Contacted
- `in-progress` - In Progress
- `completed` - Completed
- `rejected` - Not Successful

### 3. Admin Daily Digest Email
**Triggered:** Automatically every day at 9:00 AM UTC via cron job
**Sent to:** `info@edupreneurx.com`
**Subject:** `📊 Daily Digest: [Number] Pending Submissions | EduPreneurX Admin`

**Content:**
- Total count of pending submissions
- List of all submissions with "new" status
- Each submission shows:
  - Name and reference number
  - Email, phone, country
  - Program/position
  - Submission date
  - Urgent flag (for submissions older than 48 hours)
- Summary statistics by type
- Link to admin dashboard

**Special Features:**
- If no pending submissions, shows "All Clear!" message
- Top 3 submissions marked as URGENT
- Color-coded by submission type
- Direct link to review each submission

## Configuration

### Environment Variables
The following environment variables are required in `.env.local`:

```bash
# Resend API Key for email notifications
RESEND_API_KEY=re_JfoSkyzD_5BBiLDcnH8XmwBCF4mzk42cw

# Your Convex deployment URL
NEXT_PUBLIC_CONVEX_URL=https://cautious-emu-310.convex.cloud
```

### Email Addresses
- **Sender:** `notification@access.edupreneurx.com` (configured in Resend)
- **Admin Recipient:** `info@edupreneurx.com`

### Cron Schedule
The daily digest runs at **9:00 AM UTC** every day. To change this, edit `convex/crons.ts`:

```typescript
crons.daily(
  "send daily admin digest",
  { hourUTC: 9, minuteUTC: 0 },  // Change these values
  internal.emails.sendDailyAdminDigest
);
```

## File Structure

```
lib/
├── emails/
│   ├── submission-confirmation.ts  # Confirmation email template
│   ├── status-update.ts            # Status update email template
│   └── admin-digest.ts             # Admin digest email template
└── email-service.ts                # Resend integration service

app/
└── api/
    └── send-email/
        └── route.ts                # API endpoint for sending emails

convex/
├── emails.ts                       # Convex actions for email sending
├── submissions.ts                  # Updated with email triggers
└── crons.ts                        # Cron job configuration
```

## How It Works

### 1. User Submits Form
```
User fills form → createSubmission mutation →
Save to database → Schedule email action →
Send confirmation email to user
```

### 2. Admin Updates Status
```
Admin changes status → updateSubmissionStatus mutation →
Check if status changed → Schedule email action →
Send status update email to user
```

### 3. Daily Digest
```
Cron triggers at 9 AM UTC → sendDailyAdminDigest action →
Query all "new" submissions →
Generate digest email →
Send to info@edupreneurx.com
```

## Email Design Features

All emails include:
- **Orange gradient header** with diamond pattern and EduPreneurX branding
- **White content sections** with clean, labeled information boxes
- **Color-coded status badges** for easy identification
- **Green action sections** for important next steps
- **Dark footer** with system information and version number
- **Responsive design** that works on all devices
- **Professional typography** with proper hierarchy

## Testing

### Test Submission Confirmation Email
1. Create a new submission through any form
2. Check the user's email inbox
3. Verify all information matches the submission

### Test Status Update Email
1. Go to the admin dashboard at `/admin`
2. Select any submission
3. Change the status from "new" to "in-progress"
4. Check the user's email inbox
5. Verify the status transition is shown correctly

### Test Admin Digest Email
The digest runs automatically at 9 AM UTC, but you can test it by:
1. Ensure you have at least one submission with "new" status
2. Wait for the next scheduled run, or
3. Manually trigger the cron job from Convex dashboard

### Manual Testing via API
You can also test emails directly via the API endpoint:

```bash
curl -X POST http://localhost:3000/api/send-email \
  -H "Content-Type: application/json" \
  -d '{
    "type": "confirmation",
    "data": {
      "referenceNumber": "EduPX01012025TEST",
      "firstName": "John",
      "lastName": "Doe",
      "email": "test@example.com",
      "phone": "+1234567890",
      "country": "United States",
      "submissionType": "application",
      "programPosition": "GEEP",
      "submissionDate": "2025-01-01T12:00:00.000Z"
    }
  }'
```

## Troubleshooting

### Emails Not Sending
1. **Check Resend API Key:** Verify `RESEND_API_KEY` is set correctly in `.env.local`
2. **Check Domain Verification:** Ensure `access.edupreneurx.com` is verified in Resend dashboard
3. **Check Convex Logs:** Look for errors in Convex dashboard under "Logs"
4. **Check API Route:** Test the `/api/send-email` endpoint directly

### Emails Going to Spam
1. Ensure your domain has proper SPF, DKIM, and DMARC records
2. Check Resend dashboard for email delivery status
3. Consider adding a custom reply-to address

### Cron Not Running
1. Check Convex dashboard under "Crons" to see scheduled jobs
2. Verify `convex/crons.ts` is properly configured
3. Check Convex logs for any errors during cron execution

### Wrong Email Content
1. Verify submission data is being passed correctly
2. Check email templates in `lib/emails/` for correct field mappings
3. Look for console errors in browser and server logs

## Customization

### Change Email Design
Edit the template files in `lib/emails/`:
- `submission-confirmation.ts` - Confirmation email HTML
- `status-update.ts` - Status update email HTML
- `admin-digest.ts` - Admin digest email HTML

### Change Email Sender
Update `FROM_EMAIL` in `lib/email-service.ts`:
```typescript
const FROM_EMAIL = 'notification@access.edupreneurx.com';
```

### Change Admin Email
Update `ADMIN_EMAIL` in `lib/email-service.ts`:
```typescript
const ADMIN_EMAIL = 'info@edupreneurx.com';
```

### Add New Email Type
1. Create new template in `lib/emails/[template-name].ts`
2. Add function in `lib/email-service.ts`
3. Create action in `convex/emails.ts`
4. Add case in `app/api/send-email/route.ts`
5. Call from mutation or cron as needed

## Production Checklist

Before deploying to production:
- [ ] Verify Resend API key is set in production environment
- [ ] Confirm domain `access.edupreneurx.com` is verified in Resend
- [ ] Test all three email types with real data
- [ ] Verify emails are not going to spam
- [ ] Check cron job is scheduled correctly
- [ ] Monitor email delivery rates in Resend dashboard
- [ ] Set up email monitoring/alerts for failures
- [ ] Review email templates for typos and correct information
- [ ] Test email rendering across different email clients (Gmail, Outlook, etc.)
- [ ] Ensure unsubscribe links are added if required by law

## Support

For issues with:
- **Resend API:** https://resend.com/docs
- **Convex Crons:** https://docs.convex.dev/scheduling/cron-jobs
- **Email Deliverability:** Check Resend dashboard and domain DNS records

## Version History

**v1.0** - Initial release
- Submission confirmation emails
- Status update notifications
- Daily admin digest
- Professional email design matching brand guidelines
