import { Building2, ChevronLeft, ChevronRight, Download } from "lucide-react"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { ApplicationStatusBadge } from "@/components/applications/application-status-badge"
import { formatRelativeTime } from "@/lib/applications"
import type { Application } from "@/types/application"
import { getApplications } from "@/lib/actions/applications"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

// Stats are computed so real data plugs in without changing the layout
function getStats(applications: Application[]) {
    const total = applications.length
    const count = (status: Application["status"]) =>
        applications.filter((application) => application.status === status).length
    const offered = count("offered")
    return {
        total,
        shortlisted: count("shortlisted"),
        interviews: count("interview"),
        successRate: total ? Math.round((offered / total) * 100) : 0,
    }
}

export default async function MyApplicationsPage() {

    const session = await auth.api.getSession({
        headers: await headers()
    })

    const applications = await getApplications(`applicantId=${session?.user.id}`);
    const stats = getStats(applications);

    const statCards: {
        label: string
        value: string
        tone?: "amber" | "green"
    }[] = [
            { label: "Total Applied", value: String(stats.total) },
            { label: "Shortlisted", value: String(stats.shortlisted) },
            { label: "Interviews", value: String(stats.interviews), tone: "amber" },
            { label: "Success Rate", value: `${stats.successRate}%`, tone: "green" },
        ]

    return (
        <div className="flex-1 p-6">
            <div className="mx-auto max-w-6xl space-y-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold text-white">
                            My Applications
                        </h1>
                        <p className="mt-1 text-[15px] text-[#A0A0AB]">
                            Track your job applications and interview progress in real-time.
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {/* Active / Archived filter — wired up later */}
                        <div className="inline-flex h-10.5 items-center gap-1 rounded-lg border border-white/[.07] bg-[#1A1A1F] p-1">
                            <button
                                type="button"
                                className="h-8 rounded-md border border-white/10 bg-[#1A1A1F] px-3.5 text-sm text-[#EDEDEF]"
                            >
                                Active
                            </button>
                            <button
                                type="button"
                                className="h-8 px-3.5 text-sm text-[#A0A0AB]"
                            >
                                Archived
                            </button>
                        </div>
                        {/* Export — wired up later */}
                        <button
                            type="button"
                            className="inline-flex h-10.5 items-center gap-2 rounded-lg bg-[#FAFAFA] px-4 text-sm font-medium text-[#0B0B0C] transition-colors hover:bg-white"
                        >
                            <Download className="size-3.5 text-[#2F3131]" />
                            Export PDF
                        </button>
                    </div>
                </div>

                {/* Stats overview */}
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                    {statCards.map((stat) => (
                        <div
                            key={stat.label}
                            className="rounded-xl border border-white/[.07] bg-[#141418] p-5"
                        >
                            <p className="text-sm text-[#A0A0AB]">{stat.label}</p>
                            <p
                                className={`mt-2 text-3xl font-semibold ${stat.tone === "amber"
                                        ? "text-[#F59E0B]"
                                        : stat.tone === "green"
                                            ? "text-[#22C55E]"
                                            : "text-[#EDEDEF]"
                                    }`}
                            >
                                {stat.value}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Applications table */}
                <div className="overflow-hidden rounded-2xl border border-white/[.07] bg-[#141418]">
                    <Table className="min-w-225">
                        <TableHeader>
                            <TableRow className="border-b border-white/[.07] bg-[#1A1A1F] hover:bg-[#1A1A1F]">
                                <TableHead className="h-11 px-5 text-left text-sm text-[#6E6E78]">
                                    Job Title
                                </TableHead>
                                <TableHead className="h-11 px-3 text-left text-sm text-[#6E6E78]">
                                    Company
                                </TableHead>
                                <TableHead className="h-11 px-3 text-left text-sm text-[#6E6E78]">
                                    Applied
                                </TableHead>
                                <TableHead className="h-11 px-3 text-left text-sm text-[#6E6E78]">
                                    Status
                                </TableHead>
                                <TableHead className="h-11 px-3 pr-5 text-right text-sm text-[#6E6E78]">
                                    Action
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {applications.map((application: Application) => (
                                <TableRow
                                    key={application._id}
                                    className="border-b border-white/[.07] last:border-0 hover:bg-white/2"
                                >
                                    <TableCell className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <span className="flex size-8 shrink-0 items-center justify-center rounded bg-[#222228]">
                                                <Building2 className="size-4 text-[#8E9192]" />
                                            </span>
                                            <div>
                                                <p className="text-[15px] text-[#EDEDEF]">
                                                    {application.jobTitle}
                                                </p>
                                                <p className="text-[13px] text-[#A0A0AB]">
                                                    {application.jobType} &bull;{" "}
                                                    {application.isRemote ? "Remote" : "On-site"}
                                                </p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="px-3 py-4 text-[15px] text-[#EDEDEF]">
                                        {application.companyName}
                                    </TableCell>
                                    <TableCell className="px-3 py-4 text-[15px] text-[#A0A0AB]">
                                        {formatRelativeTime(application.appliedAt)}
                                    </TableCell>
                                    <TableCell className="px-3 py-4">
                                        <ApplicationStatusBadge status={application.status} />
                                    </TableCell>
                                    <TableCell className="px-3 py-4 pr-5 text-right">
                                        {/* Details — wired up later */}
                                        <button
                                            type="button"
                                            className="h-8 rounded-lg px-3 text-sm text-[#EDEDEF] transition-colors hover:bg-white/5"
                                        >
                                            Details
                                        </button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    {/* Pagination — wired up later */}
                    <div className="flex items-center justify-between border-t border-white/[.07] bg-[#1A1A1F] px-5 py-4">
                        <p className="text-sm text-[#A0A0AB]">
                            Showing 1-{applications.length} of {applications.length}{" "}
                            applications
                        </p>
                        <div className="flex items-center gap-1.5">
                            <button
                                type="button"
                                aria-label="Previous page"
                                className="inline-flex size-8 items-center justify-center rounded-lg border border-white/8 text-[#C4C7C8]"
                            >
                                <ChevronLeft className="size-3.5" />
                            </button>
                            <button
                                type="button"
                                className="inline-flex size-8 items-center justify-center rounded-lg bg-white text-sm text-[#0B0B0C]"
                            >
                                1
                            </button>
                            <button
                                type="button"
                                aria-label="Next page"
                                className="inline-flex size-8 items-center justify-center rounded-lg border border-white/8 text-[#C4C7C8]"
                            >
                                <ChevronRight className="size-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
