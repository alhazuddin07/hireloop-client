"use server"

import type { Role } from "@/types/menu"

// Handler the admin's role toggle calls. Replace the body with your
// backend/database update when ready — userId identifies the user document.
export const handleRoleChange = async (userId: string, role: Role) => {
  try {
    // TODO: persist the role update to the database
    console.log(`handleRoleChange: ${userId} -> ${role}`)

    return { success: true }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}
