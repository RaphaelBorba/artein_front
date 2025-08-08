import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { PresenceListSchemaType } from "@/schemas/presenceList/presenceListSchema";
import FormSelectWithFilter from "@/components/self/FormSelectWithFilter";
import { Option } from "@/types/smallModels";
import FormPresence from "./FormPresence";
import FormFoul from "./FormFoul";
import FormReplacement from "./FormReplacement";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";

interface PresenceListFormFieldsProps {
  form: UseFormReturn<PresenceListSchemaType>;
  readOnly?: boolean;
  mode: "create" | "edit" | "view";
  courseClasses: Option[];
  generalRegisters: Option[]
}

const PresenceListFormFields: FC<PresenceListFormFieldsProps> = ({
  form,
  readOnly = false,
  mode,
  generalRegisters,
  courseClasses
}) => {
  return (
    <>

      <FormField
        control={form.control}
        name="courseClassId"
        render={({ field }) => (
          <FormSelectWithFilter
            field={field}
            labelBold
            idLabel="courseClassId"
            labelText="Turma"
            options={courseClasses}
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="courseName"
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
        name="generalRegisterId"
        render={({ field }) => (
          <FormSelectWithFilter
            field={field}
            labelBold
            idLabel="generalRegisterId"
            labelText="Cliente"
            options={generalRegisters}
            isDisabled={readOnly}
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


      <FormPresence form={form} readOnly={readOnly} />

      <FormFoul form={form} readOnly={readOnly} />

      <FormReplacement form={form} readOnly={readOnly} />

      <FormField
        control={form.control}
        name="observations"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Observações Sobre Reposição de Sessões:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <div className="col-span-1 flex justify-between sm:col-span-2 lg:col-span-3">
        <Link href={`/treinamentos/lista_de_presenca`}>
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

export default PresenceListFormFields;
