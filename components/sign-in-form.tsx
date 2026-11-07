"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { AuthShell } from "@/components/auth-shell"
import { Field, PasswordField } from "@/components/auth-fields"
import { authClient } from "@/lib/auth-client"

export function SignInForm() {
  const router = useRouter()
  const [error, setError] = useState("")
  const [pending, setPending] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")

    const formData = new FormData(event.currentTarget)
    const email = String(formData.get("email") ?? "")
    const password = String(formData.get("password") ?? "")

    setPending(true)

    try {
      const { error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/",
      })

      if (error) {
        setError(error.message ?? "Unable to sign in. Please try again.")
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
    <AuthShell mode="sign-in">
      <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
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
          autoComplete="current-password"
          placeholder="Enter your password"
          required
        />

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
          {pending ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </AuthShell>
  )
}
