/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS } from "@/constants/forms";

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
  { id: "satisfactionLevel", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.satisfactionLevel, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.satisfactionLevel.length*7, cell: ({ row }) => pickField(row.original, ["satisfactionLevel"]) },
  { id: "likedMostAndHighlights", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.likedMostAndHighlights, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.likedMostAndHighlights.length*7.5, cell: ({ row }) => pickField(row.original, ["likedMostAndHighlights"]) },
  { id: "likedLeastSuggestions", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.likedLeastSuggestions, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.likedLeastSuggestions.length*7.5, cell: ({ row }) => pickField(row.original, ["likedLeastSuggestions"]) },
  { id: "personalChange", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.personalChange, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.personalChange.length*7.5, cell: ({ row }) => pickField(row.original, ["personalChange"]) },
  { id: "selfDifference", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.selfDifference, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.selfDifference.length*7.5, cell: ({ row }) => pickField(row.original, ["selfDifference"]) },
  { id: "knowledgeMomentsImportance", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.knowledgeMomentsImportance, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.knowledgeMomentsImportance.length*7.5, cell: ({ row }) => pickField(row.original, ["knowledgeMomentsImportance"]) },
  { id: "tellAFriend", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.tellAFriend, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.tellAFriend.length*7.5, cell: ({ row }) => pickField(row.original, ["tellAFriend"]) },
  { id: "benefits", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.benefits, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.benefits.length*7.5, cell: ({ row }) => pickField(row.original, ["benefits"]) },
  { id: "authorizeUse", header: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.authorizeUse, size: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.authorizeUse.length*7.5, cell: ({ row }) => pickField(row.original, ["authorizeUse"]) },
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


