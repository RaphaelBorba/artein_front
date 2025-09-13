/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS, SATISFACTION_LEVEL_OPTIONS } from "@/constants/forms";

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
  {
    accessorKey: "createdAt",
    header: "Criado em",
    size: 160,
    cell: (info) => formatDate(String(info.getValue())),
  },
  {
    id: "fullName",
    header: COMMON_LABELS.fullName,
    size: 280,
    cell: ({ row }) => pickField(row.original, ["fullName", "nomeCompleto", "nome_completo"]),
  },
  {
    id: "birthDate",
    header: COMMON_LABELS.birthDate,
    size: 160,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["birthDate", "dataDeNascimento", "nascimento"]);
      return raw ? formatDate(raw) : "";
    },
  },
  {
    id: "satisfactionLevel",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.satisfactionLevel,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.satisfactionLevel.length*7.5,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["satisfactionLevel", "nivelSatisfacao"]);
      return raw ? SATISFACTION_LEVEL_OPTIONS.find((option) => option.value === raw)?.label : "";
    },
  },
  {
    id: "likedMostAndTakeaways",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.likedMostAndTakeaways,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.likedMostAndTakeaways.length*7,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["likedMostAndTakeaways", "maisGostou"]);
      return raw ? raw : "";
    },
  },
  {
    id: "likedLeastSuggestions",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.likedLeastSuggestions,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.likedLeastSuggestions.length*7.5,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["likedLeastSuggestions", "menosGostou"]);
      return raw ? raw : "";
    },
  },
  {
    id: "personalChange",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.personalChange,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.personalChange.length*7.5,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["personalChange", "mudancaPessoal"]);
      return raw ? raw : "";
    },
  },
  {
    id: "selfDifference",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.selfDifference,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.selfDifference.length*7,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["selfDifference", "diferenca"]);
      return raw ? raw : "";
    },
  },
  {
    id: "knowledgeMomentsImportance",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.knowledgeMomentsImportance,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.knowledgeMomentsImportance.length*7,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["knowledgeMomentsImportance", "momentosConhecimento"]);
      return raw ? raw : "";
    },
  },
  {
    id: "tellAFriend",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.tellAFriend,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.tellAFriend.length*7.5,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["tellAFriend", "digaParaAmigo"]);
      return raw ? raw : "";
    },
  },
  {
    id: "benefits",
    header: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.benefits,
    size: QUESTIONS_FORMULARIO_DE_AVALIACAO_P8S_MINDFULLNESS.benefits.length*7,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["benefits", "beneficios"]);
      return raw ? raw : "";
    },
  },
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


