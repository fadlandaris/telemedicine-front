"use client"

import AdminLayout from "@/layout/AdminLayout";
import { SidebarProvider } from "@/context/SidebarContext";
import { ThemeProvider } from "@/context/ThemeContext";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {

  return (
    <ThemeProvider>
      <SidebarProvider>
        <AdminLayout>{children}</AdminLayout>
      </SidebarProvider>
    </ThemeProvider>
  )
}
