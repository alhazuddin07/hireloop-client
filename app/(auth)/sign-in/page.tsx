import type { Metadata } from "next"

import { SignInForm } from "@/components/sign-in-form"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "Sign in | HireLoop",
  description: "Sign in to your HireLoop account.",
}

export default function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignInForm />
    </Suspense>
  )
}
