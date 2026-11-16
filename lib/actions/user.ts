'use server';
import { protectedMutation } from "../core/server";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:5000"

export const updateUserRole = async (userId: string, role: 'seeker' | 'recruiter' | 'admin') => {
    const api = `${BASE_URL}/users/${userId}/role`;
    const res = await protectedMutation(api, 'PATCH', { role })

    if (!res.ok) {
        
        const error = await res.json();

        throw new Error(error.msg || 'Role update failed');
    }

    return res.json();
};