"use client"

import { useState } from "react"
import {
  ChevronDown,
  CreditCard,
  Eye,
  Landmark,
  Link as LinkIcon,
} from "lucide-react"

import { cn } from "cn"
import { Input } from "@/components/ui/input"

const PLAN = {
  name: "Hireloop Pro Plan",
  description: "Access to all features",
  usd: 20,
  // 1 USD = 127.6665 BDT, matching the design copy
  rate: 127.6665,
}

const COUNTRIES = ["Bangladesh", "United States", "India", "United Kingdom"]

// Small CSS stand-ins for the flag chips in the design
function FlagBD() {
  return (
    <span className="flex h-4 w-6 shrink-0 items-center justify-center overflow-hidden rounded-xs bg-[#006A4E]">
      <span className="size-2 rounded-full bg-[#F42A41]" />
    </span>
  )
}

function FlagUS() {
  return (
    <span className="relative h-4 w-6 shrink-0 overflow-hidden rounded-xs bg-[repeating-linear-gradient(#B22234_0_2px,#fff_2px_4px)]">
      <span className="absolute top-0 left-0 h-2 w-2.5 bg-[#3C3B6E]" />
    </span>
  )
}

// Mini brand badges shown inside the card-number field
function CardBrands() {
  return (
    <span className="flex items-center gap-1">
      <span className="flex h-4 items-center rounded-sm bg-[#1A1F71] px-1 text-[8px] font-bold tracking-tight text-white italic">
        VISA
      </span>
      <span className="flex h-4 items-center rounded-sm bg-white px-0.5">
        <span className="size-2 rounded-full bg-[#EB001B]" />
        <span className="-ml-1 size-2 rounded-full bg-[#F79E1B] opacity-90" />
      </span>
      <span className="flex h-4 items-center rounded-sm bg-[#2E77BC] px-1 text-[7px] font-bold text-white">
        AMEX
      </span>
      <span className="hidden h-4 items-center rounded-sm bg-[#F68121] px-1 text-[7px] font-bold text-white sm:flex">
        DISC
      </span>
    </span>
  )
}

const inputClasses =
  "h-12 rounded-lg border-[#2E2E33] bg-[#1B1B1C] text-[15px] text-white placeholder:text-[#888891] focus-visible:ring-[#0070E0]/40"

export function CheckoutClient() {
  const [currency, setCurrency] = useState<"BDT" | "USD">("BDT")
  const [country, setCountry] = useState(COUNTRIES[0])
  const [saveInfo, setSaveInfo] = useState(false)

  const price =
    currency === "BDT"
      ? `BDT ${(PLAN.usd * PLAN.rate).toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })}`
      : `$${PLAN.usd.toFixed(2)}`

  return (
    <div className="mx-auto grid w-full max-w-6xl gap-16 px-4 py-10 sm:px-6 lg:grid-cols-2 lg:gap-28">
      {/* Left column — currency + order summary */}
      <section>
        <h2 className="text-[13px] font-medium tracking-wide text-[#A1A1AA]">
          CHOOSE A CURRENCY:
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setCurrency("BDT")}
            className={cn(
              "flex h-15 items-center gap-3 rounded-lg border px-4 text-[15px] transition-colors",
              currency === "BDT"
                ? "border-white bg-white/30 text-white"
                : "border-[#2E2E33] text-[#A1A1AA] hover:border-[#52525B]"
            )}
          >
            <FlagBD />
            BDT{" "}
            {(PLAN.usd * PLAN.rate).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </button>
          <button
            type="button"
            onClick={() => setCurrency("USD")}
            className={cn(
              "flex h-15 items-center gap-3 rounded-lg border px-4 text-[15px] transition-colors",
              currency === "USD"
                ? "border-white bg-white/30 text-white"
                : "border-[#2E2E33] text-[#A1A1AA] hover:border-[#52525B]"
            )}
          >
            <FlagUS />$ {PLAN.usd.toFixed(2)}
          </button>
        </div>
        <p className="mt-3 text-[13px] text-[#808089]">
          1 USD = {PLAN.rate} BDT
        </p>

        <div className="mt-8 flex items-center justify-between border-y border-[#2E2E33] py-5">
          <div>
            <h3 className="text-xl font-semibold text-white">{PLAN.name}</h3>
            <p className="mt-1 text-sm text-[#A1A1AA]">{PLAN.description}</p>
          </div>
          <p className="text-xl font-medium text-white">{price}</p>
        </div>
      </section>

      {/* Right column — payment form */}
      <section>
        {/* Express checkout — wired up when Link is integrated */}
        <button
          type="button"
          className="flex h-12 w-full items-center justify-between rounded-lg bg-[#00D66F] px-4 text-[#18181B] transition-colors hover:bg-[#1ce47f]"
        >
          <span className="flex items-center gap-2">
            <LinkIcon className="size-5" />
            <span className="text-lg font-semibold lowercase">link</span>
          </span>
          <span className="flex items-center gap-2 text-sm font-medium">
            <span className="text-[#18181B]/40">|</span>
            <span className="rounded bg-[#2400FF] px-1.5 py-0.5 text-[10px] font-bold text-white">
              VISA
            </span>
            <span className="font-semibold">4242</span>
          </span>
        </button>

        <div className="my-6 flex items-center gap-3">
          <span className="h-px flex-1 bg-[#2E2E33]" />
          <span className="text-[13px] text-[#808089]">OR</span>
          <span className="h-px flex-1 bg-[#2E2E33]" />
        </div>

        {/* Submitting will later redirect to the Stripe Checkout session —
            the handler is intentionally left unwired until the backend
            adds POST /create-checkout-session */}
        <form onSubmit={(event) => event.preventDefault()}>
          <h3 className="text-[15px] font-semibold text-white">
            Contact information
          </h3>
          <label className="mt-3 block text-sm text-[#A1A1AA]" htmlFor="email">
            Email
          </label>
          <Input
            id="email"
            type="email"
            required
            placeholder="email@example.com"
            className={cn(inputClasses, "mt-1.5")}
          />

          <h3 className="mt-8 text-[15px] font-semibold text-white">
            Payment method
          </h3>
          <div className="mt-3 overflow-hidden rounded-lg border border-[#2E2E33]">
            <div className="flex items-center gap-2.5 border-b border-[#2E2E33] bg-[#27272A]/50 px-4 py-3.5">
              <CreditCard className="size-5 text-[#A1A1AA]" />
              <span className="text-[15px] text-white">Card</span>
            </div>

            <div className="space-y-5 p-4">
              <div>
                <p className="text-[13px] text-[#808089]">CARD INFORMATION</p>
                <div className="relative mt-1.5">
                  <Input
                    inputMode="numeric"
                    placeholder="1234 1234 1234 1234"
                    className={inputClasses}
                  />
                  <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2">
                    <CardBrands />
                  </span>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  <Input placeholder="MM / YY" className={inputClasses} />
                  <div className="relative">
                    <Input
                      placeholder="CVC"
                      className={cn(inputClasses, "pr-11")}
                    />
                    <Eye className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#71717A]" />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-[13px] text-[#808089]">CARDHOLDER NAME</p>
                <Input
                  placeholder="Full name on card"
                  className={cn(inputClasses, "mt-1.5")}
                />
              </div>

              <div>
                <p className="text-[13px] text-[#808089]">COUNTRY OR REGION</p>
                <div className="relative mt-1.5">
                  <Landmark className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-[#6B7280]" />
                  <select
                    value={country}
                    onChange={(event) => setCountry(event.target.value)}
                    className="h-12 w-full appearance-none rounded-lg border border-[#2E2E33] bg-[#1B1B1C] pr-10 pl-9 text-[15px] text-white outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-[#0070E0]/40"
                  >
                    {COUNTRIES.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-[#71717A]" />
                </div>
              </div>
            </div>
          </div>

          {/* Save info for Link — wired up later */}
          <label className="mt-4 flex cursor-pointer items-start gap-3 rounded-lg border border-[#2E2E33] p-4">
            <input
              type="checkbox"
              checked={saveInfo}
              onChange={(event) => setSaveInfo(event.target.checked)}
              className="mt-0.5 size-5 shrink-0 rounded accent-[#0070E0]"
            />
            <span>
              <span className="block text-sm text-white">
                Save my information for faster checkout
              </span>
              <span className="mt-0.5 block text-[13px] text-[#808089]">
                Pay securely on this site and everywhere Link is accepted.
              </span>
            </span>
          </label>

          {/* TODO: POST to the backend to create a Stripe Checkout session,
              then redirect to the returned session URL */}
          <button
            type="submit"
            className="mt-6 h-15 w-full rounded-lg bg-[#0070E0] text-lg font-medium text-white transition-colors hover:bg-[#0d7ef2]"
          >
            Pay
          </button>
        </form>
      </section>
    </div>
  )
}
