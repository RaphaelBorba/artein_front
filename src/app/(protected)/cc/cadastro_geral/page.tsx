/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import InputWithLabel from "@/components/self/InputWithLabel";
import MaskInputWithLabel from "@/components/self/MaskInputWithLabel";
import SelectWithLabel from "@/components/self/SelectWithLabel";
import { useToast } from "@/hooks/use-toast";
import { useFormHandler } from "@/hooks/useFormHandle";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CommunicationMethod } from "@/types/smallModels";
import { GeneralRegister as GeneralRegisterI } from "@/types/generalRegister";
import { DataTable } from "@/components/self/DataTable";
import { Edit, Eye, Plus, Trash } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { format } from "@react-input/mask";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";
import axios from "axios";

const defaultOptionValue = "default";

const interessedOptions = [
  {
    value: defaultOptionValue,
    label: "---",
  },
  {
    value: "1",
    label: "Interessado",
  },
  {
    value: "2",
    label: "Desinteressado",
  },
];

const masks = {
  cpf: "___.___.___-__",
  cnpj: "__.___.___/____-__",
  cellphone: "(__) _____-____",
  cep: "_____-___"
}


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
        ? format(val, { mask: masks.cpf, replacement: { _: /\d/ } })
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
        ? format(val, { mask: masks.cnpj, replacement: { _: /\d/ } })
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
        ? format(val, { mask: masks.cellphone, replacement: { _: /\d/ } })
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
        ? format(val, { mask: masks.cep, replacement: { _: /\d/ } })
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
    cell: (info) => (info.getValue() ? "Ativo" : "Inativo"),
  },
  {
    accessorKey: "isPatient",
    header: "Paciente",
    size: 150,
    cell: (info) => (info.getValue() ? "Paciente" : "Não-Paciente"),
  },
  {
    accessorKey: "isStudent",
    header: "Aluno",
    size: 150,
    cell: (info) => (info.getValue() ? "Aluno" : "Não-Aluno"),
  },
  {
    accessorKey: "interestedInCourses",
    header: "Interessados em Cursos",
    size: 200,
    cell: (info) => (info.getValue() ? "Sim" : "Não"),
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

  const router = useRouter();

  // Set initial state with default non-empty string for select fields
  const { values, handleChange, setValue, setValues } = useFormHandler({
    registerName: "",
    cpf: "",
    cnpj: "",
    cellphone: "",
    interessed: defaultOptionValue,
    infoThrow: defaultOptionValue,
  });


  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [generalRes, communicationRes] = await Promise.all([
          api.get<GeneralRegisterI[]>("/general-register", {
            params: {
              'name': values.registerName || undefined,
              'cpf': values.cpf || undefined,
              'cnpj': values.cnpj || undefined,
              'phoneNumber': values.cellphone || undefined,
              'interestedInCourses': values.interessed === '1' ? true : values.interessed === '2' ? false : undefined,
              'receiveInfoMethodId': values.infoThrow !== 'default' ? values.infoThrow : undefined,
            }
          }),
          api.get<CommunicationMethod[]>("/general-register/communication-method"),
        ]);
        setRegisters(generalRes.data);
        setCommunicationMethod(communicationRes.data);
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
  }, [toggleLoader, toast, valuesChanged]);

  const handleSelectChange = (field: "interessed" | "infoThrow") => (value: string) => {
    setValue(field, value);
  };

  const cleanInputs = () => {
    setValues({
      registerName: "",
      cpf: "",
      cnpj: "",
      cellphone: "",
      interessed: defaultOptionValue,
      infoThrow: defaultOptionValue,
    })
  }

  return (
    <Section title="Cadastro Geral">
      <div className="space-y-8">
        {/* Grid for the four standard inputs */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
          <InputWithLabel
            idLabel="registerName"
            labelText="Nome Completo"
            onChange={handleChange("registerName")}
            value={values.registerName}
          />
          <MaskInputWithLabel
            value={values.cpf}
            labelText="CPF"
            idLabel="cpf"
            onChange={handleChange("cpf", masks.cpf)}
            mask={masks.cpf}
          />
          <MaskInputWithLabel
            value={values.cnpj}
            labelText="CNPJ"
            idLabel="cnpj"
            onChange={handleChange("cnpj", masks.cnpj)}
            mask={masks.cnpj}
          />
          <MaskInputWithLabel
            value={values.cellphone}
            labelText="Celular"
            idLabel="cellphone"
            onChange={handleChange("cellphone", masks.cellphone)}
            mask={masks.cellphone}
          />
        </div>

        {/* Grid for the two select inputs */}
        <div className="grid grid-cols-1 items-end gap-4 sm:grid-cols-4">
          <SelectWithLabel
            idLabel="interessed"
            labelText="Interessados em Cursos"
            onValueChange={handleSelectChange("interessed")}
            options={interessedOptions}
            placeholder="Selecione um registro"
            value={values.interessed}
          />
          <SelectWithLabel
            idLabel="infoThrow"
            labelText="Receber Informações Via:"
            onValueChange={handleSelectChange("infoThrow")}
            options={[
              { value: defaultOptionValue, label: "---" },
              ...communicationMethod.map((cm: any) => ({
                value: String(cm.id),
                label: cm.name,
              })),
            ]}
            placeholder="Selecione um método"
            value={values.infoThrow}
          />
          <Button
            type="button"
            onClick={() => setValuesChanged(!valuesChanged)}
            className="bg-[#00c0ef] hover:bg-[#5bc0de]"
          >
            Pesquisar
          </Button>
          <Button
            type="button"
            onClick={cleanInputs}
            variant="outline"
          >
            Limpar
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable<GeneralRegisterI, unknown>
          data={registers}
          columns={columns}
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
