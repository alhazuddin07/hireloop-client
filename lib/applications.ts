import type { ApplicationStatus } from "@/types/application"

// Every status an application can move through, with its display label —
// shared by the status badge (seeker view) and the status select (recruiter view)
export const APPLICATION_STATUS_OPTIONS: {
  value: ApplicationStatus
  label: string
}[] = [
  { value: "applied", label: "Applied" },
  { value: "review", label: "Review" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview", label: "Interview" },
  { value: "rejected", label: "Rejected" },
  { value: "offered", label: "Offered" },
]

export const APPLICATION_STATUS_LABELS: Record<ApplicationStatus, string> =
  Object.fromEntries(
    APPLICATION_STATUS_OPTIONS.map(({ value, label }) => [value, label])
  ) as Record<ApplicationStatus, string>

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
