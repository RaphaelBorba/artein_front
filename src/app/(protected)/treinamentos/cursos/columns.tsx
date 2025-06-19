/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneralRegister as GeneralRegisterI } from "@/types/generalRegister";
import { Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { format } from "@react-input/mask";
import { ColumnDef } from "@tanstack/react-table";
import { masks } from "@/lib/masks";
import Link from "next/link";
import { CourseI } from "@/types/courses";

// Create a function that accepts the base route as a parameter
//  "id": 2,
//             "name": "NestJS + Prisma",
//             "description": "Build a CRUD API",
//             "workload": "12h",
//             "price": "199.9"
export const getColumns = (baseRoute: string): ColumnDef<CourseI, any>[] => [
    {
        accessorKey: "id",
        header: "Id do Curso",
        size: 130,
    },
    {
        accessorKey: "name",
        header: "Nome do Curso",
        size: 300,
    },
    {
        accessorKey: "description",
        header: "Informações Gerais Sobre o Curso",
        size: 560,
    },
    {
        accessorKey: "workload",
        header: "Carga Horária",
        size: 180,
    },
    {
        accessorKey: "price",
        header: "Valor do Curso",
        size: 350,
        cell: (info) => Number(info.getValue()).toFixed(2)
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
                    <button
                        title="Visualizar"
                    >
                        <Eye className="text-blue-500" />
                    </button>
                </Link>
                <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}/edit`}>
                    <button
                        title="Editar"
                    >
                        <Edit className="text-green-500" />
                    </button>
                </Link>
            </div>
        ),
    },
];
