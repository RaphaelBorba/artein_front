/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneralRegister as GeneralRegisterI } from "@/types/generalRegister";
import { CalendarDays, Edit, Eye } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { format } from "@react-input/mask";
import { ColumnDef } from "@tanstack/react-table";
import { masks } from "@/lib/masks";
import Link from "next/link";
import { CourseI } from "@/types/courses";

export const getColumns = (baseRoute: string): ColumnDef<CourseI, any>[] => [
    {
        accessorKey: "name",
        header: "Curso",
        size: 300,
    },
    {
        accessorKey: "workload",
        header: "Carga horária",
        size: 150,
    },
    {
        accessorKey: "classNumber",
        header: "Número da Turma",
        size: 150,
    },
    {
        accessorKey: "location",
        header: "Local",
        size: 250,
    },
    {
        accessorKey: "address",
        header: "Endereço",
        size: 250,
    },
    {
        accessorKey: "sessionDates",
        header: "Datas das Sessões",
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
        accessorKey: "startDate",
        header: "Data Inicial",
        size: 150,
        cell: (info) => info.getValue() ? info.getValue().slice(0, 10).split('-').reverse().join('/') : ""
    },
    {
        accessorKey: "startTime",
        header: "Horário de Inicio",
        size: 150,
    },
    {
        accessorKey: "endTime",
        header: "Horário de Fim",
        size: 150,
    },
    {
        accessorKey: "endDate",
        header: "Data Final",
        cell: (info) => info.getValue() ? info.getValue().slice(0, 10).split('-').reverse().join('/') : ""
    },
    {
        accessorKey: "daysOfWeek",
        header: "Dias",
        size: 200,
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
        accessorKey: "shift",
        header: "Turno",
        size: 150,
    },
    {
        accessorKey: "price",
        header: "Valor do Curso",
        size: 200,
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