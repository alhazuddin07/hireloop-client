import { notFound } from "next/navigation"
import {
  Banknote,
  Bookmark,
  BriefcaseBusiness,
  Building2,
  MapPin,
  Users,
} from "lucide-react"

import {
  BulletList,
  DetailSection,
  InfoTile,
} from "@/components/jobs/job-detail"
import { Navbar } from "@/components/navbar"
import { getJobById } from "@/lib/api/jobs"
import { formatDeadline, formatSalaryRange } from "@/lib/jobs"

// Qualifications are stored as free text; show each line as a bullet
function toBulletItems(text: string) {
  return text
    .split("\n")
    .map((line) => line.replace(/^•\s*/, "").trim())
    .filter(Boolean)
}

const JobDetailsPage = async ({ params }: {params: Promise<{ id: string }>}) => {

  const { id } = await params
  const job = await getJobById(id)
  if (!job) notFound()

  return (
    <div className="min-h-svh bg-[#08080A]">
      <Navbar />
      <main className="mx-auto w-full max-w-310 px-4 py-8 sm:px-6">
        {/* Header card */}
        <div className="relative overflow-hidden rounded-2xl border border-white/[.07] bg-[#141418] p-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-24 size-52 rounded-full bg-white/5 blur-3xl"
          />
          <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
            {/* Company logo placeholder */}
            <div className="flex size-20 shrink-0 items-center justify-center rounded-xl border border-white/[.07] bg-[#1A1A1F]">
              <Building2 className="size-8 text-[#8E9192]" />
            </div>

            <div className="flex-1">
              <h1 className="text-3xl font-semibold text-[#EDEDEF]">
                {job.title}
              </h1>
              <div className="mt-2 flex items-center gap-3 text-[15px]">
                <span className="text-[#A0A0AB]">{job.company}</span>
                <span className="size-1 rounded-full bg-[#8E9192]" />
                <span className="flex items-center gap-1.5 text-[#22C55E]">
                  {job.status === "active" ? "Verified Employer" : "Closed"}
                </span>
              </div>
            </div>

            {/* Wired up later — intentionally no handlers yet */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                aria-label={`Save ${job.title}`}
                className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/[.07] bg-[#222228] text-[#E5E2E3] transition-colors hover:text-white"
              >
                <Bookmark className="size-4.5" />
              </button>
              <button
                type="button"
                className="h-12 rounded-lg bg-[#FAFAFA] px-6 font-medium text-[#0B0B0C] transition-colors hover:bg-white"
              >
                Apply Now
              </button>
            </div>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_397px]">
          {/* Main content */}
          <div className="space-y-6">
            {/* Bento info grid */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              <InfoTile
                icon={Banknote}
                label="Salary Range"
                value={formatSalaryRange(job)}
              />
              <InfoTile icon={MapPin} label="Location" value={job.location} />
              <InfoTile
                icon={BriefcaseBusiness}
                label="Job Type"
                value={job.jobType}
              />
              <InfoTile
                icon={Users}
                label="Applicants"
                value={`${job.applicants} Candidates`}
              />
            </div>

            {/* Content sections */}
            <div className="rounded-2xl border border-white/[.07] bg-[#141418]">
              <DetailSection title="Job Description">
                <p className="leading-7 text-[#A0A0AB]">
                  {job.responsibilities}
                </p>
              </DetailSection>
              <DetailSection title="Requirements">
                <BulletList items={toBulletItems(job.qualifications)} />
              </DetailSection>
              <DetailSection title="Application Deadline">
                <p className="leading-7 text-[#A0A0AB]">
                  Apply before {formatDeadline(job)}.
                </p>
              </DetailSection>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="h-fit rounded-2xl border border-white/[.07] bg-[#141418] p-6">
            <h2 className="text-lg font-semibold text-[#EDEDEF]">
              Company Overview
            </h2>
            <div className="mt-4 flex h-40 items-center justify-center rounded-xl border border-white/[.07] bg-[#1A1A1F]">
              <Building2 className="size-10 text-[#8E9192]" />
            </div>
            <div className="mt-4">
              <div className="flex items-center justify-between border-t border-white/[.07] py-3.5">
                <span className="text-sm text-[#A0A0AB]">Industry</span>
                <span className="text-sm text-[#EDEDEF]">{job.category}</span>
              </div>
              <div className="flex items-center justify-between border-t border-white/[.07] py-3.5">
                <span className="text-sm text-[#A0A0AB]">Location</span>
                <span className="text-sm text-[#EDEDEF]">{job.location}</span>
              </div>
            </div>
            {/* Wired up later — intentionally no handler yet */}
            <button
              type="button"
              className="mt-3 h-11 w-full rounded-[10px] border border-white/10 bg-white/4 text-sm text-[#EDEDEF] transition-colors hover:bg-white/8"
            >
              Visit Website
            </button>
          </aside>
        </div>
      </main>
    </div>
  )
}

export default JobDetailsPage
