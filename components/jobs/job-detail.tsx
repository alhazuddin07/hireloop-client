import type { LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

// One square stat tile of the "bento" info grid, e.g. "SALARY RANGE / €300 – €500"
export function InfoTile({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon
  label: string
  value: ReactNode
}) {
  return (
    <div className="rounded-xl border border-white/[.07] bg-[#141418] p-4">
      <Icon className="size-5 text-[#C4C7C8]" />
      <p className="mt-3 text-sm text-[#A0A0AB]">{label}</p>
      <p className="mt-1.5 text-lg font-medium text-[#EDEDEF]">{value}</p>
    </div>
  )
}

// A titled content block separated by a hairline divider, e.g. "Job Description"
export function DetailSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-t border-white/[.07] px-6 py-7 sm:px-8">
      <h2 className="text-lg font-semibold text-[#EDEDEF]">{title}</h2>
      <div className="mt-4">{children}</div>
    </section>
  )
}

// White-dot bullet list used for responsibilities/requirements
export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3.5">
      {items.map((item) => (
        <li key={item} className="flex items-start gap-3.5">
          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-white" />
          <p className="leading-6 text-[#A0A0AB]">{item}</p>
        </li>
      ))}
    </ul>
  )
}
