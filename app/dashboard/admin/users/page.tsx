import { notFound } from "next/navigation"
import { ChevronDown, Search } from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { UserRoleSelect } from "@/components/users/user-role-select"
import { handleRoleChange } from "./actions"
import { getUsers } from "@/lib/api/users"
import { formatJoinDate } from "@/lib/users"
import { getSession } from "@/lib/core/server"
import type { PlatformUser } from "@/types/user"

const HEAD_CELL =
  "h-11 px-3 text-left text-[13px] font-medium uppercase text-[#6E6E78] whitespace-nowrap"

// Bento stats computed from the loaded users, so real data plugs in without
// changing the layout
function getStats(users: PlatformUser[], total: number) {
  const recruiters = users.filter((user) => user.role === "recruiter").length
  const suspended = users.filter((user) => user.banned).length
  const dayAgo = Date.now() - 24 * 60 * 60 * 1000
  const newSignups = users.filter(
    (user) => new Date(user.createdAt).getTime() > dayAgo
  ).length

  return {
    total,
    recruiters,
    suspended,
    suspendedShare: total
      ? `${Math.round((suspended / total) * 1000) / 10}% of total`
      : "0% of total",
    newSignups,
  }
}

// Status pill styling: tinted bg, 30% border, colored dot + text
const STATUS_STYLES = {
  active:
    "border-[#22C55E]/30 bg-[#22C55E]/14 text-[#22C55E] before:bg-[#22C55E]",
  suspended:
    "border-[#EF4444]/30 bg-[#EF4444]/14 text-[#EF4444] before:bg-[#EF4444]",
} as const

export default async function AdminUsersPage() {
  const session = await getSession()

  // Only admins can manage users
  if (session?.user?.role !== "admin") notFound()

  const { users, total } = await getUsers()
  // Better Auth types role as optional string; the auth config restricts it
  // to the three HireLoop roles, so anything unexpected falls back to seeker
  const list = (users ?? []).map( (user) => ({...user, role: (user.role ?? "seeker") as PlatformUser["role"] }))
  const sorted = [...list].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
  const stats = getStats(sorted, total)

  return (
    <div className="flex-1 p-6">
      <div className="mx-auto max-w-6xl">
        {/* Top app bar — search + manage roles entry point */}
        <div className="flex h-14 items-center justify-between gap-4">
          <div className="relative w-80">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#C4C7C8]" />
            <input
              type="search"
              placeholder="Search by email..."
              className="h-9 w-full rounded-lg border border-white/10 bg-[#0C0C0F] pr-3 pl-9 text-sm text-[#EDEDEF] outline-none placeholder:text-[#A0A0AB] focus-visible:border-[#5C53FE]/60"
            />
          </div>
          <button
            type="button"
            className="flex items-center gap-2 text-sm text-[#A0A0AB] transition-colors hover:text-white"
          >
            Manage Roles
            <ChevronDown className="size-3.5" />
          </button>
        </div>

        {/* Page header */}
        <div className="mt-1 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-[32px] leading-10.5 font-semibold text-white">
              User Management
            </h1>
            <p className="mt-1 text-[15px] leading-5.5 text-[#A0A0AB]">
              Review, filter, and manage platform access for all users.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-11 w-30.5 items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#0C0C0F] text-sm text-[#EDEDEF] transition-colors hover:border-white/25"
            >
              All Roles
              <ChevronDown className="size-3.5 text-[#A0A0AB]" />
            </button>
            <button
              type="button"
              className="flex h-11 items-center justify-center rounded-lg bg-[#FAFAFA] px-4 text-sm font-medium text-[#0B0B0C] transition-colors hover:bg-white"
            >
              Export List
            </button>
          </div>
        </div>

        {/* Bento stats */}
        <div className="mt-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {[
            {
              label: "Total Active Users",
              value: stats.total,
              note: "across all roles",
              noteClass: "text-[#A0A0AB]",
            },
            {
              label: "Recruiter Growth",
              value: stats.recruiters,
              note: "High demand",
              noteClass: "text-[#22C55E]",
            },
            {
              label: "Suspended Accounts",
              value: stats.suspended,
              note: stats.suspendedShare,
              noteClass: "text-[#A0A0AB]",
            },
            {
              label: "New Signups (24h)",
              value: stats.newSignups,
              note: "Steady activity",
              noteClass: "text-[#F59E0B]",
            },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-white/7 bg-[#141418] p-5"
            >
              <p className="text-sm text-[#A0A0AB]">{card.label}</p>
              <p className="mt-2 text-2xl font-semibold text-white">
                {card.value}
              </p>
              <p className={`mt-1 text-xs ${card.noteClass}`}>{card.note}</p>
            </div>
          ))}
        </div>

        {/* Users table */}
        <div className="mt-6 rounded-2xl border border-white/7 bg-[#141418]">
          <Table className="min-w-200">
            <TableHeader>
              <TableRow className="border-b border-white/7 bg-[#1A1A1F] hover:bg-[#1A1A1F]">
                <TableHead className={`${HEAD_CELL} px-5`}>User Name</TableHead>
                <TableHead className={HEAD_CELL}>Email Address</TableHead>
                <TableHead className={HEAD_CELL}>Role</TableHead>
                <TableHead className={HEAD_CELL}>Join Date</TableHead>
                <TableHead className={HEAD_CELL}>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sorted.length === 0 && (
                <TableRow className="hover:bg-transparent">
                  <TableCell
                    colSpan={5}
                    className="px-5 py-12 text-center text-[15px] text-[#6E6E78]"
                  >
                    No users found.
                  </TableCell>
                </TableRow>
              )}
              {sorted.map((user) => (
                <TableRow
                  key={user.id}
                  className="h-16 border-b border-white/7 last:border-0 hover:bg-[#1A1A1F]/50"
                >
                  {/* User */}
                  <TableCell className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      {user.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.image}
                          alt=""
                          className="size-8 shrink-0 rounded-full object-cover"
                        />
                      ) : (
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#222228] text-sm font-medium text-[#A0A0AB]">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                      <p className="text-[#EDEDEF]">{user.name}</p>
                    </div>
                  </TableCell>
                  {/* Email */}
                  <TableCell className="px-3 py-4 whitespace-nowrap text-[#A0A0AB]">
                    {user.email}
                  </TableCell>
                  {/* Role toggle — handler lives in ./actions.ts */}
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <div className="inline-flex">
                      <UserRoleSelect
                        userId={user.id}
                        role={user.role}
                        onRoleChange={handleRoleChange}
                      />
                    </div>
                  </TableCell>
                  {/* Join Date */}
                  <TableCell className="px-3 py-4 whitespace-nowrap text-[#A0A0AB]">
                    {formatJoinDate(user.createdAt)}
                  </TableCell>
                  {/* Status */}
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex h-5.5 items-center gap-1.5 rounded-full border px-2.5 text-[13px] before:size-1.5 before:rounded-full before:content-[''] ${
                        user.banned
                          ? STATUS_STYLES.suspended
                          : STATUS_STYLES.active
                      }`}
                    >
                      {user.banned ? "Suspended" : "Active"}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}
