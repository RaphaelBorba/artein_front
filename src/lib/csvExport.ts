/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";

function resolveHeader<T>(col: ColumnDef<T, any>): string {
  if (typeof col.header === "string") return col.header;
  if ("accessorKey" in col && col.accessorKey) return String(col.accessorKey);
  return col.id ?? "";
}

function resolveCellValue<T>(col: ColumnDef<T, any>, row: T): string {
  const accessorKey = (col as any).accessorKey as string | undefined;
  const getValue = () => (accessorKey ? (row as any)[accessorKey] : undefined);

  let raw: unknown;
  if (typeof col.cell === "function") {
    const context = {
      getValue,
      row: {
        original: row,
        getValue: (key: string) => (row as any)[key],
      },
    };
    raw = (col.cell as any)(context);
  } else {
    raw = getValue();
  }

  if (raw === null || raw === undefined) return "";
  if (typeof raw === "string" || typeof raw === "number" || typeof raw === "boolean") {
    return String(raw);
  }
  // Valor não-primitivo (ex: JSX de uma coluna de ações) — não deveria ocorrer
  // já que a coluna "actions" é excluída antes de chegar aqui.
  return "";
}

function escapeCsvValue(value: string): string {
  if (/[",\n\r]/.test(value)) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

export function columnsToCsv<T>(columns: ColumnDef<T, any>[], rows: T[]): string {
  const exportableColumns = columns.filter((col) => col.id !== "actions");
  const headerLine = exportableColumns.map((col) => escapeCsvValue(resolveHeader(col))).join(",");
  const lines = rows.map((row) =>
    exportableColumns.map((col) => escapeCsvValue(resolveCellValue(col, row))).join(",")
  );
  return "﻿" + [headerLine, ...lines].join("\r\n");
}

export function downloadCsv(filename: string, csvContent: string): void {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
