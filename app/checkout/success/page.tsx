import { checkoutVerify } from "@/lib/actions/payments"
import { stripe } from "@/lib/stripe"
import { redirect } from "next/navigation"
import { ArrowRight, BadgeCheck, Check, ShieldCheck } from "lucide-react"
import type Stripe from "stripe"

import { Navbar } from "@/components/navbar"
import Link from "next/link"

// Stripe types amount_total as number | null after retrieve
const formatMoney = (amount: number | null, currency: string) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toLowerCase(),
  }).format((amount ?? 0) / 100)

// payment_intent comes back expanded: object when expanded, string otherwise
const getPaymentIntentId = (
  payment_intent: string | Stripe.PaymentIntent | null
) =>
  typeof payment_intent === "string"
    ? payment_intent
    : (payment_intent?.id ?? null)

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>
}) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error("Please provide a valid session_id (`cs_test_...`)")

  const {
    status,
    payment_status,
    customer_email,
    metadata,
    amount_total,
    currency,
    payment_intent,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  })

  if (status === "open") {
    return redirect("/")
  }

  if (status === "complete" && payment_status === "paid") {
    console.log({
      status,
      payment_status,
      customer_email,
      metadata,
      payment_intent,
    })

    const result = await checkoutVerify(session_id)
    console.log("here", result)

    const transactionId = getPaymentIntentId(payment_intent)

    return (
      <div className="relative min-h-svh overflow-hidden bg-[#08080A]">
        {/* Decorative blue glow behind the card */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 size-150 -translate-x-1/2 translate-y-[-55%] rounded-full bg-[#1E3A8A]/10 blur-3xl"
        />

        <div className="relative">
          <Navbar />

          <main className="flex justify-center px-4 py-14">
            {/* Success card */}
            <section className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/[.07] bg-[#141418] p-8">
              {/* Green glow behind the checkmark */}
              <div
                aria-hidden
                className="pointer-events-none absolute -top-4 left-1/2 h-10 w-102 -translate-x-1/2 rounded-full bg-[#10B981]/20 blur-2xl"
              />

              {/* Checkmark */}
              <div className="relative mx-auto flex size-16 items-center justify-center rounded-full bg-[#10B981]/20">
                <Check className="size-8 text-[#10B981]" strokeWidth={3} />
              </div>

              {/* Status badge */}
              <div className="relative mt-5 flex justify-center">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-[#3B82F6]/20 bg-[#3B82F6]/10 px-3 py-1 text-[11px] font-medium tracking-wider text-[#60A5FA]">
                  <BadgeCheck className="size-3" />
                  UPGRADE SUCCESSFUL
                </span>
              </div>

              <h1 className="relative mt-4 text-center text-2xl font-semibold text-[#EDEDEF]">
                Welcome to Hireloop Pro
              </h1>

              <p className="relative mt-4 text-center text-[15px] leading-6 text-[#9CA3AF]">
                Your payment of {formatMoney(amount_total, currency ?? "usd")}{" "}
                was received perfectly.
              </p>
              <p className="relative mt-3 text-center text-[15px] leading-6 text-[#9CA3AF]">
                All advanced premium recruiting modules are unlocked on your
                account. You may need to re-authenticate to see the effect.
              </p>

              {/* Payment verification box */}
              <div className="relative mt-6 rounded-xl border border-[#1F2937] bg-black/30 p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="flex items-center gap-2 text-sm text-[#A0A0AB]">
                    <ShieldCheck className="size-4 shrink-0 text-[#6B7280]" />
                    Session ID Verified
                  </span>
                  <span
                    title={session_id}
                    className="rounded bg-[#1F2937] px-2 py-1 font-mono text-xs text-[#9CA3AF]"
                  >
                    <span className="block max-w-45 truncate">
                      {session_id}
                    </span>
                  </span>
                </div>

                {/* Transaction id lives under payment_intent.id */}
                <div className="mt-3 flex items-center justify-between gap-3 border-t border-[#1F2937] pt-3">
                  <span className="flex items-center gap-2 text-sm text-[#A0A0AB]">
                    <BadgeCheck className="size-4 shrink-0 text-[#6B7280]" />
                    Transaction ID
                  </span>
                  <span
                    title={transactionId ?? undefined}
                    className="rounded bg-[#1F2937] px-2 py-1 font-mono text-xs text-[#9CA3AF]"
                  >
                    <span className="block max-w-45 truncate">
                      {transactionId ?? "Unavailable"}
                    </span>
                  </span>
                </div>

                {/* Receipt details */}
                <div className="mt-3 grid grid-cols-2 gap-3 border-t border-[#1F2937] pt-3 text-sm">
                  <div>
                    <p className="text-[#6B7280]">Amount Paid</p>
                    <p className="mt-1 text-[#EDEDEF]">
                      {formatMoney(amount_total, currency ?? "usd")}
                    </p>
                  </div>
                  <div className="min-w-0">
                    <p className="text-[#6B7280]">Billed To</p>
                    <p
                      className="mt-1 truncate text-[#EDEDEF]"
                      title={customer_email ?? undefined}
                    >
                      {customer_email ?? "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Continue to the my applications */}
              <Link
                href={"/dashboard/seeker/applications"}
                className="relative mt-6 flex h-13 w-full items-center justify-center gap-2 rounded-xl bg-white text-[15px] font-medium text-black transition-colors hover:bg-[#E5E5E5]"
              >
                Go to My Applications
                <ArrowRight className="size-4" />
              </Link>
            </section>
          </main>
        </div>
      </div>
    )
  }

  // Completed but not paid (or any other state) — nothing to show
  return redirect("/")
}
