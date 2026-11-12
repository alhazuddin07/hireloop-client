// Lifecycle of an application, matching the status pills on the
// seeker dashboard "My Applications" table
export type ApplicationStatus =
  "applied" | "review" | "shortlisted" | "interview" | "rejected" | "offered"

// One job application as saved to the database (POST /applications).
// The job fields are snapshotted at apply time so the My Applications
// table renders without extra joins.
export type Application = {
  _id: string
  jobId: string
  userId: string
  email: string
  // Job snapshot
  jobTitle: string
  companyName: string
  jobType: string
  isRemote: boolean
  // Tracking
  appliedAt: string // ISO date-time
  status: ApplicationStatus
}
