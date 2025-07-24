import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

import { CourseClassFormSchemaType } from "@/schemas/courseClass/courseClassSchema";
import FormDateArray from "./FormDateArray";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import { masks } from "@/lib/masks";
import { MultiSelect } from "@/components/self/FormSelectMultipleWithLabel";

interface CourseClassesFormFieldsProps {
  form: UseFormReturn<CourseClassFormSchemaType>;
  readOnly?: boolean;
  mode: "create" | "edit" | "view";
  path?: "cadastro_geral" | "pacientes" | "alunos";
}

const CoursesClassesFormFields: FC<CourseClassesFormFieldsProps> = ({
  form,
  readOnly = false,
  mode
}) => {
  return (
    <>

      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Nome do Curso"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />


      <FormField
        control={form.control}
        name="workload"
        render={({ field }) => (
          <FormInputWithLabel
            field={field}
            label="Carga Horária"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="classNumber"
        render={({ field }) => (
          <FormInputWithLabel
            field={field}
            label="Número da Turma"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="location"
        render={({ field }) => (
          <FormSelectWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            labelBold
            isDisabled={readOnly}
            idLabel="personType"
            labelText="Local"
            options={[
              { label: "---", value: "null" },
              { label: "Barra da Tijuca", value: "Barra da Tijuca" },
              { label: "Botafogo", value: "Botafogo" },
              { label: "Copacabana", value: "Copacabana" },
              { label: "Gávea", value: "Gávea" },
              { label: "Ilha do Governador", value: "Ilha do Governador" },
              { label: "Leblon", value: "Leblon" },
              { label: "Online", value: "Online" },
            ]}
          />
        )}
      />

      <FormField
        control={form.control}
        name="address"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Endereço"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormDateArray form={form} readOnly={readOnly} />

      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormDatePicker
            field={field}
            labelText="Data Inicial"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="startTime"
        render={({ field }) => (
          <FormMaskInputWithLabel
            field={field}
            label="Horário de Inicio"
            labelBold
            isDisabled={readOnly}
            mask={masks.hour}
          />
        )}
      />
      <FormField
        control={form.control}
        name="endTime"
        render={({ field }) => (
          <FormMaskInputWithLabel
            field={field}
            label="Horário de Fim"
            labelBold
            isDisabled={readOnly}
            mask={masks.hour}
          />
        )}
      />

      <FormField
        control={form.control}
        name="endDate"
        render={({ field }) => (
          <FormDatePicker
            field={field}
            labelText="Data Final"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="daysOfWeek"
        render={({ field }) => (
          <MultiSelect
            options={[
              { label: "Segunda-Feira", value: "Segunda-Feira" },
              { label: "Terça-Feira", value: "Terça-Feira" },
              { label: "Quarta-Feira", value: "Quarta-Feira" },
              { label: "Quinta-Feira", value: "Quinta-Feira" },
              { label: "Sexta-Feira", value: "Sexta-Feira" },
              { label: "Sábado", value: "Sábado" },
              { label: "Domingo", value: "Domingo" },
            ]}
            onValueChange={field.onChange}
            defaultValue={field.value !== undefined ? field.value : []}
            placeholder="Selecione as Opções"
            labelBold
            labelText="Dias"
            classNameFather="col-span-1 sm:col-span-2 lg:col-span-3"
            disabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="shift"
        render={({ field }) => (
          <FormSelectWithLabel
            field={field}
            labelBold
            isDisabled={readOnly}
            idLabel="shift"
            labelText="Turno"
            options={[
              { label: "---", value: "null" },
              { label: "Manhã", value: "Manhã" },
              { label: "Tarde", value: "Tarde" },
              { label: "Noite", value: "Noite" },
              { label: "Integral", value: "Integral" }
            ]}
          />
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormInputWithLabel
                      className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Valor do Curso"
            labelBold
            isDisabled={readOnly}
            type='number'
          />
        )}
      />

      <div className="col-span-1 flex justify-between sm:col-span-2 lg:col-span-3">
        <Link href={`/treinamentos/turmas`}>
          <Button
            type="submit"
            variant="outline"
            className="flex items-center text-base"><ArrowLeft strokeWidth={4} /> Voltar</Button>
        </Link>
        {mode !== 'view' &&
          <Button
            type="submit"
            variant="default"
            className="flex items-center text-base"><Plus strokeWidth={5} /> {mode === 'create' ? 'Cadastrar' : 'Atualizar'}</Button>
        }
      </div>

    </>
  );
};

export default CoursesClassesFormFields;
