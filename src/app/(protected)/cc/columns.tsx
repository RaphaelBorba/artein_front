/* eslint-disable @typescript-eslint/no-explicit-any */
import { GeneralRegister as GeneralRegisterI } from "@/types/generalRegister";
import { Edit, Eye, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { format } from "@react-input/mask";
import { ColumnDef } from "@tanstack/react-table";
import { masks } from "@/lib/masks";
import Link from "next/link";

export const columns: ColumnDef<GeneralRegisterI, any>[] = [
    {
      accessorKey: "id",
      header: "Id do Cadastro",
      size: 150,
    },
    {
      accessorKey: "photo",
      header: "Foto",
      size: 150,
  
    },
    {
      accessorKey: "fullName",
      header: "Nome Completo",
      size: 350,
    },
    {
      accessorKey: "personType",
      header: "Tipo Pessoa",
      size: 150,
      cell: (info) =>
        info.getValue() === "Pessoa Física" ? "Pessoa Física" : info.getValue() === "Pessoa Jurídica" ? "Pessoa Jurídica" : '',
    },
    {
      accessorKey: "birthDate",
      header: "Data de Nascimento",
      size: 160,
      cell: (info) => {
        const val = info.getValue();
        return typeof val === "string" ? formatDate(val) : val;
      },
    },
    {
      accessorKey: "age",
      header: "Idade",
      size: 80,
    },
    {
      accessorKey: "placeOfBirth",
      header: "Nacionalidade",
      size: 150,
    },
    {
      accessorKey: "nationality",
      header: "Naturalidade",
      size: 150,
    },
    {
      accessorKey: "maritalStatusId",
      header: "Estado Civil",
      size: 150,
      cell: (info) => info.row.original.maritalStatus?.name,
    },
    {
      accessorKey: "cpf",
      header: "CPF",
      size: 140,
      cell: (info) => {
        const val = info.getValue();
        return typeof val === "string"
          ? format(val, { mask: masks.cpf, replacement: masks.replacement })
          : val;
      },
    },
    {
      accessorKey: "cnpj",
      header: "CNPJ",
      size: 180,
      cell: (info) => {
        const val = info.getValue();
        return typeof val === "string"
          ? format(val, { mask: masks.cnpj, replacement: masks.replacement })
          : val;
      },
    },
    {
      accessorKey: "companyName",
      header: "Razão Social",
      size: 350,
    },
    {
      accessorKey: "educationLevelId",
      header: "Escolaridade",
      size: 250,
      cell: (info) => info.row.original.educationLevel?.name,
    },
    {
      accessorKey: "profession",
      header: "Profissão",
      size: 150,
    },
    {
      accessorKey: "workplace",
      header: "Local de Trabalho",
      size: 200,
    },
    {
      accessorKey: "currentJob",
      header: "Ocupação Atual",
      size: 200,
    },
    {
      accessorKey: "phoneNumber",
      header: "Celular",
      size: 150,
      cell: (info) => {
        const val = info.getValue();
        return typeof val === "string"
          ? format(val, { mask: masks.cellphone, replacement: masks.replacement })
          : val;
      },
    },
    {
      accessorKey: "email",
      header: "Email",
      size: 300,
    },
    {
      accessorKey: "firstContactDate",
      header: "Data 1º Contato",
      size: 150,
      cell: (info) => {
        const val = info.getValue();
        return typeof val === "string" ? formatDate(val) : val;
      },
    },
    {
      accessorKey: "cep",
      header: "CEP",
      size: 100,
      cell: (info) => {
        const val = info.getValue();
        return typeof val === "string"
          ? format(val, { mask: masks.cep, replacement: masks.replacement })
          : val;
      },
    },
    {
      accessorKey: "address",
      header: "Endereço",
      size: 350,
    },
    {
      accessorKey: "complement",
      header: "Complemento",
      size: 250,
    },
    {
      accessorKey: "city",
      header: "Cidade",
      size: 150,
    },
    {
      accessorKey: "neighborhood",
      header: "Bairro",
      size: 150,
    },
    {
      accessorKey: "state",
      header: "Estado",
      size: 150,
    },
    {
      accessorKey: "country",
      header: "País",
      size: 150,
    },
    {
      accessorKey: "countryCode",
      header: "Código do País",
      size: 150,
    },
    {
      accessorKey: "religion",
      header: "Religião",
      size: 150,
    },
    {
      accessorKey: "genderId",
      header: "Sexo",
      size: 150,
      cell: (info) => info.row.original.gender?.name,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 100,
      cell: (info) => (info.getValue() === null ? "" : info.getValue() ? "Ativo" : "Inativo"),
    },
    {
      accessorKey: "isPatient",
      header: "Paciente",
      size: 150,
      cell: (info) => (info.getValue() === null ? "" : info.getValue() ? "Paciente" : "Não-Paciente"),
    },
    {
      accessorKey: "isStudent",
      header: "Aluno",
      size: 150,
      cell: (info) => (info.getValue() === null ? "" : info.getValue() ? "Aluno" : "Não-Aluno"),
    },
    {
      accessorKey: "interestedInCourses",
      header: "Interessados em Cursos",
      size: 200,
      cell: (info) => (info.getValue() === null ? "" : info.getValue() ? "Sim" : "Não"),
    },
    {
      accessorKey: "receiveInfoMethodId",
      header: "Receber Informações Via:",
      size: 200,
      cell: (info) => info.row.original.receiveInfoMethod?.name,
    },
    {
      accessorKey: "additionalInfo",
      header: "Informações Adicionais",
      size: 500,
    },
    {
      accessorKey: "referralSourceId",
      header: "Por Qual Meio Nos Encontrou?",
      size: 230,
      cell: (info) => info.row.original.referralSource?.name,
    },
    {
      accessorKey: "otherReferral",
      header: "Outro",
      size: 250,
    },
    {
      accessorKey: "referredByName",
      header: "Nome da Indicação",
      size: 250,
      // THIS IS HOW YOU CENTER THE TEXT AND THE HEADER
      // meta: {
      //   style: {
      //     textAlign: 'center'
      //   }
      // }
    },
    {
      id: "actions",
      header: "Ações",
      meta: {
        style: {
          textAlign: 'center'
        }
      },
      cell: (info) => (
        <div className="flex justify-center gap-2">
          <Link href={`/cc/cadastro_geral/${info.row.original.id}`}>
            <button onClick={() => console.log('view', info.row.original)} title="Visualizar">
              <Eye className="text-blue-500" />
            </button>
          </Link>
          <Link href={`/cc/cadastro_geral/${info.row.original.id}/edit`}>
            <button onClick={() => console.log('edit', info.row.original)} title="Editar">
              <Edit className="text-green-500" />
            </button>
          </Link>
          <button onClick={() => console.log('delete', info.row.original)} title="Deletar">
            <Trash className="text-red-500" />
          </button>
        </div>
      )
    }
  ];