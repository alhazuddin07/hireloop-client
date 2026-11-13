"use client"

import { applyToAJob, getApplicationsCount } from "@/lib/actions/applications"
import { useSession } from "@/lib/auth-client"
import { JobPost } from "@/types/job"
import { Bookmark } from "lucide-react"
import { useRouter } from "next/navigation"
import { useSyncExternalStore } from "react"
import { toast } from "@/components/ui/toast"

// Applied jobs are tracked client-side per user so the Apply button disables
// right away, even before this data shows up in the My Applications page.
const APPLIED_JOBS_PREFIX = "hireloop:applied-jobs"

// localStorage isn't observable, so keep a tiny listener set that the
// apply flow notifies after every write
const listeners = new Set<() => void>()

const readAppliedJobIds = (userId: string): string[] => {
  try {
    return JSON.parse(
      localStorage.getItem(`${APPLIED_JOBS_PREFIX}:${userId}`) ?? "[]"
    )
  } catch {
    return []
  }
}

const subscribeAppliedJobs = (listener: () => void) => {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

const notifyAppliedJobsChange = () => {
  listeners.forEach((listener) => listener())
}

const saveAppliedJobId = (userId: string, jobId: string) => {
  const ids = readAppliedJobIds(userId)
  if (!ids.includes(jobId)) {
    localStorage.setItem(
      `${APPLIED_JOBS_PREFIX}:${userId}`,
      JSON.stringify([...ids, jobId])
    )
    notifyAppliedJobsChange()
  }
}

const ApplyNow = ({ job }: { job: JobPost }) => {
  const router = useRouter()

  const { data: session } = useSession()
  const user = session?.user
  const userId = user?.id ?? "guest"

  // Reactive read of the applied list; false on the server so hydration
  // always starts with the "Apply Now" button
  const hasApplied = useSyncExternalStore(
    subscribeAppliedJobs,
    () => readAppliedJobIds(userId).includes(job._id),
    () => false
  )

  const handleApplyNow = async () => {
    if (hasApplied) return

    if (!user) {
      router.push(`/sign-in?redirectTo=/browse-jobs/${job._id}`)
      return
    } else if (user.role === "seeker") {
      // number of jobs applied by this user
      const countResult = await getApplicationsCount(`applicantId=${user.id}`)

      //less more then 10 and not premium user
      if (countResult.count >= 10) {
        // redirect to the payment page
        router.push("/checkout")

        return
      } else {
        // Everything the database needs for one application
        const application = {
          jobId: job._id,
          userId: user.id,
          email: user.email,
          jobTitle: job.title,
          companyName: job.company,
          jobType: job.jobType,
          isRemote: job.isRemote,
          appliedAt: new Date().toISOString(),
          status: "applied" as const,
        }

        const result = await applyToAJob(application)
        if (result.insertedId) {
          // Remember it locally so the button stays disabled per job
          saveAppliedJobId(user.id, job._id)
          toast.add({
            title: "Application submitted",
            description: `You applied for ${job.title} at ${job.company}.`,
          })
        }
      }
    } else {
      console.log("user is not a job seeker")
    }
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label={`Save ${job.title}`}
          className="inline-flex size-12 shrink-0 items-center justify-center rounded-lg border border-white/[.07] bg-[#222228] text-[#E5E2E3] transition-colors hover:text-white"
        >
          <Bookmark className="size-4.5" />
        </button>
        {hasApplied ? (
          <button
            type="button"
            disabled
            className="h-12 cursor-not-allowed rounded-lg border border-white/10 bg-[#1A1A1F] px-6 font-medium text-[#A0A0AB]"
          >
            Already Applied
          </button>
        ) : (
          <button
            type="button"
            onClick={handleApplyNow}
            className="h-12 rounded-lg bg-[#FAFAFA] px-6 font-medium text-[#0B0B0C] transition-colors hover:bg-white"
          >
            Apply Now
          </button>
        )}
      </div>
    </div>
  )
}

export default ApplyNow
