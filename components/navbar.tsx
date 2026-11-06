import Image from "next/image"
import Link from "next/link"
import { Menu } from "lucide-react"

import logo from "@/app/images/logo.png"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

const navLinks = [
  { href: "/jobs", label: "Browse Jobs" },
  { href: "/company", label: "Company" },
  { href: "/pricing", label: "Pricing" },
]

const navPillClasses =
  "hidden h-[68px] items-center gap-3 rounded-[8px] border border-white/[0.07] bg-[#1A1A1F] pl-6 pr-2 lg:flex"

function NavbarLinks() {
  return (
    <div className="flex items-center gap-5">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-base leading-7.25 font-medium text-[#EDEDEF] transition-colors hover:text-[#645BFF]"
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}

function NavbarActions() {
  return (
    <div className="flex items-center gap-3">
      <Button
        className="h-13 px-6 text-base text-[#645BFF]"
        variant="ghost"
      >
        Sign In
      </Button>
      <Button className="h-13 rounded-[8px] border border-[#090A15]/10 bg-[#5C53FE] px-6 text-base text-[#EDEDEF] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4A42E8]">
        Get Started
      </Button>
    </div>
  )
}

function NavbarLogo() {
  return (
    <Link href="/" className="flex items-center">
      <Image
        src={logo}
        alt="HireLoop"
        width={154}
        height={44}
        loading="eager"
      />
    </Link>
  )
}

export function Navbar() {
  return (
    <header className="w-full">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between py-4">
        <NavbarLogo />

        {/* Desktop: pill nav */}
        <nav className={navPillClasses}>
          <NavbarLinks />
          <Separator orientation="vertical" className="h-6 bg-[#A8A8A8]/40" />
          <NavbarActions />
        </nav>

        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="text-[#EDEDEF] lg:hidden"
                aria-label="Open menu"
              />
            }
          >
            <Menu />
          </SheetTrigger>
          <SheetContent
            side="right"
            className="gap-0 border-white/[0.07] bg-[#1A1A1F] p-0 text-[#EDEDEF]"
          >
            <SheetHeader className="border-b border-white/[0.07] px-6 py-4 pb-4 text-left">
              <SheetClose
                nativeButton={false}
                render={
                  <Link href="/" aria-label="HireLoop" className="w-fit" />
                }
              >
                <Image src={logo} alt="HireLoop" width={154} height={44} />
              </SheetClose>
            </SheetHeader>
            <nav className="flex flex-col px-6 py-2">
              {navLinks.map((link) => (
                <SheetClose
                  key={link.href}
                  nativeButton={false}
                  render={<Link href={link.href} />}
                >
                  <span className="py-4 text-base font-medium text-[#EDEDEF] transition-colors hover:text-[#645BFF]">
                    {link.label}
                  </span>
                </SheetClose>
              ))}
            </nav>
            <SheetFooter className="flex-col items-stretch gap-3 border-t border-white/[0.07] px-6 py-6">
              <SheetClose
                render={
                  <Button
                    className="h-13 px-6 text-base text-[#645BFF]"
                    variant="ghost"
                  />
                }
              >
                Sign In
              </SheetClose>
              <SheetClose
                render={
                  <Button className="h-13 rounded-[8px] border border-[#090A15]/10 bg-[#5C53FE] px-6 text-base text-[#EDEDEF] shadow-[inset_0_3px_10px_rgba(255,255,255,0.2)] hover:bg-[#4A42E8]" />
                }
              >
                Get Started
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
