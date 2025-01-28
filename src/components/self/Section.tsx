'use client'
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";



export default function Section() {

    return (
            <SidebarProvider>
                <AppSidebar />
                <SidebarTrigger />
                <div>

                </div>
            </SidebarProvider>
    )
}