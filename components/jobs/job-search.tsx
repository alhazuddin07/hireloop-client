"use client"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

// Full-width search bar above the browse jobs list.
// Stateless on purpose: the submit handler is intentionally empty (wired up
// later in app/browse-jobs).
export function JobSearchBar() {
  const router = useRouter()
  const [search, setSearch] = useState("")

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())
    const search = data.searchField

    const params = new URLSearchParams()
    params.set("search", search as string)

    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="rounded-2xl border border-white/[.07] bg-[#141418] p-4 sm:p-6"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-4.5 -translate-y-1/2 text-[#8E9192]" />
          <input
            name="searchField"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by job title, keywords..."
            className="h-14 w-full rounded-lg border border-white/[.07] bg-[#1A1A1F] pr-4 pl-11 text-[15px] text-[#EDEDEF] outline-none placeholder:text-[#A0A0AB]"
          />
        </div>
        <button
          type="submit"
          // Intentionally doing nothing — convert this to a client component
          // and add the handler when the search gets wired up
          className="h-14 shrink-0 rounded-lg bg-white px-7 text-base font-semibold text-[#2F3131] transition-colors hover:bg-[#EDEDEF]"
        >
          Search Jobs
        </button>
      </div>
    </form>
  )
}
