import { notFound } from "next/navigation"
import Link from "next/link"
import { ChevronRight } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge"
import { ApplicationStatusSelect } from "@/components/applications/application-status-select"
import { handleStatusChange } from "./actions"
import { getApplications } from "@/lib/actions/applications"
import { getJobById } from "@/lib/api/jobs"
import { formatRelativeTime } from "@/lib/applications"
import { getSession } from "@/lib/core/server"
import type { Application } from "@/types/application"

const HEAD_CELL =
    "h-11 px-3 text-left text-[13px] font-medium uppercase text-[#6E6E78] whitespace-nowrap"

export default async function JobApplicationsPage({ params }: { params: Promise<{ id: string }> }) {

    const { id } = await params
    const session = await getSession()

    if (!session?.user) notFound()

    const job = await getJobById(id)
    if (!job) notFound()

    // Only the recruiter who owns the job can review its applications
    if (job.recruiterId !== session.user.id) notFound()

    const applications: Application[] = await getApplications(`jobId=${id}`)
    // Newest first, so the most recent applicants are on top for review
    const sorted = [...applications].sort((a, b) =>
        b.appliedAt.localeCompare(a.appliedAt)
    )

    return (
        <div className="flex-1 p-6">
            <div className="mx-auto max-w-6xl">
                {/* Top bar */}
                <nav className="flex flex-wrap items-center gap-2 text-[13px]">
                    <Link
                        href="/dashboard/recruiter/jobs"
                        className="text-[#A0A0AB] transition-colors hover:text-white"
                    >
                        Manage Jobs
                    </Link>
                    <ChevronRight className="size-3 text-[#A0A0AB]" />
                    <span className="max-w-48 truncate text-[#A0A0AB]" title={job.title}>
                        {job.title}
                    </span>
                    <ChevronRight className="size-3 text-[#A0A0AB]" />
                    <span className="text-[#C3C0FF]">Applications</span>
                </nav>
                <div className="mt-1">
                    <h1 className="text-[32px] leading-10.5 font-semibold text-white">
                        Job Applications
                    </h1>
                    <p className="mt-1 text-[15px] leading-5.5 text-[#A0A0AB]">
                        {sorted.length} applicant{sorted.length === 1 ? "" : "s"} for{" "}
                        <span className="text-[#C3C0FF]">{job.title}</span> — review and
                        update each status below.
                    </p>
                </div>

                {/* Applications table */}
                <div className="mt-6 rounded-2xl border border-[#232327] bg-[#151516]">
                    <Table className="min-w-200">
                        <TableHeader>
                            <TableRow className="border-b border-[#232327] bg-[#0B0B0C] hover:bg-[#0B0B0C]">
                                <TableHead className={`${HEAD_CELL} px-5`}>Applicant</TableHead>
                                <TableHead className={HEAD_CELL}>Type</TableHead>
                                <TableHead className={HEAD_CELL}>Applied</TableHead>
                                <TableHead className={HEAD_CELL}>Status</TableHead>
                                <TableHead className={`${HEAD_CELL} pr-5 text-right`}>
                                    Update Status
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {sorted.length === 0 && (
                                <TableRow className="hover:bg-transparent">
                                    <TableCell
                                        colSpan={5}
                                        className="px-5 py-12 text-center text-[15px] text-[#6E6E78]"
                                    >
                                        No applications yet for this job.
                                    </TableCell>
                                </TableRow>
                            )}
                            {sorted.map((application) => (
                                <TableRow
                                    key={application._id}
                                    className="border-b border-[#232327] last:border-0 hover:bg-[#1A1A1B]/50"
                                >
                                    {/* Applicant */}
                                    <TableCell className="px-5 py-4 whitespace-nowrap">
                                        <div className="flex items-center gap-3">
                                            <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#232327] text-sm font-medium text-[#C3C0FF]">
                                                {application.email.charAt(0).toUpperCase()}
                                            </span>
                                            <p className="text-white">{application.email}</p>
                                        </div>
                                    </TableCell>
                                    {/* Type */}
                                    <TableCell className="px-3 py-4 whitespace-nowrap">
                                        <span className="inline-flex h-7.5 items-center rounded-full border border-[#232327] bg-[#1F1F1F] px-3 text-[#D4D4D8]">
                                            {application.jobType} &bull;{" "}
                                            {application.isRemote ? "Remote" : "On-site"}
                                        </span>
                                    </TableCell>
                                    {/* Applied */}
                                    <TableCell className="px-3 py-4 whitespace-nowrap text-[#A0A0AB]">
                                        {formatRelativeTime(application.appliedAt)}
                                    </TableCell>
                                    {/* Current status */}
                                    <TableCell className="px-3 py-4 whitespace-nowrap">
                                        <ApplicationStatusBadge status={application.status} />
                                    </TableCell>
                                    {/* Status update — handler lives in ./actions.ts */}
                                    <TableCell className="px-3 py-4 pr-5 text-right whitespace-nowrap">
                                        <div className="inline-flex">
                                            <ApplicationStatusSelect
                                                applicationId={application._id}
                                                status={application.status}
                                                onStatusChange={handleStatusChange}
                                            />
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
