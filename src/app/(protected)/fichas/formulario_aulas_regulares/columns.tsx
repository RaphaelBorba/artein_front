/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_AULAS_REGULARES, QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES } from "@/constants/forms";

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
    id: "specialNeeds",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.specialNeeds,
    size: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.specialNeeds.length*7,
    cell: ({ row }) => pickField(row.original, ["specialNeeds"]),
  },
  {
    id: "underMedicalCare",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.underMedicalCare,
    size: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.underMedicalCare.length*7,
    cell: ({ row }) => pickField(row.original, ["underMedicalCare"]),
  },
  {
    id: "whichMedicalCare",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.whichMedicalCare,
    size: 300,
    cell: ({ row }) => pickField(row.original, ["whichMedicalCare"]),
  },
  {
    id: "underPsychologicalCare",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.underPsychologicalCare,
    size: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.underPsychologicalCare.length*7,
    cell: ({ row }) => pickField(row.original, ["underPsychologicalCare"]),
  },
  {
    id: "whichPsychologicalCare",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.whichPsychologicalCare,
    size: 300,
    cell: ({ row }) => pickField(row.original, ["whichPsychologicalCare"]),
  },
  {
    id: "underPsychiatricCare",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.underPsychiatricCare,
    size: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.underPsychiatricCare.length*7,
    cell: ({ row }) => pickField(row.original, ["underPsychiatricCare"]),
  },
  {
    id: "whichPsychiatricCare",
    header: QUESTIONS_HEALTH_FORMULARIO_AULAS_REGULARES.whichPsychiatricCare,
    size: 300,
    cell: ({ row }) => pickField(row.original, ["whichPsychiatricCare"]),
  },
  {
    id: "healthImportantInfo",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.healthImportantInfo,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.healthImportantInfo.length*7.5,
    cell: ({ row }) => pickField(row.original, ["healthImportantInfo"]),
  },
  {
    id: "previousActivityArtin",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.previousActivityArtin,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.previousActivityArtin.length*7,
    cell: ({ row }) => pickField(row.original, ["previousActivityArtin"]),
  },
  {
    id: "inspiration",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.inspiration,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.inspiration.length*7,
    cell: ({ row }) => pickField(row.original, ["inspiration"]),
  },
  {
    id: "otherRegularClassInterest",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.otherRegularClassInterest,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.otherRegularClassInterest.length*7,
    cell: ({ row }) => pickField(row.original, ["otherRegularClassInterest"]),
  },
  {
    id: "wantsCourseInfo",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.wantsCourseInfo,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.wantsCourseInfo.length*7.5,
    cell: ({ row }) => pickField(row.original, ["wantsCourseInfo"]),
  },
  {
    id: "suggestions",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.suggestions,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.suggestions.length*7,
    cell: ({ row }) => pickField(row.original, ["suggestions"]),
  },
  {
    id: "wouldRecommend",
    header: QUESTIONS_FORMULARIO_AULAS_REGULARES.wouldRecommend,
    size: QUESTIONS_FORMULARIO_AULAS_REGULARES.wouldRecommend.length*7,
    cell: ({ row }) => pickField(row.original, ["wouldRecommend"]),
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


