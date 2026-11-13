import { ChevronLeft } from "lucide-react"

import { CheckoutClient } from "@/components/checkout/checkout-client"

export default function CheckoutPage() {
  return (
    <div className="flex min-h-svh flex-col bg-[#08080A]">
      {/* Stripe-style sandbox header */}
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-6">
          {/* Back — wired up later */}
          <button
            type="button"
            aria-label="Go back"
            className="text-[#A1A1AA] transition-colors hover:text-white"
          >
            <ChevronLeft className="size-5" />
          </button>
          <span className="flex size-8 items-center justify-center rounded bg-[#27272A] text-sm font-bold text-white">
            H
          </span>
        </div>
        <span className="rounded bg-[#1E2329] px-2 py-0.5 text-[13px] font-medium tracking-wide text-white">
          SANDBOX
        </span>
      </header>

      <main className="flex-1">
        <CheckoutClient />
      </main>

      <footer className="border-t border-[#2E2E33]">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-8 text-[13px] text-[#808089] sm:px-6">
          <span>Powered by Stripe</span>
          <span className="flex items-center gap-6">
            <a href="#" className="transition-colors hover:text-white">
              Terms
            </a>
            <a href="#" className="transition-colors hover:text-white">
              Privacy
            </a>
          </span>
        </div>
      </footer>
    </div>
  )
}
