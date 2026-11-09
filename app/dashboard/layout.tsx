import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import DashboardSidebar from "../components/DashboardSidebar"

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      {/* Full width + height content area, pages center their content inside */}
      <SidebarInset className="min-h-svh bg-[#131314]">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-2 border-b border-[#232327] bg-[#131314]/90 px-4 backdrop-blur">
          <SidebarTrigger />
        </header>
        <main className="flex flex-1 flex-col">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}

export default DashboardLayout
