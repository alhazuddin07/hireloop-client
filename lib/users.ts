import type { Role } from "@/types/menu"

// Every role a user can hold, with its display label — shared by the role
// toggle (admin view) and any other surface that renders roles
export const ROLE_OPTIONS: {
  value: Role
  label: string
}[] = [
  { value: "seeker", label: "Seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
]

export const ROLE_LABELS: Record<Role, string> = Object.fromEntries(
  ROLE_OPTIONS.map(({ value, label }) => [value, label])
) as Record<Role, string>

// "Oct 12, 2023" — as shown in the Join Date column
export function formatJoinDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  })
}
