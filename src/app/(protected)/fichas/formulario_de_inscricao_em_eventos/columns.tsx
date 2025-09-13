/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS } from "@/constants/forms";

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
    id: "eventName",
    header: "Evento",
    size: 280,
    cell: ({ row }) => pickField(row.original, ["eventName", "evento"]),
  },
  {
    id: "fullName",
    header: COMMON_LABELS.fullName,
    size: 280,
    cell: ({ row }) => pickField(row.original, ["fullName", "nomeCompleto", "nome_completo"]),
  },
  {
    id: "phone",
    header: COMMON_LABELS.phone,
    size: 180,
    cell: ({ row }) => pickField(row.original, ["phone", "telefone"]),
  },
  {
    id: "cep",
    header: COMMON_LABELS.cep,
    size: 140,
    cell: ({ row }) => pickField(row.original, ["cep", "zipCode"]),
  },
  {
    id: "address",
    header: COMMON_LABELS.address,
    size: 280,
    cell: ({ row }) => pickField(row.original, ["address", "endereco"]),
  },
  {
    id: "city",
    header: COMMON_LABELS.city,
    size: 180,
    cell: ({ row }) => pickField(row.original, ["city", "cidade"]),
  },
  {
    id: "district",
    header: COMMON_LABELS.district,
    size: 180,
    cell: ({ row }) => pickField(row.original, ["district", "bairro"]),
  },
  {
    id: "state",
    header: COMMON_LABELS.state,
    size: 140,
    cell: ({ row }) => pickField(row.original, ["state", "estado"]),
  },
  {
    id: "email",
    header: COMMON_LABELS.email,
    size: 240,
    cell: ({ row }) => pickField(row.original, ["email", "eMail"]),
  },
  {
    id: "payment",
    header: COMMON_LABELS.payment,
    size: 220,
    cell: ({ row }) => pickField(row.original, ["payment", "valor"]),
  },
  {
    id: "paymentMedium",
    header: COMMON_LABELS.paymentMedium,
    size: 220,
    cell: ({ row }) => pickField(row.original, ["paymentMedium", "meioDePagamento"]),
  },
  {
    id: "otherPayment",
    header: COMMON_LABELS.otherPayment,
    size: 260,
    cell: ({ row }) => pickField(row.original, ["otherPayment", "outraFormaPagamento"]),
  },
  {
    id: "previousActivityArtin",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.previousActivityArtin,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.previousActivityArtin.length*7,
    cell: ({ row }) => pickField(row.original, ["previousActivityArtin", "participouAtividade"]),
  },
  {
    id: "inspiration",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.inspiration,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.inspiration.length*7.5,
    cell: ({ row }) => pickField(row.original, ["inspiration", "inspiracao"]),
  },
  {
    id: "expectations",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.expectations,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.expectations.length*7.5,
    cell: ({ row }) => pickField(row.original, ["expectations", "expectativa"]),
  },
  {
    id: "personalDevelopmentInterests",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.personalDevelopmentInterests,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.personalDevelopmentInterests.length*7,
    cell: ({ row }) => pickField(row.original, ["personalDevelopmentInterests", "interesseDesenvolvimentoPessoal"]),
  },
  {
    id: "wantsToReceiveInfo",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.wantsToReceiveInfo,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.wantsToReceiveInfo.length*7,
    cell: ({ row }) => pickField(row.original, ["wantsToReceiveInfo", "interesseInformacoes"]),
  },
  {
    id: "suggestions",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.suggestions,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.suggestions.length*7,
    cell: ({ row }) => pickField(row.original, ["suggestions", "sugerencias"]),
  },
  {
    id: "wouldRecommend",
    header: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.wouldRecommend,
    size: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.wouldRecommend.length*7.5,
    cell: ({ row }) => pickField(row.original, ["wouldRecommend", "indicariaAtividades"]),
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


