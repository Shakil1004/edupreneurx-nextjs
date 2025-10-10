import { action, internalAction } from "./_generated/server";
import { v } from "convex/values";
import { api } from "./_generated/api";

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
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.convex.cloud', '')}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'confirmation',
          data: args,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Confirmation email sent:', result);
      return result;
    } catch (error) {
      console.error('Error in sendSubmissionConfirmationEmail action:', error);
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
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.convex.cloud', '')}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'status-update',
          data: args,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Status update email sent:', result);
      return result;
    } catch (error) {
      console.error('Error in sendStatusUpdateEmail action:', error);
      throw error;
    }
  },
});

// Action to send admin digest email
export const sendAdminDigestEmail = internalAction({
  args: {
    pendingSubmissions: v.array(v.object({
      referenceNumber: v.string(),
      firstName: v.string(),
      lastName: v.string(),
      email: v.string(),
      phone: v.string(),
      country: v.string(),
      submissionType: v.string(),
      programPosition: v.optional(v.string()),
      submissionDate: v.string(),
    })),
  },
  handler: async (ctx, args) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.convex.cloud', '')}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'admin-digest',
          data: {
            pendingSubmissions: args.pendingSubmissions,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to send email: ${response.statusText}`);
      }

      const result = await response.json();
      console.log('Admin digest email sent:', result);
      return result;
    } catch (error) {
      console.error('Error in sendAdminDigestEmail action:', error);
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

      // Only send email if there are pending submissions
      if (newSubmissions.length > 0) {
        const pendingSubmissions: any = newSubmissions.map((sub: any) => ({
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

        const response: any = await fetch(`${process.env.NEXT_PUBLIC_CONVEX_URL?.replace('.convex.cloud', '')}/api/send-email`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            type: 'admin-digest',
            data: {
              pendingSubmissions,
            },
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to send admin digest email: ${response.statusText}`);
        }

        const result: any = await response.json();
        console.log('Daily admin digest sent:', result);
        return result;
      } else {
        console.log('No pending submissions, skipping daily digest email');
        return { success: true, message: 'No pending submissions' };
      }
    } catch (error) {
      console.error('Error in sendDailyAdminDigest action:', error);
      throw error;
    }
  },
});
