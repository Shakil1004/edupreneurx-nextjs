import { cronJobs } from "convex/server";
import { internal } from "./_generated/api";

const crons = cronJobs();

// Daily digest email - runs every day at 9:00 AM UTC
crons.daily(
  "send daily admin digest",
  { hourUTC: 9, minuteUTC: 0 },
  internal.emails.sendDailyAdminDigest
);

export default crons;
