import { headers } from "next/headers";
import { auth } from "../auth";


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