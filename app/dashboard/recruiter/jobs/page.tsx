import Link from "next/link"
import {
  Briefcase,
  ChevronRight,
  Eye,
  MapPin,
  Plus,
  SquarePen,
  Users,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { StatusBadge } from "@/components/jobs/status-badge"
import { getJobs } from "@/lib/api/jobs"
import { formatDeadline, formatSalary } from "@/lib/jobs"
import type { JobPost } from "@/types/job"
import { DeleteJobDialog } from "@/app/components/DeleteJobDialog"
import { getSession } from "@/lib/core/server"

const HEAD_CELL =
  "h-[50px] px-3 text-left text-[13px] font-medium uppercase text-[#A0A0AB] whitespace-nowrap"

export default async function ManageJobsPage() {
  const session = await getSession()

  const jobs = await getJobs(`recruiterId=${session?.user.id}`)

  return (
    <div className="flex-1 p-6">
      <div className="mx-auto max-w-fit">
        {/* Top bar */}
        <div>
          <nav className="flex items-center gap-2 text-[13px]">
            <span className="text-[#A0A0AB]" aria-current="page">
              Manage Jobs
            </span>
            <ChevronRight className="size-3 text-[#A0A0AB]" />
            <span className="text-[#C3C0FF]">Job Listings &amp; Postings</span>
          </nav>
          <div className="mt-1 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-[32px] leading-10.5 font-semibold text-white">
                Manage Job Posts
              </h1>
              <p className="mt-1 text-[15px] leading-5.5 text-[#A0A0AB]">
                Review live listings, monitor applicants, and update job details
                across your organization.
              </p>
            </div>
            <Link
              href="/dashboard/recruiter/jobs/new"
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-[#5C53FE] px-5 text-[15px] text-white hover:bg-[#4A42E8]"
            >
              <Plus className="size-4" />
              New Job Post
            </Link>
          </div>
        </div>

        {/* Jobs table */}
        <div className="mt-6 rounded-2xl border border-[#232327] bg-[#151516]">
          <Table className="min-w-225">
            <TableHeader>
              <TableRow className="border-b border-[#232327] bg-[#0B0B0C] hover:bg-[#0B0B0C]">
                <TableHead className={`${HEAD_CELL} px-5`}>
                  Job Title &amp; Dept
                </TableHead>
                <TableHead className={HEAD_CELL}>
                  Company &amp; Location
                </TableHead>
                <TableHead className={HEAD_CELL}>Type</TableHead>
                <TableHead className={HEAD_CELL}>Compensation</TableHead>
                <TableHead className={`${HEAD_CELL} hidden md:table-cell`}>
                  Applicants
                </TableHead>
                <TableHead className={HEAD_CELL}>Status</TableHead>
                <TableHead className={`${HEAD_CELL} hidden lg:table-cell`}>
                  Deadline
                </TableHead>
                <TableHead className={`${HEAD_CELL} pr-5 text-right`}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {jobs.map((job: JobPost) => (
                <TableRow
                  key={job._id}
                  className="border-b border-[#232327] last:border-0 hover:bg-[#1A1A1B]/50"
                >
                  {/* Title & dept */}
                  <TableCell className="px-5 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-3">
                      <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                        <Briefcase className="size-5 text-[#5C53FE]" />
                      </span>
                      <div>
                        <p className="font-medium text-white">{job.title}</p>
                        <p className="text-[#38BDF8]">{job.category}</p>
                      </div>
                    </div>
                  </TableCell>
                  {/* Company & location */}
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <div>
                      <p className="text-white">{job.company}</p>
                      <p className="mt-0.5 flex items-center gap-1 text-[#A0A0AB]">
                        <MapPin className="size-4" />
                        {job.location}
                      </p>
                    </div>
                  </TableCell>
                  {/* Type */}
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <span className="inline-flex h-7.5 items-center rounded-full border border-[#232327] bg-[#1F1F1F] px-3 text-[#D4D4D8]">
                      {job.jobType}
                    </span>
                  </TableCell>
                  {/* Compensation */}
                  <TableCell className="px-3 py-4 whitespace-nowrap text-white">
                    {formatSalary(job)}
                  </TableCell>
                  {/* Applicants (hidden on small screens) — links to the review page */}
                  <TableCell className="hidden px-3 py-4 whitespace-nowrap md:table-cell">
                    <Link
                      href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                      className="flex items-center gap-2 text-[#C3C0FF] hover:underline hover:underline-offset-4"
                    >
                      <Users className="size-4" />
                      {job.applicants} Candidates
                    </Link>
                  </TableCell>
                  {/* Status */}
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <StatusBadge status={job.status} />
                  </TableCell>
                  {/* Deadline (hidden on small screens) */}
                  <TableCell className="hidden px-3 py-4 whitespace-nowrap lg:table-cell">
                    <div>
                      <p className="text-white">{formatDeadline(job)}</p>
                      <p className="text-[#5A5A60]">{job.posted}</p>
                    </div>
                  </TableCell>
                  {/* Actions */}
                  <TableCell className="px-3 py-4 pr-5 text-right whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <Link
                        href="/dashboard/recruiter/jobs/new"
                        className="inline-flex h-8 items-center gap-1.5 rounded-lg bg-[#5C53FE] px-3 text-[#C3C0FF] hover:bg-[#4A42E8]"
                      >
                        <SquarePen className="size-4" />
                        Update
                      </Link>
                      <Link
                        href={`/dashboard/recruiter/jobs/${job._id}/applications`}
                        aria-label={`View applications for ${job.title}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg bg-[#1F1F1F] text-[#A0A0AB] hover:text-white"
                      >
                        <Eye className="size-4" />
                      </Link>

                      <DeleteJobDialog job={job} />
                    </div>
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
