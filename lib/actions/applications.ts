'use server';
import type { Application } from "@/types/application"
import { authFetch, protectedMutation } from "../core/server"

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

// GET /applications?userId= - placeholder unatil loading is wired.
export const getApplications = async (query: string) => {
  const api = `${BASE_URL}/applications?${query}`
  const res = await authFetch(api)
  return res.json()
}

export const getApplicationsCount = async (
  query: string
): Promise<{ count: number }> => {
  const res = await fetch(`${BASE_URL}/applications/count?${query}`)

  if (!res.ok) {
    throw new Error("Failed to fetch application count")
  }

  return res.json()
}

export const applyToAJob = async (data: Omit<Application, "_id">) => {

  const api = `${BASE_URL}/applications`;
  const res = await protectedMutation(api, 'POST', data)

  return res.json()
}

// update status: like applied, reject, review
export const updateApplicationStatus = async( id: string, data: {status: string})=> {
  const api = `${BASE_URL}/applications/${id}`;
  const response = await protectedMutation(api, 'PATCH', data)

  if(!response.ok){
    throw new Error("Failed to fetch application")
  }
  
  return response.json();
};
