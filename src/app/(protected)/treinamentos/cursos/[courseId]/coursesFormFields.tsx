import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";

import { CourseFormSchemaType } from "@/schemas/courses/coursesSchema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";

interface CoursesFormFieldsProps {
  form: UseFormReturn<CourseFormSchemaType>;
  readOnly?: boolean;
  mode: "create" | "edit" | "view";
  path?: "cadastro_geral" | "pacientes" | "alunos";
}

const CoursesFormFields: FC<CoursesFormFieldsProps> = ({
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
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Nome do Curso"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Informações Gerais Sobre o Curso"
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
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Carga Horária"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="price"
        render={({ field }) => (
          <FormInputWithLabel
            field={field}
            label="Valor do Curso"
            labelBold
            isDisabled={readOnly}
            type='number'
          />
        )}
      />

      <div className="col-span-1 flex justify-between sm:col-span-2 lg:col-span-3">
        <Link href={`/treinamentos/cursos`}>
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

export default CoursesFormFields;
