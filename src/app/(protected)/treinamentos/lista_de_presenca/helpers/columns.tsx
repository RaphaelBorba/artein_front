/* eslint-disable @typescript-eslint/no-explicit-any */
import { CalendarDays, Edit, Eye } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { PresenceListI } from "@/types/presenceList";

export const getColumns = (baseRoute: string): ColumnDef<PresenceListI, any>[] => [
        {
        accessorKey: "courseClass",
        header: "Turma",
        size: 150,
        cell: (info) => info.getValue() ? info.getValue().classNumber : ""
    },
    {
        accessorKey: "courseName",
        header: "Curso",
        size: 300,
    },
    {
        accessorKey: "generalRegister",
        header: "Nome do cliente",
        size: 350,
        cell: (info) => info.getValue() ? info.getValue().fullName : ""
    },
        {
        accessorKey: "price",
        header: "Valor",
        size: 200,
        cell: (info) => Number(info.getValue()).toFixed(2)
    },
        {
        accessorKey: "presence",
        header: "Presenças",
        size: 160,
        cell: (info) => (
            <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}`}>
                <button
                    title="Visualizar"
                >
                    <CalendarDays className="text-blue-500" />
                </button>
            </Link>
        )
    },
        {
        accessorKey: "foul",
        header: "Faltas",
        size: 160,
        cell: (info) => (
            <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}`}>
                <button
                    title="Visualizar"
                >
                    <CalendarDays className="text-blue-500" />
                </button>
            </Link>
        )
    },
        {
        accessorKey: "replacement",
        header: "Reposições",
        size: 160,
        cell: (info) => (
            <Link className="flex align-bottom" href={`${baseRoute}/${info.row.original.id}`}>
                <button
                    title="Visualizar"
                >
                    <CalendarDays className="text-blue-500" />
                </button>
            </Link>
        )
    },
    {
        accessorKey: "observations",
        header: "Observações sobre Reposição",
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