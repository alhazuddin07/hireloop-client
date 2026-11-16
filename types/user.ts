import type { Role } from "@/types/menu"

// User as it arrives from Better Auth's admin listUsers — role comes from the
// additionalFields config, banned from the admin plugin
export type PlatformUser = {
  id: string
  _id?: string
  name: string
  email: string
  role: Role
  createdAt: Date | string
  image?: string | null
  banned?: boolean | null
}

export type UserList = {
  users: PlatformUser[]
  total: number
}
