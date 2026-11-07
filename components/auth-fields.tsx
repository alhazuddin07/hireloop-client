"use client"

import { useState, type InputHTMLAttributes } from "react"
import { Eye, EyeOff } from "lucide-react"

const fieldStyles =
  "h-11 w-full rounded-lg border border-white/[0.08] bg-[#0E0F14] px-3.5 text-sm text-[#EDEDEF] outline-none transition placeholder:text-[#63636D] focus:border-[#5C53FE]/60 focus:ring-2 focus:ring-[#5C53FE]/20"

export function Field({
  label,
  id,
  hint,
  ...props
}: { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="block text-sm font-medium text-[#D6D6DC]">
        {label}
      </label>
      <input id={id} className={fieldStyles} {...props} />
      {hint ? <p className="text-xs text-[#74747E]">{hint}</p> : null}
    </div>
  )
}

export function PasswordField({
  label,
  id,
  hint,
  ...props
}: Omit<
  { label: string; hint?: string } & InputHTMLAttributes<HTMLInputElement>,
  "type"
>) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="relative">
      <Field
        id={id}
        label={label}
        hint={hint}
        type={visible ? "text" : "password"}
        {...props}
      />

      <button
        type="button"
        onClick={() => setVisible((prev) => !prev)}
        className="absolute top-9.5 right-3 text-[#8C8C95] transition-colors hover:text-white"
        aria-label={visible ? "Hide password" : "Show password"}
      >
        {visible ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  )
}
