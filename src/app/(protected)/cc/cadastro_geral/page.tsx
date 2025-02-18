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

export default function Studants() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [registers, setRegisters] = useState<any[]>([]);
  const [communicationMethod, setCommunicationMethod] = useState<any[]>([]);

  // Set initial state with default non-empty string for select fields
  const { values, handleChange, setValue, setValues } = useFormHandler({
    registerName: "",
    cpf: "",
    cnpj: "",
    cellphone: "",
    interessed: defaultOptionValue,
    infoThrow: defaultOptionValue,
  });

  console.log(registers)

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [generalRes, communicationRes] = await Promise.all([
          api.get("/general-register"),
          api.get("/general-register/communication-method"),
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

  // Helper function to handle select changes.
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
      <form>
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
      </form>
    </Section>
  );
}
