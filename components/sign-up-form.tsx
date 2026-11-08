"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"
import { cn } from "cn"

import { AuthShell } from "@/components/auth-shell"
import { Field, PasswordField } from "@/components/auth-fields"
import { authClient } from "@/lib/auth-client"

const roles = [
  { value: "seeker", label: "Job seeker" },
  { value: "recruiter", label: "Recruiter" },
  { value: "admin", label: "Admin" },
] as const

type Role = (typeof roles)[number]["value"]

export function SignUpForm() {
  const router = useRouter()
  const [role, setRole] = useState<Role>("seeker")
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")

    if (password !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    setPending(true)

    try {
      const { error } = await authClient.signUp.email({
        name,
        email,
        password,
        role,
        callbackURL: "/",
      })

      if (error) {
        setError(
          error.message ?? "Unable to create your account. Please try again."
        )
        return
      }

      router.push("/")
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <AuthShell mode="sign-up">
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
        <Field
          id="name"
          name="name"
          label="Full name"
          autoComplete="name"
          placeholder="Enter your name"
          required
        />

        <div className="space-y-1.5">
          <span className="block text-sm font-medium text-[#D6D6DC]">
            I am joining as
          </span>
          <div
            role="radiogroup"
            aria-label="Account type"
            className="grid grid-cols-3 gap-1 rounded-xl border border-white/6 bg-[#121318] p-1"
          >
            {roles.map((option) => {
              const active = role === option.value

              return (
                <button
                  key={option.value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setRole(option.value)}
                  className={cn(
                    "rounded-lg py-2 text-center text-[13px] font-medium transition-colors sm:text-sm",
                    active
                      ? "bg-[#1E1F27] text-[#F4F4F6] shadow-sm"
                      : "text-[#8C8C95] hover:text-[#EDEDEF]"
                  )}
                >
                  {option.label}
                </button>
              )
            })}
          </div>
        </div>

        <Field
          id="email"
          name="email"
          type="email"
          label="Email address"
          autoComplete="email"
          placeholder="you@example.com"
          required
        />

        <PasswordField
          id="password"
          name="password"
          label="Password"
          autoComplete="new-password"
          placeholder="Enter your password"
          minLength={8}
          hint="Use at least 8 characters."
          required
        />

        <PasswordField
          id="confirm-password"
          name="confirmPassword"
          label="Confirm password"
          autoComplete="new-password"
          placeholder="Confirm your password"
          minLength={8}
          required
        />

        <label className="flex items-start gap-2.5 text-xs leading-relaxed text-[#8C8C95]">
          <input
            type="checkbox"
            name="terms"
            required
            className="mt-0.5 size-4 shrink-0 rounded border-white/20 accent-[#5C53FE]"
          />
          <span>I agree to the Terms of Service and Privacy Policy.</span>
        </label>

        {error && (
          <p
            role="alert"
            className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400"
          >
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="mt-2 flex h-11 w-full items-center justify-center rounded-lg bg-[#5C53FE] text-sm font-semibold text-white shadow-[0_0_24px_rgba(92,83,254,0.28)] transition-colors hover:bg-[#4A42E8] focus-visible:ring-2 focus-visible:ring-[#5C53FE]/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0B0C10] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Create account"}
        </button>
      </form>
    </AuthShell>
  )
}
