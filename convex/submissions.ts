import { v } from "convex/values";
import { mutation, query, internalMutation } from "./_generated/server";
import { internal } from "./_generated/api";

// Generate unique reference number
function generateReferenceNumber(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, '0');
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = now.getFullYear();
  const random = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
  return `EduPX${day}${month}${year}${random}`;
}

// Create a new submission
export const createSubmission = mutation({
  args: {
    submissionType: v.string(),
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),
    programPosition: v.optional(v.string()),
    age: v.optional(v.string()),
    education: v.optional(v.string()),
    field: v.optional(v.string()),
    businessExperience: v.optional(v.string()),
    businessTracks: v.optional(v.string()),
    businessIdea: v.optional(v.string()),
    motivation: v.optional(v.string()),
    enquiryType: v.optional(v.string()),
    enquiryMessage: v.optional(v.string()),
    reservationReason: v.optional(v.string()),
    preferredStartDate: v.optional(v.string()),
    totalExperience: v.optional(v.string()),
    currentSalary: v.optional(v.string()),
    relevantExperience: v.optional(v.string()),
    whyJoin: v.optional(v.string()),
    availabilityDate: v.optional(v.string()),
    interestType: v.optional(v.string()),
    interestMessage: v.optional(v.string()),
    paymentFor: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    paymentMessage: v.optional(v.string()),
    internationalExperience: v.optional(v.string()),
    languageSkills: v.optional(v.string()),
    newsletter: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const referenceNumber = generateReferenceNumber();
    const submissionDate = new Date().toISOString();

    const submissionId = await ctx.db.insert("submissions", {
      referenceNumber,
      submissionDate,
      status: "new",
      ...args,
    });

    // Schedule email sending action (non-blocking)
    ctx.scheduler.runAfter(0, internal.emails.sendSubmissionConfirmationEmail, {
      referenceNumber,
      firstName: args.firstName,
      lastName: args.lastName,
      email: args.email,
      phone: args.phone,
      country: args.country,
      submissionType: args.submissionType,
      programPosition: args.programPosition,
      submissionDate,
      businessIdea: args.businessIdea,
      motivation: args.motivation,
      enquiryMessage: args.enquiryMessage,
      reservationReason: args.reservationReason,
      interestMessage: args.interestMessage,
      paymentMessage: args.paymentMessage,
    });

    return {
      success: true,
      referenceNumber,
      submissionId,
      message: "Submission received successfully",
    };
  },
});

// Get all submissions (for admin dashboard)
export const getAllSubmissions = query({
  args: {},
  handler: async (ctx) => {
    const submissions = await ctx.db
      .query("submissions")
      .order("desc")
      .collect();
    return submissions;
  },
});

// Get submissions by type
export const getSubmissionsByType = query({
  args: { submissionType: v.string() },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_submission_type", (q) =>
        q.eq("submissionType", args.submissionType)
      )
      .order("desc")
      .collect();
    return submissions;
  },
});

// Get submissions by status
export const getSubmissionsByStatus = query({
  args: { status: v.string() },
  handler: async (ctx, args) => {
    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_status", (q) => q.eq("status", args.status))
      .order("desc")
      .collect();
    return submissions;
  },
});

// Get submission by reference number
export const getSubmissionByReference = query({
  args: { referenceNumber: v.string() },
  handler: async (ctx, args) => {
    const submission = await ctx.db
      .query("submissions")
      .withIndex("by_reference", (q) =>
        q.eq("referenceNumber", args.referenceNumber)
      )
      .first();
    return submission;
  },
});

// Update submission status
export const updateSubmissionStatus = mutation({
  args: {
    submissionId: v.id("submissions"),
    status: v.string(),
    adminNotes: v.optional(v.string()),
    followUpDate: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { submissionId, status, ...otherUpdates } = args;

    // Get the existing submission to access old status and other fields
    const submission = await ctx.db.get(submissionId);

    if (!submission) {
      throw new Error("Submission not found");
    }

    const oldStatus = submission.status || "new";

    // Update the submission
    await ctx.db.patch(submissionId, { status, ...otherUpdates });

    // Only send email if status actually changed
    if (oldStatus !== status) {
      // Schedule email sending action (non-blocking)
      ctx.scheduler.runAfter(0, internal.emails.sendStatusUpdateEmail, {
        referenceNumber: submission.referenceNumber,
        firstName: submission.firstName,
        lastName: submission.lastName,
        email: submission.email,
        submissionType: submission.submissionType,
        programPosition: submission.programPosition,
        oldStatus,
        newStatus: status,
        submissionDate: submission.submissionDate,
      });
    }

    return { success: true };
  },
});

// Delete a submission
export const deleteSubmission = mutation({
  args: { submissionId: v.id("submissions") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.submissionId);
    return { success: true };
  },
});

// Get statistics for dashboard
export const getSubmissionStats = query({
  args: {},
  handler: async (ctx) => {
    const allSubmissions = await ctx.db.query("submissions").collect();

    const stats = {
      total: allSubmissions.length,
      byType: {} as Record<string, number>,
      byStatus: {} as Record<string, number>,
      byProgram: {} as Record<string, number>,
      recent: allSubmissions.slice(0, 5),
    };

    allSubmissions.forEach((sub) => {
      // Count by type
      stats.byType[sub.submissionType] = (stats.byType[sub.submissionType] || 0) + 1;

      // Count by status
      const status = sub.status || "new";
      stats.byStatus[status] = (stats.byStatus[status] || 0) + 1;

      // Count by program (if exists)
      if (sub.programPosition) {
        stats.byProgram[sub.programPosition] = (stats.byProgram[sub.programPosition] || 0) + 1;
      }
    });

    return stats;
  },
});
