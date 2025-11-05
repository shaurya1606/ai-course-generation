"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import Logo from "../Logo"
import { Button } from "../ui/button"
import { SidebarItems } from "@/constants/constant"
import { usePathname } from "next/navigation"
import { AddNewCourseDialog } from "./AddNewCourseDialog"

export function AppSidebar() {

  const path = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className={'p-4 flex items-center'}>
        <Link href="/workspace"><Logo /></Link>
      </SidebarHeader>
      <SidebarContent>
          <SidebarGroup>
           <AddNewCourseDialog>
            <Button  variant="default" className="w-full text-white hover:bg-primary/90 mb-4 cursor-pointer">
              Create New Course
            </Button>
           </AddNewCourseDialog>  
          </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarItems.map((item, index) => {
                const isActive = path === item.href || (item.href !== "/workspace" && path.startsWith(`${item.href}/`));

                return (
                  <SidebarMenuItem key={index}>
                    <SidebarMenuButton asChild className={'p-5'}>
                      <Link href={item.href} className={`text-[15px] ${isActive && 'font-bold bg-accent/100 rounded-md'}`}>
                      <item.icons /><span>{item.title}</span></Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
          </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}