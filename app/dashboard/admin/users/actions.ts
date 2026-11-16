"use server";

import { updateUserRole } from "@/lib/actions/user";
import { getSession } from "@/lib/core/server";
import type { Role } from "@/types/menu";

export const handleRoleChange = async (
  userId: string,
  role: Role
) => {
  const session = await getSession();

  if (session?.user?.role !== "admin") {
    return { success: false };
  }

  try {
    const res = await updateUserRole(userId, role);

    console.log("Role update response:", res);

    return { success: true };
  } catch (error) {
    console.error("Role update failed:", error);

    return { success: false };
  }
};