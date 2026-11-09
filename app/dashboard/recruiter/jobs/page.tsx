import Link from "next/link"
import {
  Briefcase,
  ChevronRight,
  EllipsisVertical,
  Eye,
  MapPin,
  Plus,
  SquarePen,
  Users,
} from "lucide-react"

import type { JobForm } from "@/app/dashboard/recruiter/jobs/new/page"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type JobStatus = "Active" | "Expired"

// Same shape we collect on the New Job page, plus the table's own fields
type JobPost = JobForm & {
  id: string
  status: JobStatus
  applicants: number
  posted: string
}

const DUMMY_JOBS: JobPost[] = [
  {
    id: "JB-1041",
    title: "Frontend Developer",
    company: "HirePulse Network",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: true,
    location: "New York, USA",
    deadline: "2025-05-30",
    minSalary: "25",
    maxSalary: "40",
    frequency: "per hour",
    responsibilities: "Build and maintain web interfaces",
    qualifications: "React, TypeScript",
    status: "Active",
    applicants: 34,
    posted: "Posted 4d ago",
  },
  {
    id: "JB-1038",
    title: "Senior Product Designer",
    company: "HirePulse Labs",
    category: "Design",
    jobType: "Full-time",
    isRemote: false,
    location: "London, UK (Hybrid)",
    deadline: "2025-06-14",
    minSalary: "90k",
    maxSalary: "115k",
    frequency: "per year",
    responsibilities: "Own the product design across surfaces",
    qualifications: "Figma, design systems",
    status: "Active",
    applicants: 19,
    posted: "Posted 1w ago",
  },
  {
    id: "JB-1035",
    title: "DevOps Specialist",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Full-time",
    isRemote: false,
    location: "Berlin, Germany",
    deadline: "2025-06-30",
    minSalary: "95k",
    maxSalary: "120k",
    frequency: "per year",
    responsibilities: "Run and scale our cloud infrastructure",
    qualifications: "Kubernetes, Terraform",
    status: "Active",
    applicants: 12,
    posted: "Posted 2w ago",
  },
  {
    id: "JB-1031",
    title: "Product Marketing Lead",
    company: "HirePulse Network",
    category: "Marketing",
    jobType: "Full-time",
    isRemote: true,
    location: "Remote (EU/US)",
    deadline: "2025-07-15",
    minSalary: "80k",
    maxSalary: "105k",
    frequency: "per year",
    responsibilities: "Lead go-to-market campaigns",
    qualifications: "5+ years in B2B SaaS marketing",
    status: "Active",
    applicants: 27,
    posted: "Posted 5d ago",
  },
  {
    id: "JB-1027",
    title: "QA Automation Engineer",
    company: "HirePulse Platform",
    category: "Engineering & Tech",
    jobType: "Part-time",
    isRemote: false,
    location: "Dublin, Ireland (Hybrid)",
    deadline: "2025-05-01",
    minSalary: "35",
    maxSalary: "50",
    frequency: "per hour",
    responsibilities: "Automate regression and E2E test suites",
    qualifications: "Playwright, CI pipelines",
    status: "Expired",
    applicants: 8,
    posted: "Closed",
  },
]

const FREQUENCY_SHORT: Record<string, string> = {
  "per hour": "hr",
  "per week": "wk",
  "per month": "mo",
  "per year": "yr",
}

function formatSalary(job: JobPost) {
  const unit = FREQUENCY_SHORT[job.frequency] ?? job.frequency
  return `€${job.minSalary} – €${job.maxSalary} / ${unit}`
}

function formatDeadline(job: JobPost) {
  return new Date(job.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

const STATUS_STYLES = {
  Active: "bg-[#14532D]/40 text-[#4ADE80]",
  Expired: "bg-[#1F1F1F] text-[#A0A0AB]",
} as const

const STATUS_DOT_STYLES = {
  Active: "bg-[#4ADE80]",
  Expired: "bg-[#5A5A60]",
} as const

const HEAD_CELL =
  "h-[50px] px-3 text-[13px] font-medium uppercase text-[#A0A0AB] whitespace-nowrap"

export default function ManageJobsPage() {
  return (
    <div className="flex-1 p-6">
      <div className="mx-auto max-w-7xl">
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
                <TableHead className={`${HEAD_CELL} px-5 text-left`}>
                  Job Title &amp; Dept
                </TableHead>
                <TableHead className={`${HEAD_CELL} text-left`}>
                  Company &amp; Location
                </TableHead>
                <TableHead className={`${HEAD_CELL} text-left`}>Type</TableHead>
                <TableHead className={`${HEAD_CELL} text-left`}>
                  Compensation
                </TableHead>
                <TableHead
                  className={`${HEAD_CELL} hidden text-left md:table-cell`}
                >
                  Applicants
                </TableHead>
                <TableHead className={`${HEAD_CELL} text-left`}>
                  Status
                </TableHead>
                <TableHead
                  className={`${HEAD_CELL} hidden text-left lg:table-cell`}
                >
                  Deadline
                </TableHead>
                <TableHead className={`${HEAD_CELL} pr-5 text-right`}>
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {DUMMY_JOBS.map((job) => (
                <TableRow
                  key={job.id}
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
                  {/* Applicants (hidden on small screens) */}
                  <TableCell className="hidden px-3 py-4 whitespace-nowrap md:table-cell">
                    <span className="flex items-center gap-2 text-[#C3C0FF]">
                      <Users className="size-4" />
                      {job.applicants} Candidates
                    </span>
                  </TableCell>
                  {/* Status */}
                  <TableCell className="px-3 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex h-7 items-center gap-2 rounded-full px-3 ${STATUS_STYLES[job.status]}`}
                    >
                      <span
                        className={`size-1.5 rounded-full ${STATUS_DOT_STYLES[job.status]}`}
                      />
                      {job.status}
                    </span>
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
                      <button
                        type="button"
                        aria-label={`View ${job.title}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg bg-[#1F1F1F] text-[#A0A0AB] hover:text-white"
                      >
                        <Eye className="size-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`More actions for ${job.title}`}
                        className="inline-flex size-8 items-center justify-center rounded-lg text-[#A0A0AB] hover:bg-[#1F1F1F] hover:text-white"
                      >
                        <EllipsisVertical className="size-4" />
                      </button>
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
