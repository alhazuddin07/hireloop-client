"use client"

import { useState } from "react"
import Link from "next/link"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "cn"

const JOB_TYPES = ["Full-time", "Part-time", "Contract", "Internship"]

const JOB_CATEGORIES = [
  "Engineering & Tech",
  "Design",
  "Product",
  "Marketing",
  "Human Resources",
  "Finance",
  "Other",
]

const SALARY_FREQUENCIES = ["per hour", "per week", "per month", "per year"]

type JobForm = {
  title: string
  company: string
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
}

const INITIAL_JOB: JobForm = {
  title: "",
  company: "",
  category: "",
  jobType: "Full-time",
  isRemote: false,
  location: "",
  deadline: "",
  minSalary: "",
  maxSalary: "",
  frequency: "per hour",
  responsibilities: "",
  qualifications: "",
}

const SECTION_CLASSES = "rounded-2xl bg-[#151516] p-6"
const FIELD_CLASSES =
  "h-11 w-full rounded-xl border-none bg-[#1E1E21] text-[15px] text-white placeholder:text-[#A0A0AB]"

export default function NewJobPage() {
  const [form, setForm] = useState<JobForm>(INITIAL_JOB)

  const setField = (field: keyof JobForm, value: string | boolean) => {
    setForm((current) => ({ ...current, [field]: value }))
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    // The whole job post is ready here as one plain object
    console.log(form)
    // TODO: send to API, e.g. fetch("/api/jobs", { method: "POST", body: JSON.stringify(form) })
  }

  return (
    <form onSubmit={handleSubmit} className="min-h-svh bg-[#131314] p-6">
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
            <h1 className="mt-1 text-[32px] leading-[42px] font-semibold text-white">
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
          <div className={SECTION_CLASSES}>
            <h2 className="flex items-center gap-4 text-lg font-medium text-white">
              <span className="size-2 shrink-0 rounded-xs bg-[#5C53FE]" />
              <span>1. Basic Information</span>
            </h2>
            <div className="mt-5 space-y-4">
              {/* Job title */}
              <div className="space-y-1">
                <Label htmlFor="title" className="text-sm text-[#F4F4F5]">
                  Job Title *
                </Label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => setField("title", e.target.value)}
                  placeholder="Frontend Developer"
                  required
                  className={FIELD_CLASSES}
                />
              </div>
              {/* Company + category */}
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label htmlFor="company" className="text-sm text-[#F4F4F5]">
                    Company Name *
                  </Label>
                  <div className="relative">
                    <Building2 className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#A0A0AB]" />
                    <Input
                      id="company"
                      value={form.company}
                      onChange={(e) => setField("company", e.target.value)}
                      placeholder="HirePulse Network"
                      required
                      className={cn("pl-11", FIELD_CLASSES)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-[#F4F4F5]">
                    Job Category *
                  </Label>
                  <Select
                    value={form.category}
                    onValueChange={(value) =>
                      setField("category", String(value))
                    }
                    required
                  >
                    <SelectTrigger
                      className={cn(FIELD_CLASSES, "hover:bg-[#1E1E21]")}
                    >
                      <SelectValue placeholder="Engineering & Tech" />
                    </SelectTrigger>
                    <SelectContent className="border-0 bg-[#1A1A1B] text-white ring-white/10">
                      {JOB_CATEGORIES.map((category) => (
                        <SelectItem
                          key={category}
                          value={category}
                          className="data-[highlighted]:bg-[#232327]"
                        >
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              {/* Job type segmented buttons */}
              <div className="space-y-1">
                <Label className="text-sm text-[#F4F4F5]">Job Type *</Label>
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
              </div>
            </div>
          </div>

          {/* Section 2: Location, Compensation & Timeline */}
          <div className={SECTION_CLASSES}>
            <h2 className="flex items-center gap-4 text-lg font-medium text-white">
              <span className="size-2 shrink-0 rounded-[2px] bg-[#5C53FE]" />
              <span>2. Location, Compensation &amp; Timeline</span>
            </h2>
            <div className="mt-5 space-y-4">
              {/* Remote toggle */}
              <div className="flex items-center gap-3 rounded-xl border border-[#232327] bg-[#1E1E21] p-[13px]">
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
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <Label
                      htmlFor="location"
                      className="text-sm text-[#F4F4F5]"
                    >
                      Job Location (location)
                    </Label>
                    <span className="text-[13px] text-[#5A5A60]">Required</span>
                  </div>
                  <div className="relative">
                    <MapPin className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#A0A0AB]" />
                    <Input
                      id="location"
                      value={form.location}
                      onChange={(e) => setField("location", e.target.value)}
                      placeholder="New York, USA"
                      required
                      className={cn("pl-11", FIELD_CLASSES)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="deadline" className="text-sm text-[#F4F4F5]">
                    Application Deadline (deadline)
                  </Label>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute top-1/2 left-3.5 size-5 -translate-y-1/2 text-[#A0A0AB]" />
                    <Input
                      id="deadline"
                      type="date"
                      value={form.deadline}
                      onChange={(e) => setField("deadline", e.target.value)}
                      required
                      className={cn("pl-11", FIELD_CLASSES)}
                    />
                  </div>
                </div>
              </div>
              {/* Salary range */}
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-1">
                  <Label htmlFor="minSalary" className="text-sm text-[#F4F4F5]">
                    Min Salary / Rate
                  </Label>
                  <div className="relative">
                    <Banknote className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-[#A0A0AB]" />
                    <Input
                      id="minSalary"
                      type="number"
                      min={0}
                      value={form.minSalary}
                      onChange={(e) => setField("minSalary", e.target.value)}
                      placeholder="25"
                      required
                      className={cn("pl-10", FIELD_CLASSES)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label htmlFor="maxSalary" className="text-sm text-[#F4F4F5]">
                    Max Salary / Rate
                  </Label>
                  <div className="relative">
                    <Banknote className="pointer-events-none absolute top-1/2 left-3.5 size-4.5 -translate-y-1/2 text-[#A0A0AB]" />
                    <Input
                      id="maxSalary"
                      type="number"
                      min={0}
                      value={form.maxSalary}
                      onChange={(e) => setField("maxSalary", e.target.value)}
                      placeholder="40"
                      required
                      className={cn("pl-10", FIELD_CLASSES)}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <Label className="text-sm text-[#F4F4F5]">Frequency</Label>
                  <Select
                    value={form.frequency}
                    onValueChange={(value) =>
                      setField("frequency", String(value))
                    }
                  >
                    <SelectTrigger
                      className={cn(FIELD_CLASSES, "hover:bg-[#1E1E21]")}
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="border-0 bg-[#1A1A1B] text-white ring-white/10">
                      {SALARY_FREQUENCIES.map((frequency) => (
                        <SelectItem
                          key={frequency}
                          value={frequency}
                          className="data-highlighted:bg-[#232327]"
                        >
                          {frequency}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Responsibilities & Requirements */}
          <div className={SECTION_CLASSES}>
            <h2 className="flex items-center gap-4 text-lg font-medium text-white">
              <span className="size-2 shrink-0 rounded-[2px] bg-[#5C53FE]" />
              <span>3. Responsibilities &amp; Requirements</span>
            </h2>
            <div className="mt-5 space-y-4">
              <div className="space-y-1">
                <Label
                  htmlFor="responsibilities"
                  className="text-sm text-[#F4F4F5]"
                >
                  Key Responsibilities *
                </Label>
                <Textarea
                  id="responsibilities"
                  value={form.responsibilities}
                  onChange={(e) => setField("responsibilities", e.target.value)}
                  placeholder="Showcase your commitment to delivering exceptional user interfaces and digital experiences. You will collaborate directly with systems designers and backend engineers to craft responsive, micro-interaction rich products."
                  rows={3}
                  required
                  className="min-h-24 rounded-xl border-none bg-[#1E1E21] px-4 py-3 text-[15px] leading-[22px] text-[#F4F4F5] placeholder:text-[#A0A0AB]"
                />
              </div>
              <div className="space-y-1">
                <Label
                  htmlFor="qualifications"
                  className="text-sm text-[#F4F4F5]"
                >
                  Qualifications &amp; Requirements *
                </Label>
                <Textarea
                  id="qualifications"
                  value={form.qualifications}
                  onChange={(e) => setField("qualifications", e.target.value)}
                  placeholder={
                    "\u2022 3+ years of experience with React, TypeScript, and modern state architectures\n\u2022 Solid understanding of DOM performance and component-driven designs\n\u2022 Experience partnering closely with product teams and UI/UX designers"
                  }
                  rows={3}
                  required
                  className="min-h-24 rounded-xl border-none bg-[#1E1E21] px-4 py-3 text-[15px] leading-5.5 text-[#F4F4F5] placeholder:text-[#A0A0AB]"
                />
              </div>
            </div>
          </div>
        </div>
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
    </form>
  )
}
