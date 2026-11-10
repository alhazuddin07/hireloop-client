import type { JobStatus } from "@/types/job"

const STATUS_STYLES = {
  active: "bg-[#14532D]/40 text-[#4ADE80]",
  expired: "bg-[#1F1F1F] text-[#A0A0AB]",
} as const

const STATUS_DOT_STYLES = {
  active: "bg-[#4ADE80]",
  expired: "bg-[#5A5A60]",
} as const

export function StatusBadge({ status }: { status: JobStatus }) {
  return (
    <span
      className={`inline-flex h-7 items-center gap-2 rounded-full px-3 ${STATUS_STYLES[status]}`}
    >
      <span className={`size-1.5 rounded-full ${STATUS_DOT_STYLES[status]}`} />
      {status}
    </span>
  )
}
