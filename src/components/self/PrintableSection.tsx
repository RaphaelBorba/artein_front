"use client";

import { useRef } from "react";
import { AppSidebar } from "../ui/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "../ui/sidebar";
import PrintHeader from "./PrintHeader";
import PrintButton from "./PrintButton";

interface PrintableSectionProps {
    children: React.ReactNode;
    title?: string;
}

export default function PrintableSection({ title, children }: PrintableSectionProps) {
    const printRef = useRef<HTMLDivElement>(null);

    return (
        <SidebarProvider>
            <AppSidebar />
            <div className="flex size-full min-w-0 flex-1 flex-col">
                <SidebarTrigger className="print:hidden" />
                <div className="flex flex-col gap-3 p-3.5 print:p-0">
                    <div className="flex items-center justify-between print:hidden">
                        {title && <h1 className="text-2xl text-[#333]">{title}</h1>}
                        <PrintButton contentRef={printRef} documentTitle={title || "Ficha"} />
                    </div>
                    <div 
                        ref={printRef} 
                        className="flex size-full flex-col gap-10 rounded-sm bg-white p-5 print:gap-4 print:p-0"
                    >
                        <PrintHeader title={title || "Ficha"} />
                        {children}
                    </div>
                </div>
            </div>
        </SidebarProvider>
    );
}

