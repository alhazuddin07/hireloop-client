import Image from "next/image"
import Link from "next/link"
import type { ReactNode } from "react"
import { cn } from "cn"

import logo from "@/app/images/logo.png"

export type AuthMode = "sign-in" | "sign-up"

const copy: Record<
  AuthMode,
  { title: string; description: string; prompt: string; linkLabel: string }
> = {
  "sign-in": {
    title: "Welcome back",
    description: "Sign in to continue to your HireLoop account.",
    prompt: "New to HireLoop?",
    linkLabel: "Create an account",
  },
  "sign-up": {
    title: "Create your account",
    description: "Start discovering your next opportunity in minutes.",
    prompt: "Already have an account?",
    linkLabel: "Sign in",
  },
}

export function AuthShell({
  mode,
  children,
}: {
  mode: AuthMode
  children: ReactNode
}) {
  const isSignIn = mode === "sign-in"
  const { title, description, prompt, linkLabel } = copy[mode]

  return (
    <section className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden bg-[#010103] px-5 py-12 [color-scheme:dark]">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-[-18%] left-1/2 size-[560px] -translate-x-1/2 rounded-full bg-[#5C53FE]/15 blur-[120px]" />
        <div className="absolute bottom-[-30%] left-1/2 size-[720px] -translate-x-1/2 rounded-full bg-[#5C53FE]/10 blur-[150px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#010103_80%)]" />
      </div>

      <Link href="/" className="mb-8 shrink-0" aria-label="HireLoop home">
        <Image src={logo} alt="HireLoop" width={154} height={44} priority />
      </Link>

      <div className="w-full max-w-[440px] rounded-2xl border border-white/[0.08] bg-[#0B0C10]/90 p-6 shadow-[0_30px_80px_-40px_rgba(0,0,0,1)] backdrop-blur-xl sm:p-8">
        <div className="grid grid-cols-2 gap-1 rounded-xl border border-white/[0.06] bg-[#121318] p-1">
          <Link
            href="/sign-in"
            aria-current={isSignIn ? "page" : undefined}
            className={cn(
              "rounded-lg py-2 text-center text-sm font-medium transition-colors",
              isSignIn
                ? "bg-[#1E1F27] text-[#F4F4F6] shadow-sm"
                : "text-[#8C8C95] hover:text-[#EDEDEF]"
            )}
          >
            Sign in
          </Link>
          <Link
            href="/sign-up"
            aria-current={!isSignIn ? "page" : undefined}
            className={cn(
              "rounded-lg py-2 text-center text-sm font-medium transition-colors",
              !isSignIn
                ? "bg-[#1E1F27] text-[#F4F4F6] shadow-sm"
                : "text-[#8C8C95] hover:text-[#EDEDEF]"
            )}
          >
            Sign up
          </Link>
        </div>

        <div className="mt-7">
          <h1 className="text-2xl font-semibold tracking-[-0.02em] text-[#F4F4F6]">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-[#8C8C95]">{description}</p>
        </div>

        {children}

        <p className="mt-6 text-center text-sm text-[#8C8C95]">
          {prompt}{" "}
          <Link
            href={isSignIn ? "/sign-up" : "/sign-in"}
            className="font-medium text-[#B9B4FF] transition-colors hover:text-white"
          >
            {linkLabel}
          </Link>
        </p>
      </div>

      <Link
        href="/"
        className="mt-8 text-xs text-[#6F6F79] transition-colors hover:text-[#B0B0B9]"
      >
        Back to HireLoop
      </Link>
    </section>
  )
}
