"use client"
import { Check } from "lucide-react"
import { useRouter } from "next/navigation"

export type FilterOption = {
  label: string
  count: number
}

export type FilterGroupData = {
  title: string
  /**
   * "single" = only one option selectable at a time (radio inputs),
   * "multiple" = each option independent (checkbox inputs)
   */
  mode?: "single" | "multiple"
  options: FilterOption[]
}

// Counts use compact notation like in the design (1200 -> "1.2k")
export function formatCount(count: number) {
  return count.toLocaleString("en", { notation: "compact" })
}

function FilterOptionRow({
  label,
  count,
  name,
  type,
}: FilterOption & { name: string; type: "radio" | "checkbox" }) {
  const router = useRouter()

  const handleCheckboxChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const params = new URLSearchParams(window.location.search)
    params.set(name, e.target.value)
    router.push(`/browse-jobs?${params.toString()}`)
  }

  return (
    <label className="group flex cursor-pointer items-center gap-3">
      <input
        type={type}
        name={name}
        value={label}
        onChange={handleCheckboxChange}
        className="sr-only"
      />
      <span className="flex size-5 items-center justify-center rounded border border-white/[.07] bg-[#1A1A1F] transition-colors group-has-[input:checked]:bg-white">
        <Check className="hidden size-3 text-[#141418] group-has-[input:checked]:block" />
      </span>
      <span className="text-sm text-[#A0A0AB]">{label}</span>
      <span className="ml-auto text-sm text-[#6E6E78]">
        {formatCount(count)}
      </span>
    </label>
  )
}

// Heading + list of option rows, reused for every filter group
export function FilterGroup({
  title,
  mode = "multiple",
  options,
}: FilterGroupData) {
  const type = mode === "single" ? "radio" : "checkbox"

  return (
    <div>
      <h3 className="text-[15px] font-medium text-[#EDEDEF]">{title}</h3>
      <div className="mt-3 space-y-3">
        {options.map((option) => (
          <FilterOptionRow
            key={option.label}
            label={option.label}
            count={option.count}
            name={title}
            type={type}
          />
        ))}
      </div>
    </div>
  )
}

// The whole "Filters" card shown next to the job list
export function FilterSidebar({ groups }: { groups: FilterGroupData[] }) {
  return (
    <aside className="h-fit rounded-2xl border border-white/[.07] bg-[#141418] p-6">
      <h2 className="text-xl font-semibold text-[#EDEDEF]">Filters</h2>
      <div className="mt-5 space-y-6">
        {groups.map((group) => (
          <FilterGroup
            key={group.title}
            title={group.title}
            mode={group.mode}
            options={group.options}
          />
        ))}
      </div>
    </aside>
  )
}
