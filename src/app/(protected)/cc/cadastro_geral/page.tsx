/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import { useToast } from "@/hooks/use-toast";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CommunicationMethod } from "@/types/smallModels";
import { GeneralRegister as GeneralRegisterI } from "@/types/generalRegister";
import { DataTable } from "@/components/self/DataTable";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { formatDate, parseBoolean, parseField, parseNullableNumber } from "@/lib/utils";
import { format } from "@react-input/mask";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import axios from "axios";
import { masks } from "@/lib/masks";
import { IDataTableResposne, IPagination } from "@/types/dataTableResponse";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalRegisterFilterSchema, GeneralRegisterFilterSchemaType } from "@/schemas/generalRegister/generalRegisterFilterSchema";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";


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
      info.getValue() === "pf" ? "Pessoa Física" : "Pessoa Jurídica",
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
    cell: ({ row }) => (
      <div className="flex justify-center gap-2">
        <button onClick={() => console.log('view', row)} title="View">
          <Eye className="text-blue-500" />
        </button>
        <button onClick={() => console.log('edit', row)} title="Edit">
          <Edit className="text-green-500" />
        </button>
        <button onClick={() => console.log('delete', row)} title="Delete">
          <Trash className="text-red-500" />
        </button>
      </div>
    )
  }
];


export default function GeneralRegister() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [registers, setRegisters] = useState<GeneralRegisterI[]>([]);
  const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([]);
  const [valuesChanged, setValuesChanged] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    totalPages: 10,
    totalCount: 100,
    hasNextPage: true,
    hasPreviousPage: true,
  })

  const form = useForm<GeneralRegisterFilterSchemaType>({
    resolver: zodResolver(generalRegisterFilterSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      cnpj: "",
      phoneNumber: "",
      interestedInCourses: "null",
      receiveInfoMethodId: "null",
    },
  })

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [generalRes, communicationRes] = await Promise.all([
          api.get<IDataTableResposne<GeneralRegisterI[]>>("/general-register", {
            params: {
              'name': form.getValues('fullName') || undefined,
              'cpf': parseField(form.getValues('cpf'), masks.cpf),
              'cnpj': parseField(form.getValues('cnpj'), masks.cnpj),
              'phoneNumber': parseField(form.getValues('phoneNumber'), masks.cellphone),
              'interestedInCourses': parseBoolean(form.getValues('interestedInCourses')),
              'receiveInfoMethodId': parseNullableNumber(form.getValues('receiveInfoMethodId')),
              'page': pagination.page,
              'limit': pagination.pageSize
            }
          }),
          api.get<CommunicationMethod[]>("/general-register/communication-method"),
        ]);
        setRegisters(generalRes.data.records);
        setCommunicationMethod(communicationRes.data);
        setPagination(generalRes.data.pagination)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status !== 401) {
            toast({
              title: "Erro",
              description: JSON.stringify(error?.response?.data),
            });
          }
        } else {
          console.log(error)
          toast({
            title: "Erro",
            description: JSON.stringify(error),
          });
        }

      } finally {
        toggleLoader(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleLoader, toast, valuesChanged, pagination.page, pagination.pageSize]);

  const cleanInputs = () => {
    form.reset()
  }

  const onSubmit = () => {
    setValuesChanged(!valuesChanged)
  }

  return (
    <Section title="Cadastro Geral">
      <div className="space-y-8">
        {/* Grid for the four standard inputs */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-4">

            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormInputWithLabel
                  field={field}
                  label="Nome Completo"
                  labelBold
                />
              )}
            />
            <FormField
              control={form.control}
              name="cpf"
              render={({ field }) => (
                <FormMaskInputWithLabel
                  field={field}
                  label="CPF"
                  labelBold
                  mask={masks.cpf}
                />
              )}
            />
            <FormField
              control={form.control}
              name="cnpj"
              render={({ field }) => (
                <FormMaskInputWithLabel
                  field={field}
                  label="CNPJ"
                  labelBold
                  mask={masks.cnpj}
                />
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormMaskInputWithLabel
                  field={field}
                  label="Celular"
                  labelBold
                  mask={masks.cellphone}
                />
              )}
            />

            <FormField
              control={form.control}
              name="interestedInCourses"
              render={({ field }) => (
                <FormSelectWithLabel
                  field={field}
                  labelText="Interessado em Cursos"
                  labelBold
                  idLabel=""
                  options={[
                    { value: 'null', label: "---" },
                    { value: "1", label: "Interessado" },
                    { value: "0", label: "Desinteressado" },
                  ]}
                />
              )}
            />
            <FormField
              control={form.control}
              name="receiveInfoMethodId"
              render={({ field }) => (
                <FormSelectWithLabel
                  field={field}
                  labelText="Receber Informações Via"
                  labelBold
                  idLabel=""
                  options={[
                    { value: 'null', label: "---" },
                    ...communicationMethod
                  ]}
                />
              )}
            />
            <Button
              type="submit"
              className="bg-[#00c0ef] hover:bg-[#5bc0de]"
            >
              Pesquisar
            </Button>
            <Button
              type="reset"
              onClick={cleanInputs}
              variant="outline"
            >
              Limpar
            </Button>

          </form>
        </Form>
      </div>
      <div className="overflow-x-auto">
        <DataTable<GeneralRegisterI, unknown>
          data={registers}
          columns={columns}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <div className="flex w-full justify-end">
        <Button
          onClick={() => router.push('cadastro_geral/create')}
          type="button"
          variant="outline"
          className="flex items-center justify-between text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
      </div>
    </Section>
  );
}
