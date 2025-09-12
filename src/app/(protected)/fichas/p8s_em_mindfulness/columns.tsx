/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";
import { COMMON_LABELS, QUESTIONS_PS8_EM_MINDFULLNESS } from "@/constants/forms";

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
    id: "profession",
    header: COMMON_LABELS.profession,
    size: 220,
    cell: ({ row }) => pickField(row.original, ["profession", "profissao"]),
  },
  {
    id: "birthDate",
    header: COMMON_LABELS.birthDate,
    size: 200,
    cell: ({ row }) => {
      const raw = pickField(row.original, ["birthDate", "dataDeNascimento", "nascimento"]);
      return raw ? formatDate(raw) : "";
    },
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
    id: "phone",
    header: COMMON_LABELS.phone,
    size: 180,
    cell: ({ row }) => pickField(row.original, ["phone", "telefone"]),
  },
  {
    id: "email",
    header: COMMON_LABELS.email,
    size: 240,
    cell: ({ row }) => pickField(row.original, ["email", "eMail"]),
  },
  {
    id: "indication",
    header: `${COMMON_LABELS.indication}:`,
    size: 240,
    cell: ({ row }) => pickField(row.original, ["indication", "indicacao"]),
  },
  {
    id: "paymentForm",
    header: COMMON_LABELS.payment,
    size: 260,
    cell: ({ row }) => pickField(row.original, ["payment", "valorEFormaPagamento"]),
  },
  {
    id: "otherPaymentForm",
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
    id: "discount",
    header: COMMON_LABELS.discount,
    size: 160,
    cell: ({ row }) => pickField(row.original, ["discount", "desconto"]),
  },
  {
    id: "otherDiscounts",
    header: COMMON_LABELS.otherDiscounts,
    size: 220,
    cell: ({ row }) => pickField(row.original, ["otherDiscounts", "outrosDescontos"]),
  },
  {
    id: "depositInitialInfo",
    header: COMMON_LABELS.bankAndInitialDepositDateAndInstallments,
    size: 360,
    cell: ({ row }) => pickField(row.original, ["bankAndInitialDepositDate", "infoDepositoInicial"]),
  },
  {
    id: "depositData",
    header: COMMON_LABELS.depositData,
    size: 340,
    cell: ({ row }) => pickField(row.original, ["depositData", "dadosDeposito"]),
  },
  {
    id: "whyMindfulnessProgram",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.whyMindfulnessProgram,
    size: 790,
    cell: ({ row }) => pickField(row.original, [
      "whyMindfulnessProgram",
      "porqueCurso",
    ]),
  },
  {
    id: "motivationForProgram",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.motivationForProgram,
    size: 700,
    cell: ({ row }) => pickField(row.original, ["motivationForProgram", "experienciaMeditacao"]),
  },
  {
    id: "meditationExperience",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.meditationExperience,
    size: 550,
    cell: ({ row }) => pickField(row.original, ["meditationExperience", "contatoMindfulness"]),
  },
  {
    id: "mindfulnessContact",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.mindfulnessContact,
    size: 760,
    cell: ({ row }) => pickField(row.original, ["mindfulnessContact", "tratamentoPsicoterapico"]),
  },
  {
    id: "psychotherapyTreatment",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.psychotherapyTreatment,
    size: 1260,
    cell: ({ row }) => pickField(row.original, ["psychotherapyTreatment", "necessidadeEspecial"]),
  },
  {
    id: "specialNeeds",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.specialNeeds,
    size: 730,
    cell: ({ row }) => pickField(row.original, ["specialNeeds", "expectativas"]),
  },
  {
    id: "expectations",
    header: QUESTIONS_PS8_EM_MINDFULLNESS.expectations,
    size: 500,
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


