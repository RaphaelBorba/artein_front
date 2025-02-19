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
import { Delete, Edit, Eye } from "lucide-react";

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

const columns: Column<GeneralRegisterI>[] = [
  { header: "Id do Cadastro", accessor: "id" },
  { header: "Foto", accessor: "photo" },
  { header: "Nome Completo", accessor: "fullName" },
  { header: "Tipo Pessoa", accessor: "personType" },
  { header: "Data de Nascimento", accessor: "birthDate" },
  { header: "Nacionalidade", accessor: "placeOfBirth" },
  { header: "Naturalidade", accessor: "nationality" },
  { header: "Estado Civil", accessor: "maritalStatus" },
  { header: "CPF", accessor: "cpf" },
  { header: "CNPJ", accessor: "cnpj" },
  { header: "Razão Social", accessor: "companyName" },
  { header: "Escolaridade", accessor: "educationLevel" },
  { header: "Profissão", accessor: "profession" },
  { header: "Local de Trabalho", accessor: "workplace" },
  { header: "Ocupação Atual", accessor: "currentJob" },
  { header: "Celular", accessor: "phoneNumber" },
  { header: "Email", accessor: "email" },
  { header: "Data 1º Contato", accessor: "firstContactDate" },
  { header: "CEP", accessor: "cep" },
  { header: "Endereço", accessor: "address" },
  { header: "Complemento", accessor: "complement" },
  { header: "Cidade", accessor: "city" },
  { header: "Bairro", accessor: "neighborhood" },
  { header: "Estado", accessor: "state" },
  { header: "País", accessor: "country" },
  { header: "Código do País", accessor: "countryCode" },
  { header: "Religião", accessor: "religion" },
  { header: "Sexo", accessor: "gender" },
  { header: "Status", accessor: "status" },
  { header: "Paciente", accessor: "isPatient" },
  { header: "Aluno", accessor: "isStudent" },
  { header: "Interessados em Cursos", accessor: "interestedInCourses" },
  { header: "Receber Informações Via:", accessor: "receiveInfoMethod" },
  { header: "Informações Adicionais", accessor: "additionalInfo" },
  { header: "Por Qual Meio Nos Encontrou?", accessor: "referralSource" },
  { header: "Outro", accessor: "otherReferral" },
  { header: "Nome da Indicação", accessor: "referredByName" },
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
            onChange={handleChange("cpf", "___.___.___-__")}
            mask="___.___.___-__"
          />
          <MaskInputWithLabel
            value={values.cnpj}
            labelText="CNPJ"
            idLabel="cnpj"
            onChange={handleChange("cnpj", "__.___.___/____-__")}
            mask="__.___.___/____-__"
          />
          <MaskInputWithLabel
            value={values.cellphone}
            labelText="Celular"
            idLabel="cellphone"
            onChange={handleChange("cellphone", "(__) _____-____")}
            mask="(__) _____-____"
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
      <div>
        <DataTable<GeneralRegisterI>
          data={registers}
          columns={columns}
          caption="A list of your recent invoices."
          actions={(row) => (
            <div className="flex gap-2">
              <button onClick={() => console.log('view')} title="View">
                <Eye className="text-blue-500" />
              </button>
              <button onClick={() => console.log('edit')} title="Edit">
                <Edit className="text-green-500" />
              </button>
              <button onClick={() => console.log('delete')} title="Delete">
                <Delete className="text-red-500" />
              </button>
            </div>
          )}
          footer={`Total: ${registers.length}`}
        />
      </div>
    </Section>
  );
}
