import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  submissions: defineTable({
    // Submission metadata
    referenceNumber: v.string(),
    submissionType: v.string(), // 'application', 'reservation', 'enquiry', 'interest', 'payment'
    submissionDate: v.string(),

    // Personal information
    firstName: v.string(),
    lastName: v.string(),
    email: v.string(),
    phone: v.string(),
    country: v.string(),

    // Program/Position information
    programPosition: v.optional(v.string()), // GEEP, IEEP, GBLP, EIP, ERBP or job positions

    // Application specific fields
    age: v.optional(v.string()),
    education: v.optional(v.string()),
    field: v.optional(v.string()),
    businessExperience: v.optional(v.string()),
    businessTracks: v.optional(v.string()),
    businessIdea: v.optional(v.string()),
    motivation: v.optional(v.string()),

    // Enquiry specific fields
    enquiryType: v.optional(v.string()),
    enquiryMessage: v.optional(v.string()),

    // Reservation specific fields
    reservationReason: v.optional(v.string()),
    preferredStartDate: v.optional(v.string()),

    // Job application specific fields
    totalExperience: v.optional(v.string()),
    currentSalary: v.optional(v.string()),
    relevantExperience: v.optional(v.string()),
    whyJoin: v.optional(v.string()),
    availabilityDate: v.optional(v.string()),

    // Interest specific fields
    interestType: v.optional(v.string()),
    interestMessage: v.optional(v.string()),

    // Payment specific fields
    paymentFor: v.optional(v.string()),
    paymentMethod: v.optional(v.string()),
    paymentMessage: v.optional(v.string()),

    // Additional fields
    internationalExperience: v.optional(v.string()),
    languageSkills: v.optional(v.string()),
    newsletter: v.optional(v.string()),

    // Admin fields
    status: v.optional(v.string()), // 'new', 'contacted', 'in-progress', 'completed', 'rejected'
    adminNotes: v.optional(v.string()),
    followUpDate: v.optional(v.string()),
  })
    .index("by_email", ["email"])
    .index("by_submission_type", ["submissionType"])
    .index("by_reference", ["referenceNumber"])
    .index("by_date", ["submissionDate"])
    .index("by_status", ["status"])
    .index("by_program", ["programPosition"]),
});
