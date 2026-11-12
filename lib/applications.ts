import type { Application } from "@/types/application"

// "2 hours ago", "1 day ago", "2 weeks ago" — as shown in the Applied column
export function formatRelativeTime(iso: string) {
  const seconds = Math.round((Date.now() - new Date(iso).getTime()) / 1000)
  if (seconds < 60) return "just now"

  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `${minutes} minute${minutes === 1 ? "" : "s"} ago`

  const hours = Math.round(minutes / 60)
  if (hours < 24) return `${hours} hour${hours === 1 ? "" : "s"} ago`

  const days = Math.round(hours / 24)
  if (days < 7) return `${days} day${days === 1 ? "" : "s"} ago`

  const weeks = Math.round(days / 7)
  if (weeks < 5) return `${weeks} week${weeks === 1 ? "" : "s"} ago`

  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

// Placeholder data for the My Applications page until the applications
// endpoint is wired up — swap the page's import for a real fetch then.
const hoursAgo = (n: number) =>
  new Date(Date.now() - n * 60 * 60 * 1000).toISOString()

export const DUMMY_APPLICATIONS: Application[] = [
  {
    _id: "app_1",
    jobId: "job_1",
    userId: "user_1",
    email: "seeker@hireloop.dev",
    jobTitle: "Senior Frontend Engineer",
    companyName: "Stark Industries",
    jobType: "Full-time",
    isRemote: true,
    appliedAt: hoursAgo(2),
    status: "applied",
  },
  {
    _id: "app_2",
    jobId: "job_2",
    userId: "user_1",
    email: "seeker@hireloop.dev",
    jobTitle: "Product Designer",
    companyName: "Cyberdyne Systems",
    jobType: "Contract",
    isRemote: false,
    appliedAt: hoursAgo(24),
    status: "review",
  },
  {
    _id: "app_3",
    jobId: "job_3",
    userId: "user_1",
    email: "seeker@hireloop.dev",
    jobTitle: "Lead Data Scientist",
    companyName: "Wayne Enterprises",
    jobType: "Full-time",
    isRemote: false,
    appliedAt: hoursAgo(24 * 4),
    status: "shortlisted",
  },
  {
    _id: "app_4",
    jobId: "job_4",
    userId: "user_1",
    email: "seeker@hireloop.dev",
    jobTitle: "Cloud Architect",
    companyName: "Oscorp Tech",
    jobType: "Full-time",
    isRemote: true,
    appliedAt: hoursAgo(24 * 7),
    status: "rejected",
  },
  {
    _id: "app_5",
    jobId: "job_5",
    userId: "user_1",
    email: "seeker@hireloop.dev",
    jobTitle: "AI Research Engineer",
    companyName: "Hooli Corp",
    jobType: "Full-time",
    isRemote: true,
    appliedAt: hoursAgo(24 * 14),
    status: "offered",
  },
]
