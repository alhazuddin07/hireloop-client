import { ArrowLeft, CreditCard, Lock } from "lucide-react"
import Link from "next/link"

const ORDER = {
  name: "Hireloop Pro Plan",
  description: "Access to all features",
  amount: "$20.00",
}

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ canceled?: string }>
}) {
  const { canceled } = await searchParams

  if (canceled) {
    console.log(
      "Order canceled -- continue to shop around and check out when you are ready"
    )
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <Link
          href="/"
          className="mb-10 inline-flex items-center gap-3 transition-colors hover:text-gray-300"
        >
          <ArrowLeft size={18} strokeWidth={2.5} />
          <span className="text-2xl font-bold tracking-tight">Hireloop</span>
        </Link>

        {/* Checkout Layout */}
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-10">
          {/* Order Summary */}
          <section>
            <div className="mb-7">
              <h2 className="text-sm font-bold tracking-[1.5px] text-gray-400">
                ORDER SUMMARY
              </h2>
              <div className="mt-3 h-px w-10 bg-blue-500" />
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111113] p-5 shadow-xl shadow-black/20">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-sm font-bold text-white">{ORDER.name}</h3>

                  <p className="mt-2 text-xs text-gray-400">
                    {ORDER.description}
                  </p>
                </div>

                <span className="text-sm font-bold text-white">
                  {ORDER.amount}
                </span>
              </div>

              <div className="my-6 border-t border-dashed border-white/15" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-gray-300">
                  Total
                </span>

                <span className="text-lg font-bold tracking-tight text-white">
                  {ORDER.amount}
                </span>
              </div>
            </div>
          </section>

          {/* Payment Method */}
          <section>
            <div className="mb-7">
              <h2 className="text-lg font-bold text-white">Payment method</h2>
              <p className="mt-1 text-xs text-gray-500">
                Choose your preferred payment method
              </p>
            </div>

            <div className="overflow-hidden rounded-xl border border-blue-500/30 bg-[#111113] shadow-xl shadow-black/20">
              {/* Card Header */}
              <div className="flex items-center justify-between border-b border-white/10 bg-[#1C1C21] px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                    <CreditCard size={18} />
                  </div>

                  <span className="text-sm font-semibold text-white">Card</span>
                </div>

                <div className="rounded-full border border-green-500/20 bg-green-500/10 px-2.5 py-1">
                  <span className="text-[10px] font-medium text-green-400">
                    Secure
                  </span>
                </div>
              </div>

              {/* Card Description */}
              <div className="px-4 py-5">
                <p className="text-xs leading-6 text-gray-400">
                  You&apos;ll be redirected to Stripe&apos;s secure checkout to
                  complete your payment. Card details are never stored on
                  Hireloop.
                </p>
              </div>
            </div>

            {/* Checkout Button */}
            <form action="/api/checkout_sessions" method="POST">
              <button
                type="submit"
                role="link"
                className="mt-5 flex h-12 w-full items-center justify-center rounded-xl bg-linear-to-r from-sky-400 to-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition-all duration-200 hover:shadow-blue-500/30 hover:brightness-110 active:scale-[0.98]"
              >
                Checkout {ORDER.amount}
              </button>
            </form>

            {/* Stripe Footer */}
            <div className="mt-4 flex items-center justify-center gap-2">
              <Lock size={12} className="text-gray-500" />

              <span className="text-[10px] font-medium text-gray-500">
                Powered by Stripe
              </span>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
