import { APPLICATION_STATUS_LABELS } from "@/lib/applications"
import type { ApplicationStatus } from "@/types/application"

// Pill styling per status: tinted bg, 30% border, colored text
const STATUS_STYLES: Record<ApplicationStatus, string> = {
  applied: "border-white/10 bg-[#A1A4AA]/15 text-[#A0A0AB]",
  review: "border-[#F59E0B]/30 bg-[#F59E0B]/15 text-[#F59E0B]",
  shortlisted: "border-[#60A5FA]/30 bg-[#60A5FA]/15 text-[#60A5FA]",
  interview: "border-[#60A5FA]/30 bg-[#60A5FA]/15 text-[#60A5FA]",
  rejected: "border-[#EF4444]/30 bg-[#EF4444]/15 text-[#EF4444]",
  offered: "border-[#22C55E]/30 bg-[#22C55E]/15 text-[#22C55E]",
}

export function ApplicationStatusBadge({
  status,
}: {
  status: ApplicationStatus
}) {
  return (
    <span
      className={`inline-flex h-5.5 items-center rounded-full border px-2.5 text-[13px] ${STATUS_STYLES[status]}`}
    >
      {APPLICATION_STATUS_LABELS[status]}
    </span>
  )
}
