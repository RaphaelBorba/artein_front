
"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import '@tanstack/react-table'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select"
import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from "lucide-react"
import { IPagination } from "@/types/dataTableResponse"
import { Dispatch, SetStateAction } from "react"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    pagination: IPagination;
    setPagination: Dispatch<SetStateAction<IPagination>>
}

export function DataTable<TData, TValue>({ columns, data, pagination, setPagination }: DataTableProps<TData, TValue>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <div className="rounded-md border">
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} style={{
                                    minWidth: header.column.columnDef.size,
                                    maxWidth: header.column.columnDef.size,
                                    textAlign: header.column.columnDef.meta?.style.textAlign
                                }}
                                    className="border"
                                >
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row, i) => (
                            <TableRow
                                key={row.id}
                                data-state={row.getIsSelected() && "selected"}
                                className={`${i % 2 !== 0 && 'bg-muted/5'}`}
                            >
                                {row.getVisibleCells().map(cell => (
                                    <TableCell key={cell.id} style={{
                                        minWidth: cell.column.columnDef.size,
                                        maxWidth: cell.column.columnDef.size,
                                        textAlign: cell.column.columnDef.meta?.style.textAlign
                                    }} className="truncate border p-2">
                                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell colSpan={columns.length} className="h-24 text-center">
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </Table>
            <div className="flex flex-col-reverse items-center justify-end gap-4 sm:flex-row sm:gap-6 lg:gap-8">
                <div className="flex items-center space-x-2">
                    <p className="whitespace-nowrap text-sm font-medium">Linhas por página:</p>
                    <Select
                        value={`${pagination.pageSize}`}
                        onValueChange={(value) => {
                            setPagination((prev) => ({...prev, pageSize:Number(value)}))
                        }}
                    >
                        <SelectTrigger className="h-8 w-[4.5rem]">
                            <SelectValue placeholder={'pageSize'} />
                        </SelectTrigger>
                        <SelectContent side="top">
                            {[10,25,50,100].map((pageSize) => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                <div className="flex items-center justify-center text-sm font-medium">
                    Página {pagination.page} de {pagination.totalPages}
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        aria-label="Go to first page"
                        variant="outline"
                        className="hidden size-8 p-0 lg:flex"
                        onClick={() => setPagination((prev) => ({...prev, page:1}))}
                        disabled={!pagination.hasPreviousPage}
                    >
                        <ChevronsLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to previous page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => setPagination((prev) => ({...prev, page:prev.page-1}))}
                        disabled={!pagination.hasPreviousPage}
                    >
                        <ChevronLeft className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to next page"
                        variant="outline"
                        size="icon"
                        className="size-8"
                        onClick={() => setPagination((prev) => ({...prev, page:prev.page+1}))}
                        disabled={!pagination.hasNextPage}
                    >
                        <ChevronRight className="size-4" aria-hidden="true" />
                    </Button>
                    <Button
                        aria-label="Go to last page"
                        variant="outline"
                        size="icon"
                        className="hidden size-8 lg:flex"
                        onClick={() => setPagination((prev) => ({...prev, page:prev.totalPages}))}
                        disabled={!pagination.hasNextPage}
                    >
                        <ChevronsRight className="size-4" aria-hidden="true" />
                    </Button>
                </div>
            </div>
        </div>
    )
}
