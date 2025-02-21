// src/components/DataTable.tsx
"use client";

import React from "react";
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface Column<T> {
    header: string;
    /**
     * Either the key of the row data or a render function.
     */
    accessor?: keyof T | ((row: T) => React.ReactNode);
    /**
     * Optional render function that receives the computed cell value and the entire row record.
     */
    render?: (text: React.ReactNode, record: T) => React.ReactNode;
    /**
     * Optional CSS min-width for the column (e.g., "100px").
     */
    minWidth?: string;
    /**
     * Optional CSS max-width for the column (e.g., "300px").
     */
    maxWidth?: string;
}


export interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    /**
     * Optional render function for the actions column.
     */
    actions?: (row: T) => React.ReactNode;
    /**
     * Optional table caption.
     */
    caption?: string;
    /**
     * Optional table footer.
     */
    footer?: React.ReactNode;
}

export function DataTable<T>({
    data,
    columns,
    actions,
    caption,
    footer,
}: DataTableProps<T>) {
    return (
        <Table className="w-full table-auto">
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {columns.map((col, index) => (
                        <TableHead
                            className="border"
                            key={index}
                            style={{
                                minWidth: col.minWidth,
                                maxWidth: col.maxWidth,
                            }}
                        >
                            {col.header}
                        </TableHead>
                    ))}
                    {actions && <TableHead>Ações</TableHead>}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((row, rowIndex) => (
                    <TableRow key={rowIndex}>
                        {columns.map((col, colIndex) => {
                            const cellValue: React.ReactNode | string =
                                typeof col.accessor === "function"
                                    ? col.accessor(row)
                                    : col.accessor
                                        ? (row[col.accessor] as unknown as React.ReactNode)
                                        : null;
                            return (
                                <TableCell
                                    key={colIndex}
                                    style={{
                                        minWidth: col.minWidth,
                                        maxWidth: col.maxWidth,
                                    }}
                                >
                                    {col.render ? col.render(cellValue, row) : cellValue}
                                </TableCell>
                            );
                        })}
                        {actions && <TableCell>{actions(row)}</TableCell>}
                    </TableRow>
                ))}
            </TableBody>
            {footer && (
                <TableFooter>
                    <TableRow>
                        <TableCell colSpan={columns.length + (actions ? 1 : 0)}>
                            {footer}
                        </TableCell>
                    </TableRow>
                </TableFooter>
            )}
        </Table>
    );
}

