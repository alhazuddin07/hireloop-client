"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Loader2 } from "lucide-react"

import { ROLE_OPTIONS } from "@/lib/users"
import type { Role } from "@/types/menu"

// Pill styling per role: tinted bg, 30% border, colored text
const ROLE_PILL_STYLES: Record<Role, string> = {
  seeker: "border-white/10 bg-[#A1A4AA]/15 text-[#A0A0AB]",
  recruiter: "border-[#8F88FF]/30 bg-[#8F88FF]/15 text-[#8F88FF]",
  admin: "border-[#5C53FE]/30 bg-[#5C53FE]/15 text-[#A5A0FF]",
}

// Role dropdown in the admin users table, styled as the Figma role pill.
// Updates its own state optimistically and hands the change to onRoleChange —
// the parent decides what to do with it (e.g. a server action that persists).
export function UserRoleSelect({
  userId,
  role,
  onRoleChange,
}: {
  userId: string
  role: Role
  onRoleChange: (userId: string, role: Role) => Promise<{ success: boolean }>
}) {
  const router = useRouter()
  const [value, setValue] = useState<Role>(role)
  const [isPending, startTransition] = useTransition()

  const handleChange = (next: Role) => {
    const previous = value

    setValue(next)

    startTransition(async () => {
      try {
        const result = await onRoleChange(userId, next)

        if (result.success) {
          router.refresh()
        } else {
          setValue(previous)
        }
      } catch (error) {
        console.error("Role update failed:", error)
        setValue(previous)
      }
    })
  }

  return (
    <div className="relative">
      <select
        aria-label={`Change role for user ${userId}`}
        value={value}
        disabled={isPending}
        onChange={(event) => handleChange(event.target.value as Role)}
        className={`h-7.5 cursor-pointer appearance-none rounded-full border pr-7 pl-3 text-[13px] transition-all outline-none disabled:cursor-not-allowed disabled:opacity-60 ${
          ROLE_PILL_STYLES[value]
        }`}
      >
        {ROLE_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2">
        {isPending ? (
          <Loader2 className="size-3 animate-spin" />
        ) : (
          <ChevronDown className="size-3" />
        )}
      </span>
    </div>
  )
}
