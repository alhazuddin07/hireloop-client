import type { Application } from "@/types/application"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"


// GET /applications?userId= - placeholder unatil loading is wired.
export const getApplications = async (query: string) => {
  const res = await fetch(`${BASE_URL}/applications?${query}`)
  return res.json()
}

export const getApplicationsCount = async (query: string): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`)

  if (!res.ok) {
    throw new Error("Failed to fetch application count");
  }

  return res.json()
}

export const applyToAJob = async (data: Omit<Application, "_id">) => {
  const res = await fetch(`${BASE_URL}/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  return res.json()
}
