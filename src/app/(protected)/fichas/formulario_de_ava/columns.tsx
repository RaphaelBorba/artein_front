/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_DE_AVA } from "@/constants/forms";

function pickField(row: SubmissionRecord, keys: string[]): string {
  for (const key of keys) {
    const value = row[key as keyof SubmissionRecord] as unknown;
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }
  return "";
}

export const getColumns = (baseRoute: string): ColumnDef<SubmissionRecord, any>[] => [
  { accessorKey: "createdAt", header: "Criado em", size: 160, cell: (info) => formatDate(String(info.getValue())) },
  { id: "fullName", header: COMMON_LABELS.fullName, size: 280, cell: ({ row }) => pickField(row.original, ["fullName"]) },
  { id: "birthDate", header: COMMON_LABELS.birthDate, size: 160, cell: ({ row }) => { const raw = pickField(row.original, ["birthDate"]); return raw ? formatDate(raw) : ""; } },
  { id: "satisfactionLevel", header: QUESTIONS_FORMULARIO_DE_AVA.satisfactionLevel, size: QUESTIONS_FORMULARIO_DE_AVA.satisfactionLevel.length*7, cell: ({ row }) => pickField(row.original, ["satisfactionLevel"]) },
  { id: "likedMostAndHighlights", header: QUESTIONS_FORMULARIO_DE_AVA.likedMostAndHighlights, size: QUESTIONS_FORMULARIO_DE_AVA.likedMostAndHighlights.length*7.5, cell: ({ row }) => pickField(row.original, ["likedMostAndHighlights"]) },
  { id: "likedLeastDiscomfort", header: QUESTIONS_FORMULARIO_DE_AVA.likedLeastDiscomfort, size: QUESTIONS_FORMULARIO_DE_AVA.likedLeastDiscomfort.length*7.5, cell: ({ row }) => pickField(row.original, ["likedLeastDiscomfort"]) },
  { id: "personalChange", header: QUESTIONS_FORMULARIO_DE_AVA.personalChange, size: QUESTIONS_FORMULARIO_DE_AVA.personalChange.length*7.5, cell: ({ row }) => pickField(row.original, ["personalChange"]) },
  { id: "takeHomeCare", header: QUESTIONS_FORMULARIO_DE_AVA.takeHomeCare, size: QUESTIONS_FORMULARIO_DE_AVA.takeHomeCare.length*7.5, cell: ({ row }) => pickField(row.original, ["takeHomeCare"]) },
  { id: "tellAFriend", header: QUESTIONS_FORMULARIO_DE_AVA.tellAFriend, size: QUESTIONS_FORMULARIO_DE_AVA.tellAFriend.length*7.5, cell: ({ row }) => pickField(row.original, ["tellAFriend"]) },
  { id: "praiseOrComplaint", header: QUESTIONS_FORMULARIO_DE_AVA.praiseOrComplaint, size: QUESTIONS_FORMULARIO_DE_AVA.praiseOrComplaint.length*8, cell: ({ row }) => pickField(row.original, ["praiseOrComplaint"]) },
  { id: "improvementSuggestions", header: QUESTIONS_FORMULARIO_DE_AVA.improvementSuggestions, size: QUESTIONS_FORMULARIO_DE_AVA.improvementSuggestions.length*7.5, cell: ({ row }) => pickField(row.original, ["improvementSuggestions"]) },
  { id: "nextTopics", header: QUESTIONS_FORMULARIO_DE_AVA.nextTopics, size: QUESTIONS_FORMULARIO_DE_AVA.nextTopics.length*7.5, cell: ({ row }) => pickField(row.original, ["nextTopics"]) },
  { id: "wantsInfo", header: QUESTIONS_FORMULARIO_DE_AVA.wantsInfo, size: QUESTIONS_FORMULARIO_DE_AVA.wantsInfo.length*7.5, cell: ({ row }) => pickField(row.original, ["wantsInfo"]) },
  { id: "preferredMedia", header: QUESTIONS_FORMULARIO_DE_AVA.preferredMedia, size: QUESTIONS_FORMULARIO_DE_AVA.preferredMedia.length*7, cell: ({ row }) => pickField(row.original, ["preferredMedia"]) },
  { id: "authorizeUse", header: QUESTIONS_FORMULARIO_DE_AVA.authorizeUse, size: QUESTIONS_FORMULARIO_DE_AVA.authorizeUse.length*7, cell: ({ row }) => pickField(row.original, ["authorizeUse"]) },
  {
    id: "actions",
    header: "Ações",
    meta: { style: { textAlign: "center" } },
    size: 140,
    cell: (info) => (
      <div className="flex justify-center gap-2">
        <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}`}>
          <button title="Visualizar">
            <Eye className="text-blue-500" />
          </button>
        </Link>
      </div>
    ),
  },
];
