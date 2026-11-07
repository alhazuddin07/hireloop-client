import type { Metadata } from "next"

import { SignUpForm } from "@/components/sign-up-form"

export const metadata: Metadata = {
  title: "Sign up | HireLoop",
  description: "Create a HireLoop account and start finding your next role.",
}

export default function SignUpPage() {
  return <SignUpForm />
}
