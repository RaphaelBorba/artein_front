/* eslint-disable @typescript-eslint/no-explicit-any */
import { Lead as LeadI } from "@/types/lead";
import { Edit, Eye, Trash } from "lucide-react";
import { format } from "@react-input/mask";
import { ColumnDef } from "@tanstack/react-table";
import { masks } from "@/lib/masks";
import Link from "next/link";

const shiftLabels: Record<string, string> = {
  MANHA: "Manhã",
  TARDE: "Tarde",
  NOITE: "Noite",
};

export const getColumns = (baseRoute: string, canEdit = true, canDelete = true, onDelete?: (id: number) => void): ColumnDef<LeadI, any>[] => [
  {
    accessorKey: "id",
    header: "Id",
    size: 80,
  },
  {
    accessorKey: "name",
    header: "Nome",
    size: 250,
  },
  {
    accessorKey: "email",
    header: "Email",
    size: 250,
  },
  {
    accessorKey: "phone",
    header: "Telefone",
    size: 150,
    cell: (info) => {
      const val = info.getValue();
      return typeof val === "string"
        ? format(val, { mask: masks.cellphone, replacement: masks.replacement })
        : val;
    },
  },
  {
    accessorKey: "location",
    header: "Local que Mora",
    size: 200,
  },
  {
    accessorKey: "shift",
    header: "Turno Disponível",
    size: 150,
    cell: (info) => {
      const val = info.getValue() as string | null;
      return val ? shiftLabels[val] : "";
    },
  },
  {
    accessorKey: "courses",
    header: "O que se Interessou",
    size: 300,
    cell: (info) => info.row.original.courses?.map((c) => c.name).join(", "),
  },
  {
    accessorKey: "observations",
    header: "Observação",
    size: 350,
  },
  {
    id: "actions",
    header: "Ações",
    meta: {
      style: {
        textAlign: "center",
      },
    },
    cell: (info) => (
      <div className="flex justify-center gap-2">
        <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}`}>
          <button title="Visualizar">
            <Eye className="text-blue-500" />
          </button>
        </Link>
        {canEdit && <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}/edit`}>
          <button title="Editar">
            <Edit className="text-green-500" />
          </button>
        </Link>}
        {canDelete &&
          <button
            onClick={() => onDelete?.(info.row.original.id)}
            title="Deletar"
          >
            <Trash className="text-red-500" />
          </button>
        }
      </div>
    ),
  },
];
