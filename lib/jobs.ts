import type { JobForm, JobPost } from "@/types/job"

export const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

export const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Human Resources",
  "Finance",
  "Other",
]

export const SALARY_FREQUENCIES = [
  "per hour",
  "per week",
  "per month",
  "per year",
]

export const INITIAL_JOB: JobForm = {
  title: "",
  company: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  status: "active",
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
  applicants: 0,
}

const FREQUENCY_SHORT: Record<string, string> = {
  "per hour": "hr",
  "per week": "wk",
  "per month": "mo",
  "per year": "yr",
}

// "€25 – €40" — no pay period
export function formatSalaryRange(
  job: Pick<JobForm, "minSalary" | "maxSalary">
) {
  return `€${job.minSalary} – €${job.maxSalary}`
}

// Same range plus the shortened pay period, e.g. "€25 – €40 / hr"
export function formatSalary(
  job: Pick<JobForm, "minSalary" | "maxSalary" | "frequency">
) {
  const unit = FREQUENCY_SHORT[job.frequency] ?? job.frequency
  return `${formatSalaryRange(job)} / ${unit}`
}

export function formatDeadline(job: Pick<JobPost, "deadline">) {
  return new Date(job.deadline).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}
