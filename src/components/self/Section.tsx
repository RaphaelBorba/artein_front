'use client'
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import React from "react";

interface SectionProps {
    children: React.ReactNode;
    title?: string
}

export default function Section({ title, children }: SectionProps) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex size-full min-w-0 flex-1 flex-col">
                <SidebarTrigger className="" />
                <div className="flex flex-col gap-3 p-3.5">
                    {title && <h1 className=" text-2xl text-[#333]">{title}</h1>}
                    <div className="flex size-full flex-col gap-10 rounded-sm bg-white p-5">
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}
