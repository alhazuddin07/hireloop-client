export type JobStatus = "active" | "expired"

// Shape collected by the New Job form (dashboard/recruiter/jobs/new)
export type JobForm = {
  title: string
  company: string
  companyId?: string
  recruiterId: string
  category: string
  jobType: string
  isRemote: boolean
  location: string
  deadline: string
  minSalary: string
  maxSalary: string
  frequency: string
  responsibilities: string
  qualifications: string
  status: JobStatus
  applicants: number
}

// JobForm as it arrives from the database (jobs table and detail surfaces)
export type JobPost = JobForm & {
  _id: string
  id: string
  posted: string
}
