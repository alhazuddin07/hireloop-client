import type { LucideIcon } from "lucide-react"

export type Role = "seeker" | "recruiter" | "admin"

export type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}
