'use server';
import { authFetch } from "../core/server"


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const getUsers = async() => {
  const res = await authFetch(`${BASE_URL}/users`);
  return res.json();
}

export const getUserPrimiumById = async (userId: string) => {
  const res = await fetch(`${BASE_URL}/users/${userId}/premium`)
  return res.json()
}