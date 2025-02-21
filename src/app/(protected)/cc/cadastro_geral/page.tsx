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
import { Column, DataTable } from "@/components/self/DataTable";
import { Edit, Eye, Trash } from "lucide-react";
import { calculateAge, formatDate } from "@/lib/utils";
import { format } from "@react-input/mask";

// Use a default value that's not an empty string
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

const columns: Column<GeneralRegisterI>[] = [
  {
    header: "Id do Cadastro",
    accessor: "id",
    minWidth: '150px'
  },
  {
    header: "Foto",
    accessor: "photo",
    minWidth: '50px', maxWidth: "250px"
  },
  {
    header: "Nome Completo",
    accessor: "fullName",
    minWidth: '350px'
  },
  {
    header: "Tipo Pessoa",
    accessor: "personType",
    minWidth: '150px',
    render: (text) => (text === 'pf' ? 'Pessoa Física' : 'Pessoa Jurídica')
  },
  {
    header: "Data de Nascimento",
    accessor: "birthDate",
    minWidth: '160px',
    render: (text) => ((typeof text === "string") ? formatDate(text) : text)
  },
  {
    header: "Idade",
    accessor: "birthDate",
    minWidth: '80px',
    render: (text) => ((typeof text === "string") ? calculateAge(text) : text)
  },
  {
    header: "Nacionalidade",
    accessor: "placeOfBirth",
    minWidth: '150px'
  },
  {
    header: "Naturalidade",
    accessor: "nationality",
    minWidth: '150px'
  },
  {
    header: "Estado Civil",
    accessor: "maritalStatusId",
    minWidth: '50px',
    render: (text, record) => record.maritalStatus?.name
  },
  {
    header: "CPF",
    accessor: "cpf",
    minWidth: '140px',
    render: (text) => typeof text === "string" && format(text, { mask: masks.cpf, replacement: { _: /\d/ } })
  },
  {
    header: "CNPJ",
    accessor: "cnpj",
    minWidth: '180px',
    render: (text) => typeof text === "string" && format(text, { mask: masks.cnpj, replacement: { _: /\d/ } })
  },
  {
    header: "Razão Social",
    accessor: "companyName",
    minWidth: '350px'
  },
  {
    header: "Escolaridade",
    accessor: "educationLevelId",
    minWidth: '250px',
    render: (text, record) => record.educationLevel?.name
  },
  {
    header: "Profissão",
    accessor: "profession",
    minWidth: '150px'
  },
  {
    header: "Local de Trabalho",
    accessor: "workplace",
    minWidth: '200px'
  },
  {
    header: "Ocupação Atual",
    accessor: "currentJob",
    minWidth: '200px'
  },
  {
    header: "Celular",
    accessor: "phoneNumber",
    minWidth: '150px',
    render: (text) => typeof text === "string" && format(text, { mask: masks.cellphone, replacement: { _: /\d/ } })
  },
  {
    header: "Email",
    accessor: "email",
    minWidth: '300px'
  },
  {
    header: "Data 1º Contato",
    accessor: "firstContactDate",
    minWidth: '150px',
    render: (text) => ((typeof text === "string") ? formatDate(text) : text)
  },
  {
    header: "CEP",
    accessor: "cep",
    minWidth: '100px',
    render: (text) => typeof text === "string" && format(text, { mask: masks.cep, replacement: { _: /\d/ } })
  },
  {
    header: "Endereço",
    accessor: "address",
    minWidth: '350px'
  },
  {
    header: "Complemento",
    accessor: "complement",
    minWidth: '250px'
  },
  {
    header: "Cidade",
    accessor: "city",
    minWidth: '150px'
  },
  {
    header: "Bairro",
    accessor: "neighborhood",
    minWidth: '150px'
  },
  {
    header: "Estado",
    accessor: "state",
    minWidth: '150px'
  },
  {
    header: "País",
    accessor: "country",
    minWidth: '150px'
  },
  {
    header: "Código do País",
    accessor: "countryCode",
    minWidth: '150px'
  },
  {
    header: "Religião",
    accessor: "religion",
    minWidth: '150px'
  },
  {
    header: "Sexo",
    accessor: "genderId",
    minWidth: '150px',
    render: (text, record) => record.gender?.name
  },
  {
    header: "Status",
    accessor: "status",
    minWidth: '100px',
    render: (text) => (text ? 'Ativo' : "Inativo")
  },
  {
    header: "Paciente",
    accessor: "isPatient",
    minWidth: '150px',
    render: (text) => (text ? 'Paciente' : "Não-Paciente")
  },
  {
    header: "Aluno",
    accessor: "isStudent",
    minWidth: '150px',
    render: (text) => (text ? 'Aluno' : "Não-Aluno")
  },
  {
    header: "Interessados em Cursos",
    accessor: "interestedInCourses",
    minWidth: '200px',
    render: (text) => (text ? 'Sim' : "Não")
  },
  {
    header: "Receber Informações Via:",
    accessor: "receiveInfoMethodId",
    minWidth: '200px',
    render: (text, record) => record.receiveInfoMethod?.name
  },
  {
    header: "Informações Adicionais",
    accessor: "additionalInfo",
    minWidth: '500px'
  },
  {
    header: "Por Qual Meio Nos Encontrou?",
    accessor: "referralSourceId",
    minWidth: '230px',
    render: (text, record) => record.referralSource?.name
  },
  {
    header: "Outro",
    accessor: "otherReferral",
    minWidth: '250px'
  },
  {
    header: "Nome da Indicação",
    accessor: "referredByName",
    minWidth: '250px'
  },
  // { header: "", accessor: "" },
];

export default function GeneralRegister() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [registers, setRegisters] = useState<GeneralRegisterI[]>([]);
  const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([]);

  // Set initial state with default non-empty string for select fields
  const { values, handleChange, setValue, setValues } = useFormHandler({
    registerName: "",
    cpf: "",
    cnpj: "",
    cellphone: "",
    interessed: defaultOptionValue,
    infoThrow: defaultOptionValue,
  });

  console.log(registers, communicationMethod)

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [generalRes, communicationRes] = await Promise.all([
          api.get<GeneralRegisterI[]>("/general-register"),
          api.get<CommunicationMethod[]>("/general-register/communication-method"),
        ]);
        setRegisters(generalRes.data);
        setCommunicationMethod(communicationRes.data);
      } catch (error) {
        console.log(error)
        toast({
          title: "Erro",
          description: JSON.stringify(error),
        });
      } finally {
        toggleLoader(false);
      }
    };

    fetchData();
  }, [toggleLoader, toast]);

  const handleSelectChange = (field: "interessed" | "infoThrow") => (value: string) => {
    setValue(field, value);
  };
  console.log(values)

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
          <Button type="button" onClick={() => console.log("Pesquisar")} className="bg-[#00c0ef] hover:bg-[#5bc0de]">Pesquisar</Button>
          <Button type="button" onClick={cleanInputs} variant="outline">Limpar</Button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <DataTable<GeneralRegisterI>
          data={registers}
          columns={columns}
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => console.log('view', row)} title="View">
                <Eye className="text-blue-500" />
              </button>
              <button onClick={() => console.log('edit')} title="Edit">
                <Edit className="text-green-500" />
              </button>
              <button onClick={() => console.log('delete')} title="Delete">
                <Trash className="text-red-500" />
              </button>
            </div>
          )}
          footer={`Total: ${registers.length}`}
        />
      </div>
    </Section>
  );
}
