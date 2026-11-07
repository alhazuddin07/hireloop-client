import Image from "next/image"
import {
  ChartNoAxesColumn,
  Flame,
  House,
  MapPin,
  Search,
  Sparkles,
  UserRoundCheck,
} from "lucide-react"

import globe from "@/app/images/globe.png"

const trending = [
  "Trending Position",
  "Product Designer",
  "AI Engineering",
  "DevOps Engineer",
]

const stats = [
  { icon: House, value: "50K", label: "Active Jobs" },
  { icon: ChartNoAxesColumn, value: "12K", label: "Companies" },
  { icon: UserRoundCheck, value: "2M", label: "Job Seekers" },
  { icon: Sparkles, value: "97%", label: "Satisfaction Rate" },
]

export function Hero() {
  return (
    <section className="relative isolate overflow-x-clip">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col items-center px-6 pt-16 text-center sm:pt-20">
        {/* Eyebrow */}
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-r from-transparent to-white/25 sm:w-10"
          />
          <span className="flex items-center gap-2 rounded-full border border-white/[0.06] bg-[#121317]/80 py-1.5 pr-3 pl-1.5">
            <span className="flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-[#FF8A3D] to-[#FF4D00] shadow-[0_0_14px_rgba(255,96,0,0.55)]">
              <Flame className="size-3 fill-white text-white" strokeWidth={2} />
            </span>
            <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-[#EDEDEF] uppercase sm:text-[11px]">
              50,000+ New Jobs This Month
            </span>
          </span>
          <span
            aria-hidden
            className="h-px w-8 bg-gradient-to-l from-transparent to-white/25 sm:w-10"
          />
        </div>

        {/* Headline */}
        <h1 className="mt-6 text-4xl leading-[1.05] font-semibold tracking-[-0.03em] text-[#F4F4F6] sm:text-[44px] lg:text-5xl">
          Find Your Dream Job Today
        </h1>

        <p className="mt-4 max-w-[760px] text-[15px] leading-relaxed text-[#9A9AA3] sm:text-base lg:text-xl">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <form
          role="search"
          className="mt-8 flex w-full max-w-[688px] flex-col gap-2 rounded-2xl border border-white/[0.08] bg-[#121318]/90 p-1.5 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md sm:flex-row sm:items-stretch sm:gap-0 sm:rounded-xl"
        >
          <label className="flex h-11 flex-1 items-center gap-2.5 rounded-md px-3 text-left">
            <Search
              className="size-4 shrink-0 text-[#85858E]"
              strokeWidth={2}
            />
            <input
              type="text"
              name="query"
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="w-full bg-transparent text-[15px] text-[#EDEDEF] outline-none placeholder:text-[#85858E]"
            />
          </label>

          <span
            aria-hidden
            className="hidden w-px self-stretch bg-white/[0.08] sm:my-2 sm:block"
          />

          <label className="flex h-11 flex-1 items-center gap-2.5 rounded-md px-3 text-left">
            <MapPin
              className="size-4 shrink-0 text-[#85858E]"
              strokeWidth={2}
            />
            <input
              type="text"
              name="location"
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="w-full bg-transparent text-[15px] text-[#EDEDEF] outline-none placeholder:text-[#85858E]"
            />
          </label>

          <button
            type="submit"
            aria-label="Search jobs"
            className="flex h-11 shrink-0 items-center justify-center rounded-lg bg-[#5C53FE] px-4 text-white shadow-[0_0_22px_rgba(92,83,254,0.35)] transition-colors hover:bg-[#4A42E8] sm:aspect-square sm:px-0"
          >
            <Search className="size-[18px]" strokeWidth={2.25} />
          </button>
        </form>

        {/* Trending searches */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
          {trending.map((item, index) => (
            <span
              key={item}
              className={
                index === 0
                  ? "rounded-lg bg-[#26272F] px-3 py-1.5 text-[11px] font-medium text-[#E6E6EA] sm:text-[13px]"
                  : "rounded-lg border border-white/[0.05] bg-[#15161B]/80 px-3 py-1.5 text-[11px] font-medium text-[#B0B0B9] sm:text-[13px]"
              }
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      {/* Globe + stats share one relative layer so the image sits behind both. */}
      <div className="relative mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
        >
          <Image
            src={globe}
            alt=""
            priority
            className="absolute top-0 left-1/2 w-[900px] max-w-none -translate-x-1/2 -translate-y-[41%] brightness-[0.5] saturate-75 select-none sm:w-[1600px] lg:w-[2300px]"
          />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#010103] via-[#010103]/80 to-transparent" />
        </div>

        <div className="flex h-[400px] flex-col items-center pt-[220px] sm:h-[460px] sm:pt-[270px] lg:h-[500px] lg:pt-[310px]">
          <p className="text-center text-xl leading-snug font-medium text-[#CFCFE0] sm:text-2xl lg:text-[36px]">
            Assisting over <span className="text-white">15,000</span> job
            seekers
            <br className="hidden sm:block" /> find their dream positions.
          </p>
        </div>

        <div className="-mt-10 grid grid-cols-2 gap-3 pb-10 sm:-mt-14 sm:gap-4 lg:-mt-20 lg:grid-cols-4 lg:pb-12">
          {stats.map(({ icon: Icon, value, label }) => (
            <div
              key={label}
              className="flex min-h-[160px] flex-col rounded-2xl border border-white/[0.07] bg-[#111217]/95 p-5 shadow-[0_24px_50px_-30px_rgba(0,0,0,0.95)] backdrop-blur-md sm:min-h-[180px] lg:min-h-[220px] lg:p-6"
            >
              <Icon
                className="size-5 text-[#D6D6DC] lg:size-6"
                strokeWidth={1.5}
              />
              <div className="mt-auto pt-10">
                <div className="text-4xl font-semibold tracking-[-0.03em] text-[#F4F4F6] lg:text-5xl">
                  {value}
                </div>
                <div className="mt-1.5 text-[13px] text-[#8C8C95] lg:text-[15px]">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
