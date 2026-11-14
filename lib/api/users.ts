import { headers } from "next/headers"
import { auth } from "../auth"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getUserPrimiumById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return res.json()
}

export const getUsers = async () => {
  const users = await auth.api.listUsers({
    query: {
      sortBy: 'name',
      sortDirection: 'desc',
    },
    headers: await headers(),
  });
  return users;
}