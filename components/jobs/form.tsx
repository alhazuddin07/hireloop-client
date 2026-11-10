"use client"

import type { ComponentProps, ReactNode } from "react"
import type { LucideIcon } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "cn"

// Shared field styling for the dashboard forms
export const FIELD_CLASSES =
  "h-11 w-full rounded-xl border-none bg-[#1E1E21] text-[15px] text-white placeholder:text-[#A0A0AB]"

export const SELECT_FIELD_CLASSES = cn(FIELD_CLASSES, "hover:bg-[#1E1E21]")

export const TEXTAREA_CLASSES =
  "min-h-24 rounded-xl border-none bg-[#1E1E21] px-4 py-3 text-[15px] leading-5.5 text-[#F4F4F5] placeholder:text-[#A0A0AB]"

// Numbered section card, e.g. "1. Basic Information"
export function FormSection({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) {
  return (
    <div className="rounded-2xl bg-[#151516] p-6">
      <h2 className="flex items-center gap-4 text-lg font-medium text-white">
        <span className="size-2 shrink-0 rounded-xs bg-[#5C53FE]" />
        <span>{title}</span>
      </h2>
      <div className="mt-5 space-y-4">{children}</div>
    </div>
  )
}

// Label + control stack, with an optional right-aligned hint (e.g. "Required")
export function FormField({
  label,
  htmlFor,
  hint,
  children,
  className,
}: {
  label: ReactNode
  htmlFor?: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn("space-y-1", className)}>
      <div className="flex items-center justify-between">
        <Label htmlFor={htmlFor} className="text-sm text-[#F4F4F5]">
          {label}
        </Label>
        {hint ? (
          <span className="text-[13px] text-[#5A5A60]">{hint}</span>
        ) : null}
      </div>
      {children}
    </div>
  )
}

// Input with a leading icon absolute inside the field
export function IconInput({
  icon: Icon,
  iconSize = "default",
  className,
  ...props
}: ComponentProps<typeof Input> & {
  icon: LucideIcon
  iconSize?: "default" | "sm"
}) {
  return (
    <div className="relative">
      <Icon
        className={cn(
          "pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-[#A0A0AB]",
          iconSize === "sm" ? "size-4.5" : "size-5"
        )}
      />
      <Input
        {...props}
        className={cn(
          iconSize === "sm" ? "pl-10" : "pl-11",
          FIELD_CLASSES,
          className
        )}
      />
    </div>
  )
}

// Styled select for string option lists
export function JobSelect({
  options,
  value,
  onValueChange,
  placeholder,
  required,
}: {
  options: readonly string[]
  value: string
  onValueChange: (value: string) => void
  placeholder?: string
  required?: boolean
}) {
  return (
    <Select
      required={required}
      value={value}
      onValueChange={(v) => onValueChange(String(v))}
    >
      <SelectTrigger className={SELECT_FIELD_CLASSES}>
        {value ? (
          <SelectValue placeholder={placeholder}>{value}</SelectValue>
        ) : (
          <SelectValue placeholder={placeholder} />
        )}
      </SelectTrigger>
      <SelectContent className="border-0 bg-[#1A1A1B] text-white ring-white/10">
        {options.map((option) => (
          <SelectItem
            key={option}
            value={option}
            className="data-highlighted:bg-[#232327]"
          >
            {option}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
