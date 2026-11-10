"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  ArrowRight,
  Banknote,
  Building2,
  Calendar,
  ChevronRight,
  Globe,
  MapPin,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/toast"
import { cn } from "cn"
import {
  FIELD_CLASSES,
  FormField,
  FormSection,
  IconInput,
  JobSelect,
  TEXTAREA_CLASSES,
} from "@/components/jobs/form"
import { createJob } from "@/lib/actions/jobs"
import {
  INITIAL_JOB,
  JOB_CATEGORIES,
  JOB_TYPES,
  SALARY_FREQUENCIES,
} from "@/lib/jobs"
import type { JobForm } from "@/types/job"

export default function NewJobPage() {
  const [form, setForm] = useState<JobForm>(INITIAL_JOB)
  const router = useRouter()

  const setField = (field: keyof JobForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // The whole job post is ready here as one plain object

    const jobData: JobForm = { ...form }

    const result = await createJob(jobData)

    if (result.insertedId) {
      toast.add({
        title: "success",
        description: "The job has been successfully created!",
      })
      router.push("/dashboard/recruiter/jobs")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex-1 p-6">
      <div className="mx-auto max-w-5xl">
        {/* Top bar */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav className="flex items-center gap-2 text-[13px]">
              <Link
                href="/dashboard/recruiter/jobs"
                className="text-[#A0A0AB] hover:text-white"
              >
                Manage Jobs
              </Link>
              <ChevronRight className="size-3 text-[#A0A0AB]" />
              <span className="text-[#C3C0FF]">Create New Listing</span>
            </nav>
            <h1 className="mt-1 text-[32px] leading-10.5 font-semibold text-white">
              Post a New Job
            </h1>
            <p className="mt-1 text-[15px] leading-5 text-[#A0A0AB]">
              Fill in the position specifications to attract qualified talent
              across our network.
            </p>
          </div>
        </div>

        <div className="mt-6 space-y-6">
          {/* Section 1: Basic Information */}
          <FormSection title="1. Basic Information">
            {/* Job title */}
            <FormField label="Job Title *" htmlFor="title">
              <Input
                id="title"
                value={form.title}
                onChange={(e) => setField("title", e.target.value)}
                placeholder="Frontend Developer"
                required
                className={FIELD_CLASSES}
              />
            </FormField>
            {/* Company + category */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField label="Company Name *" htmlFor="company">
                <IconInput
                  id="company"
                  icon={Building2}
                  value={form.company}
                  onChange={(e) => setField("company", e.target.value)}
                  placeholder="HirePulse Network"
                  required
                />
              </FormField>
              <FormField label="Job Category *">
                <JobSelect
                  options={JOB_CATEGORIES}
                  value={form.category}
                  onValueChange={(value) => setField("category", value)}
                  placeholder="Engineering & Tech"
                  required
                />
              </FormField>
            </div>
            {/* Job type segmented buttons */}
            <FormField label="Job Type *">
              <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                {JOB_TYPES.map((type) => (
                  <button
                    key={type}
                    type="button"
                    aria-pressed={form.jobType === type}
                    onClick={() => setField("jobType", type)}
                    className={cn(
                      "h-11 rounded-xl border border-transparent text-[15px] transition-colors",
                      form.jobType === type
                        ? "border-[#5C53FE] bg-[#232327] text-white"
                        : "bg-[#1E1E21] text-[#A0A0AB] hover:text-white"
                    )}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </FormField>
          </FormSection>

          {/* Section 2: Location, Compensation & Timeline */}
          <FormSection title="2. Location, Compensation &amp; Timeline">
            {/* Remote toggle */}
            <div className="flex items-center gap-3 rounded-xl border border-[#232327] bg-[#1E1E21] p-3.25">
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-[#232327]">
                <Globe className="size-5 text-white" />
              </span>
              <div>
                <Label
                  htmlFor="isRemote"
                  className="text-[15px] font-normal text-white"
                >
                  Remote Work Allowed (isRemote)
                </Label>
                <p className="text-[13px] leading-5 text-[#A0A0AB]">
                  Enable worldwide or distributed candidate applications
                </p>
              </div>
              <Switch
                id="isRemote"
                checked={form.isRemote}
                onCheckedChange={(checked) => setField("isRemote", checked)}
                className="ml-auto"
              />
            </div>
            {/* Location + deadline */}
            <div className="grid gap-4 sm:grid-cols-2">
              <FormField
                label="Job Location (location)"
                htmlFor="location"
                hint="Required"
              >
                <IconInput
                  id="location"
                  icon={MapPin}
                  value={form.location}
                  onChange={(e) => setField("location", e.target.value)}
                  placeholder="New York, USA"
                  required
                />
              </FormField>
              <FormField
                label="Application Deadline (deadline)"
                htmlFor="deadline"
              >
                <IconInput
                  id="deadline"
                  icon={Calendar}
                  type="date"
                  value={form.deadline}
                  onChange={(e) => setField("deadline", e.target.value)}
                  required
                />
              </FormField>
            </div>
            {/* Salary range */}
            <div className="grid gap-4 sm:grid-cols-3">
              <FormField label="Min Salary / Rate" htmlFor="minSalary">
                <IconInput
                  id="minSalary"
                  icon={Banknote}
                  iconSize="sm"
                  type="number"
                  min={0}
                  value={form.minSalary}
                  onChange={(e) => setField("minSalary", e.target.value)}
                  placeholder="25"
                  required
                />
              </FormField>
              <FormField label="Max Salary / Rate" htmlFor="maxSalary">
                <IconInput
                  id="maxSalary"
                  icon={Banknote}
                  iconSize="sm"
                  type="number"
                  min={0}
                  value={form.maxSalary}
                  onChange={(e) => setField("maxSalary", e.target.value)}
                  placeholder="40"
                  required
                />
              </FormField>
              <FormField label="Frequency">
                <JobSelect
                  options={SALARY_FREQUENCIES}
                  value={form.frequency}
                  onValueChange={(value) => setField("frequency", value)}
                />
              </FormField>
            </div>
          </FormSection>

          {/* Section 3: Responsibilities & Requirements */}
          <FormSection title="3. Responsibilities &amp; Requirements">
            <FormField
              label="Key Responsibilities *"
              htmlFor="responsibilities"
            >
              <Textarea
                id="responsibilities"
                value={form.responsibilities}
                onChange={(e) => setField("responsibilities", e.target.value)}
                placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                rows={3}
                required
                className={TEXTAREA_CLASSES}
              />
            </FormField>
            <FormField
              label="Qualifications &amp; Requirements *"
              htmlFor="qualifications"
            >
              <Textarea
                id="qualifications"
                value={form.qualifications}
                onChange={(e) => setField("qualifications", e.target.value)}
                placeholder={
                  "\u2022 3+ years of experience with React, TypeScript, and modern state architectures\n\u2022 Solid understanding of DOM performance and component-driven designs\n\u2022 Experience partnering closely with product teams and UI/UX designers"
                }
                rows={3}
                required
                className={TEXTAREA_CLASSES}
              />
            </FormField>
          </FormSection>
        </div>
        <div>
          <Button
            type="submit"
            className="h-11 gap-2 rounded-xl bg-[#5C53FE] px-6 text-[15px] text-white hover:bg-[#4A42E8]"
          >
            Publish Job
            <ArrowRight className="size-4" />
          </Button>
        </div>
      </div>
    </form>
  )
}
