'use server';
import { JobPost } from "@/types/job"
import type { JobForm } from "@/types/job"
import { protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getJobs = async (query = ""): Promise<JobPost[]> => {
  const res = await fetch(`${BASE_URL}/jobs?${query}`)
  return res.json()
}

// The backend has no GET /jobs/:id endpoint yet, so we fetch the list and pick
// one. Swap this for a dedicated endpoint when the server adds one.
export const getJobById = async (id: string): Promise<JobPost | null> => {
  const res = await fetch(`${BASE_URL}/jobs/${id}`)
  return res.json()
}

export const createJob = async (data: JobForm) => {
  const api = `${BASE_URL}/jobs`;
  const res = await protectedMutation(api, 'POST', data);

  return res.json()
}
