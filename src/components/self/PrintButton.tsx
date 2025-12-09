"use client";

import { Printer } from "lucide-react";
import { useReactToPrint } from "react-to-print";
import { Button } from "@/components/ui/button";
import { RefObject } from "react";

interface PrintButtonProps {
    contentRef: RefObject<HTMLDivElement | null>;
    documentTitle?: string;
}

export default function PrintButton({ contentRef, documentTitle = "Ficha" }: PrintButtonProps) {
    const handlePrint = useReactToPrint({
        contentRef,
        documentTitle,
    });

    return (
        <Button
            type="button"
            variant="outline"
            onClick={() => handlePrint()}
            className="print:hidden flex items-center gap-2 text-base"
        >
            <Printer className="h-4 w-4" />
            Imprimir
        </Button>
    );
}

