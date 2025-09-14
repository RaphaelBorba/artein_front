import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import FormBuilder, { FieldConfig } from "@/components/self/FormBuilder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_DE_AVA, SATISFACTION_LEVEL_OPTIONS, YES_NO_NULL_OPTIONS, FORMULARIO_DE_AVA_PREFERRED_MEDIA_OPTIONS } from "@/constants/forms";
import type { FormularioDeAvaFormSchemaType } from "@/schemas/forms/formulario_de_ava";

interface FormFieldsProps {
  form: UseFormReturn<FormularioDeAvaFormSchemaType>;
  readOnly?: boolean;
  mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
  const fields: FieldConfig<FormularioDeAvaFormSchemaType>[] = [
    { type: "input", name: "fullName", label: COMMON_LABELS.fullName, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
    { type: "date", name: "birthDate", label: COMMON_LABELS.birthDate },
    { type: "select", name: "satisfactionLevel", label: QUESTIONS_FORMULARIO_DE_AVA.satisfactionLevel, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: SATISFACTION_LEVEL_OPTIONS },
    { type: "textarea", name: "likedMostAndHighlights", label: QUESTIONS_FORMULARIO_DE_AVA.likedMostAndHighlights, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "likedLeastDiscomfort", label: QUESTIONS_FORMULARIO_DE_AVA.likedLeastDiscomfort, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "personalChange", label: QUESTIONS_FORMULARIO_DE_AVA.personalChange, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "takeHomeCare", label: QUESTIONS_FORMULARIO_DE_AVA.takeHomeCare, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "tellAFriend", label: QUESTIONS_FORMULARIO_DE_AVA.tellAFriend, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "praiseOrComplaint", label: QUESTIONS_FORMULARIO_DE_AVA.praiseOrComplaint, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "improvementSuggestions", label: QUESTIONS_FORMULARIO_DE_AVA.improvementSuggestions, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "nextTopics", label: QUESTIONS_FORMULARIO_DE_AVA.nextTopics, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "select", name: "wantsInfo", label: QUESTIONS_FORMULARIO_DE_AVA.wantsInfo, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
    { type: "select", name: "preferredMedia", label: QUESTIONS_FORMULARIO_DE_AVA.preferredMedia, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: FORMULARIO_DE_AVA_PREFERRED_MEDIA_OPTIONS },
    { type: "select", name: "authorizeUse", label: QUESTIONS_FORMULARIO_DE_AVA.authorizeUse, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
  ];

  return (
    <>
      <FormBuilder form={form} fields={fields} readOnly={readOnly} />
      <div className={`col-span-1 flex sm:col-span-2 lg:col-span-3 ${mode === "view" ? "justify-between" : "justify-end"}`}>
        {mode === "view" && (
          <Link href={`/fichas/formulario_de_ava`}>
            <Button type="submit" variant="outline" className="flex items-center text-base"><ArrowLeft strokeWidth={4} /> Voltar</Button>
          </Link>
        )}
        {mode !== 'view' && (
          <Button type="submit" variant="default" className="flex items-center text-base"><Plus strokeWidth={5} /> {mode === 'create' ? 'Cadastrar' : 'Atualizar'}</Button>
        )}
      </div>
    </>
  );
};

export default FormFields;


