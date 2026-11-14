"use server"

import { revalidatePath } from "next/cache"
import { updateApplicationStatus } from "@/lib/actions/applications"
import type { ApplicationStatus } from "@/types/application"

export const handleStatusChange = async (
  id: string,
  status: ApplicationStatus
) => {
  try {
    const result = await updateApplicationStatus(id, { status })

    revalidatePath("/dashboard/recruiter/jobs/[id]/applications", "page")

    return { success: true, data: result }
  } catch (error) {
    console.error(error)
    return { success: false }
  }
}