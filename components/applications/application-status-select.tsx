
"use client"

import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { ChevronDown, Loader2 } from "lucide-react"

import { APPLICATION_STATUS_OPTIONS } from "@/lib/applications"
import type { ApplicationStatus } from "@/types/application"

export function ApplicationStatusSelect({ status, applicationId, onStatusChange }: {
  status: ApplicationStatus
  applicationId: string
  onStatusChange: (
    applicationId: string,
    status: ApplicationStatus
  ) => Promise<{ success: boolean }>
}) {
  const router = useRouter()
  const [value, setValue] = useState<ApplicationStatus>(status)
  const [isPending, startTransition] = useTransition()

  const handleChange = (next: ApplicationStatus) => {
    const previous = value

    setValue(next)

    startTransition(async () => {
      try {
        const result = await onStatusChange(applicationId, next)

        if (result.success) {
          router.refresh()
        } else {
          setValue(previous)
        }
      } catch (error) {
        console.error("Status update failed:", error)
        setValue(previous)
      }
    })
  }

  return (
    <div className="relative">
      <select
        aria-label={`Update status for application ${applicationId}`}
        value={value}
        disabled={isPending}
        onChange={(event) =>
          handleChange(event.target.value as ApplicationStatus)
        }
        className="h-9 w-36 appearance-none rounded-lg border border-[#232327] bg-[#1F1F1F] pr-9 pl-3 text-sm text-[#EDEDEF] outline-none transition-all hover:border-[#5C53FE]/50 focus-visible:border-[#5C53FE] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {APPLICATION_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <span className="pointer-events-none absolute top-1/2 right-2.5 -translate-y-1/2">
        {isPending ? (
          <Loader2 className="size-3.5 animate-spin text-[#A5A0FF]" />
        ) : (
          <ChevronDown className="size-3.5 text-[#A0A0AB]" />
        )}
      </span>
    </div>
  )
}