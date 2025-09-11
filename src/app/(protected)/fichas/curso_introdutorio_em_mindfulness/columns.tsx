/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import type { SubmissionRecord } from "@/types/formResponse";

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
      header: "Nome Completo",
      size: 280,
      cell: ({ row }) => pickField(row.original, ["fullName", "nomeCompleto", "nome_completo"]),
    },
    {
      id: "profession",
      header: "Profissão",
      size: 220,
      cell: ({ row }) => pickField(row.original, ["profession", "profissao"]),
    },
    {
      id: "birthDate",
      header: "Data de Nascimento",
      size: 200,
      cell: ({ row }) => {
        const raw = pickField(row.original, ["birthDate", "dataDeNascimento", "nascimento"]);
        return raw ? formatDate(raw) : "";
      },
    },
    {
      id: "cep",
      header: "CEP",
      size: 140,
      cell: ({ row }) => pickField(row.original, ["cep", "zipCode"]),
    },
    {
      id: "address",
      header: "Endereço",
      size: 280,
      cell: ({ row }) => pickField(row.original, ["address", "endereco"]),
    },
    {
      id: "city",
      header: "Cidade",
      size: 180,
      cell: ({ row }) => pickField(row.original, ["city", "cidade"]),
    },
    {
      id: "district",
      header: "Bairro",
      size: 180,
      cell: ({ row }) => pickField(row.original, ["district", "bairro"]),
    },
    {
      id: "state",
      header: "Estado",
      size: 140,
      cell: ({ row }) => pickField(row.original, ["state", "estado"]),
    },
    {
      id: "phone",
      header: "Telefone",
      size: 180,
      cell: ({ row }) => pickField(row.original, ["phone", "telefone"]),
    },
    {
      id: "email",
      header: "E-mail",
      size: 240,
      cell: ({ row }) => pickField(row.original, ["email", "eMail"]),
    },
    {
      id: "indication",
      header: "Indicação de:",
      size: 240,
      cell: ({ row }) => pickField(row.original, ["indication", "indicacao"]),
    },
    {
      id: "paymentForm",
      header: "Valor e Forma de Pagamento",
      size: 260,
      cell: ({ row }) => pickField(row.original, ["payment", "valorEFormaPagamento"]),
    },
    {
      id: "otherPaymentForm",
      header: "Outra Forma de Pagamento",
      size: 260,
      cell: ({ row }) => pickField(row.original, ["otherPayment", "outraFormaPagamento"]),
    },
    {
      id: "paymentMedium",
      header: "Meio de Pagamento",
      size: 220,
      cell: ({ row }) => pickField(row.original, ["paymentMedium", "meioDePagamento"]),
    },
    {
      id: "discount",
      header: "Desconto",
      size: 160,
      cell: ({ row }) => pickField(row.original, ["discount", "desconto"]),
    },
    {
      id: "otherDiscounts",
      header: "Outros Descontos",
      size: 220,
      cell: ({ row }) => pickField(row.original, ["otherDiscounts", "outrosDescontos"]),
    },
    {
      id: "depositInitialInfo",
      header: "Banco e Data do Depósito Inicial / Parcelas",
      size: 360,
      cell: ({ row }) => pickField(row.original, ["bankAndInitialDepositDate", "infoDepositoInicial"]),
    },
    {
      id: "depositData",
      header: "Dados para depósito ou transferência",
      size: 340,
      cell: ({ row }) => pickField(row.original, ["depositData", "dadosDeposito"]),
    },
    {
      id: "whyCourse",
      header: "Motivação para o curso",
      size: 360,
      cell: ({ row }) => pickField(row.original, [
        "whyCourse",
        "porqueCurso",
      ]),
    },
    {
      id: "meditationExperience",
      header: "Experiência em meditação",
      size: 320,
      cell: ({ row }) => pickField(row.original, ["meditationExperience", "experienciaMeditacao"]),
    },
    {
      id: "mindfulnessContact",
      header: "Contato prévio com Mindfulness",
      size: 320,
      cell: ({ row }) => pickField(row.original, ["mindfulnessContact", "contatoMindfulness"]),
    },
    {
      id: "psychotherapy",
      header: "Tratamento psicoterapêutico",
      size: 360,
      cell: ({ row }) => pickField(row.original, ["psychotherapyTreatment", "tratamentoPsicoterapico"]),
    },
    {
      id: "specialNeeds",
      header: "Necessidades ou cuidados especiais",
      size: 340,
      cell: ({ row }) => pickField(row.original, ["specialNeeds", "necessidadeEspecial"]),
    },
    {
      id: "expectations",
      header: "Expectativas em relação ao curso",
      size: 360,
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


