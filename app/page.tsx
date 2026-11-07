import { Hero } from "@/components/hero"
import { Navbar } from "@/components/navbar"

export default function Page() {
  return (
    <div className="min-h-svh overflow-x-clip bg-[#010103]">
      <Navbar />
      <Hero />
    </div>
  )
}
