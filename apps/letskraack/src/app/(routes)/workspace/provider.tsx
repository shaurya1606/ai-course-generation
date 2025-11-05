'use client'

import React from 'react'
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/workspace/AppSidebar"
import { AppHeader } from "@/components/workspace/AppHeader"

const WorkspaceProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <AppHeader  />
          <main className="p-10">
            {children}
          </main>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default WorkspaceProvider