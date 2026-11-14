"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"

import { APPLICATION_STATUS_OPTIONS } from "@/lib/applications"
import type { ApplicationStatus } from "@/types/application"

// Status dropdown in the recruiter review table. Local-only for now —
// persisting to the database (PATCH /applications/:id) is wired later.
export function ApplicationStatusSelect({
  status,
  applicationId,
}: {
  status: ApplicationStatus
  applicationId: string
}) {
  const [value, setValue] = useState<ApplicationStatus>(status)

  return (
    <div className="relative">
      <select
        aria-label={`Update status for application ${applicationId}`}
        value={value}
        onChange={(event) => {
          const next = event.target.value as ApplicationStatus
          setValue(next)
          // Database update comes later — applicationId identifies the document
          console.log(`update status: ${applicationId} -> ${next}`)
        }}
        className="h-8 w-36 appearance-none rounded-lg border border-[#232327] bg-[#1F1F1F] pr-8 pl-3 text-sm text-[#EDEDEF] outline-none focus-visible:border-[#5C53FE]/60"
      >
        {APPLICATION_STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 size-3.5 -translate-y-1/2 text-[#A0A0AB]" />
    </div>
  )
}
