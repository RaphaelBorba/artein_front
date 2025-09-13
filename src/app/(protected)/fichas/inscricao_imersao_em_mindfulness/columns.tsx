/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS } from "@/constants/forms";

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
      id: "alreadyParticipatedInCourseArtin",
      header: COMMON_LABELS.alreadyParticipatedInCourseArtin,
      size: COMMON_LABELS.alreadyParticipatedInCourseArtin.length*7.5,
      cell: ({ row }) => pickField(row.original, ["alreadyParticipatedInCourseArtin", "participouCurso"]),
    },
    {
      id: "alreadyParticipatedInCourseOther",
      header: COMMON_LABELS.alreadyParticipatedInCourseOther,
      size: COMMON_LABELS.alreadyParticipatedInCourseOther.length*7,
      cell: ({ row }) => pickField(row.original, ["alreadyParticipatedInCourseOther", "participouCursoIntrodutorio"]),
    },
    {
      id: "payment",
      header: COMMON_LABELS.payment,
      size: 260,
      cell: ({ row }) => pickField(row.original, ["payment", "valorEFormaPagamento"]),
    },
    {
      id: "otherPayment",
      header: COMMON_LABELS.otherPayment,
      size: 260,
      cell: ({ row }) => pickField(row.original, ["otherPayment", "outraFormaPagamento"]),
    },
    {
      id: "paymentMedium",
      header: COMMON_LABELS.paymentMedium,
      size: 220,
      cell: ({ row }) => pickField(row.original, ["paymentMedium", "meioDePagamento"]),
    },
    {
      id: "bankAndInitialDepositDate",
      header: COMMON_LABELS.bankAndInitialDepositDate,
      size: COMMON_LABELS.bankAndInitialDepositDate.length*8,
      cell: ({ row }) => pickField(row.original, ["bankAndInitialDepositDate", "infoDepositoInicial"]),
    },
    {
      id: "paymentInstructions",
      header: COMMON_LABELS.paymentInstructions,
      size:   COMMON_LABELS.paymentInstructions.length*7.5,
      cell: ({ row }) => pickField(row.original, ["paymentInstructions", "instrucoesPagamento"]),
    },
    {
      id: "depositData",
      header: COMMON_LABELS.depositData,
      size: 360,
      cell: ({ row }) => pickField(row.original, ["depositData", "dadosDeposito"]),
    },
    {
      id: "whyCourse",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.whyCourse,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.whyCourse.length*7,
      cell: ({ row }) => pickField(row.original, [
        "whyCourse",
        "porqueCurso",
      ]),
    },
    {
      id: "keptTraining",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.keptTraining,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.keptTraining.length*7,
      cell: ({ row }) => pickField(row.original, ["keptTraining", "praticaMindfulness"]),
    },
    {
      id: "frequentlyPracticed",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.frequentlyPracticed,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.frequentlyPracticed.length*7,
      cell: ({ row }) => pickField(row.original, ["frequentlyPracticed", "experienciaMeditacao"]),
    },
    {
      id: "otherContact",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContact,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContact.length*7,
      cell: ({ row }) => pickField(row.original, ["otherContact", "outroContato"]),
    },  
    {
      id: "otherContactDescription",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContactDescription,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContactDescription.length*7,
      cell: ({ row }) => pickField(row.original, ["otherContactDescription", "contatoMindfulness"]),
    },
    {
      id: "psychotherapy",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.psychotherapyTreatment,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContactDescription.length*8.5,
      cell: ({ row }) => pickField(row.original, ["psychotherapyTreatment", "tratamentoPsicoterapico"]),
    },  
    {
      id: "specialNeeds",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.specialNeeds,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.specialNeeds.length*7.5,
      cell: ({ row }) => pickField(row.original, ["specialNeeds", "necessidadeEspecial"]),
    },
    {
      id: "greatestGain",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.greatestGain,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.greatestGain.length*7,
      cell: ({ row }) => pickField(row.original, ["greatestGain", "maiorGanho"]),
    },  
    {
      id: "expectations",
      header: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.expectations,
      size: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.expectations.length*7,
      cell: ({ row }) => pickField(row.original, ["expectations", "expectativas"]),
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


