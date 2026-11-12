import { ChevronDown } from "lucide-react"

import { Navbar } from "@/components/navbar"
import {
  FilterSidebar,
  type FilterGroupData,
} from "@/components/jobs/filter-sidebar"
import { JobCard } from "@/components/jobs/job-card"
import { JobSearchBar } from "@/components/jobs/job-search"
import { getJobs } from "@/lib/api/jobs"
import { JOB_CATEGORIES, JOB_TYPES } from "@/lib/jobs"
import type { JobPost } from "@/types/job"

// How many fetched jobs match a given field value (used for sidebar counts)
function countBy<T extends keyof JobPost>(
  jobs: JobPost[],
  field: T,
  value: JobPost[T]
) {
  return jobs.filter((job) => job[field] === value).length
}

// Sidebar filter groups built from the common JobForm fields
function buildFilterGroups(jobs: JobPost[]): FilterGroupData[] {
  return [
    {
      title: "jobType",
      mode: "single",
      options: JOB_TYPES.map((type) => ({
        label: type,
        count: countBy(jobs, "jobType", type),
      })),
    },
    {
      title: "category",
      mode: "single",
      options: JOB_CATEGORIES.map((category) => ({
        label: category,
        count: countBy(jobs, "category", category),
      })),
    },
    {
      title: "Preferences",
      options: [
        {
          label: "Remote only",
          count: jobs.filter((job) => job.isRemote).length,
        },
      ],
    },
  ]
}

const BrowseJobsPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) => {
  const search = await searchParams
  const query = new URLSearchParams(search as Record<string, string>).toString()
  const jobs = await getJobs(query)
  const filterGroups = buildFilterGroups(jobs)

  return (
    <div className="min-h-svh bg-[#08080A]">
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-8">
        <JobSearchBar />

        <div className="mt-8 grid gap-8 lg:grid-cols-[296px_1fr]">
          <FilterSidebar groups={filterGroups} />

          <section>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <h1 className="text-xl font-semibold text-[#EDEDEF]">
                Found {jobs.length} Professional Jobs
              </h1>
              {/* Sort is presentational for now — convert to a client component
                                when sorting gets wired up */}
              <button
                type="button"
                className="inline-flex h-9 items-center gap-2 rounded-lg border border-white/10 bg-[#0C0C0F] px-3 text-sm text-[#EDEDEF]"
              >
                Most Recent
                <ChevronDown className="size-3.5 text-[#A1A4AA]" />
              </button>
            </div>

            <div className="mt-4 space-y-4">
              {jobs.map((job: JobPost) => (
                <JobCard key={job._id} job={job} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  )
}

export default BrowseJobsPage
