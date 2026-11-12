import Link from "next/link"
import { Banknote, Bookmark, Briefcase, Building2, Globe } from "lucide-react"

import { formatSalaryRange } from "@/lib/jobs"
import type { JobPost } from "@/types/job"

// Small rounded pill used for salary, job type, or remote status
function JobChip({
  icon,
  children,
  tone = "default",
}: {
  icon: React.ReactNode
  children: React.ReactNode
  tone?: "default" | "green"
}) {
  return (
    <span
      className={`inline-flex h-7.5 items-center gap-1.5 rounded-md border px-2.5 text-sm ${tone === "green"
        ? "border-[#22C55E]/30 bg-[#22C55E]/10 text-[#22C55E]"
        : "border-white/10 bg-[#1A1A1F] text-[#EDEDEF]"
        }`}
    >
      {icon}
      {children}
    </span>
  )
}

// Single job card in the browse jobs list
export function JobCard({ job }: { job: JobPost }) {

  return (
    <article className="relative flex gap-4 rounded-xl border border-white/[.07] bg-[#141418] p-4 sm:p-6">

      <Link
        href={`/browse-jobs/${job._id}`}
        className="absolute inset-0 rounded-xl"
        aria-label={`View ${job.title} details`}
      />

      {/* Company logo placeholder */}
      <div className="pointer-events-none hidden size-16 shrink-0 items-center justify-center rounded-lg border border-white/[.07] bg-[#222228] sm:flex">
        <Building2 className="size-6 text-[#8E9192]" />
      </div>

      <div className="pointer-events-none flex-1">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[#EDEDEF] transition-colors hover:text-[#C3C0FF]">
              {job.title}
            </h3>

            <p className="mt-1 text-sm text-[#6E6E78]">

              {job.company} &bull; {job.location}
              {job.isRemote ? " (Remote)" : ""}

            </p>
          </div>

          <button
            type="button"
            aria-label={`Save ${job.title}`}
            className="pointer-events-auto relative z-10 inline-flex size-10 shrink-0 items-center justify-center rounded-lg text-[#8E9192] transition-colors hover:text-[#EDEDEF]"
          >
            <Bookmark className="size-4.5" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap items-center gap-2">
          <JobChip icon={<Banknote className="size-3.5 text-[#E5E2E3]" />}>
            {formatSalaryRange(job)}
          </JobChip>

          <JobChip icon={<Briefcase className="size-3.5 text-[#E5E2E3]" />}>
            {job.jobType}
          </JobChip>

          {job.isRemote ? (
            <JobChip tone="green" icon={<Globe className="size-3.5" />}>
              Remote
            </JobChip>
          ) : null}
        </div>
      </div>
    </article>
  );
}
