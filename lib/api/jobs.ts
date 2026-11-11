import { JobPost } from "@/types/job"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = ""): Promise<JobPost[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

// The backend has no GET /jobs/:id endpoint yet, so we fetch the list and pick
// one. Swap this for a dedicated endpoint when the server adds one.
export const getJobById = async (id: string): Promise<JobPost | null> => {
  const jobs = await getJobs()
  return jobs.find((job) => job._id === id) ?? null
}
