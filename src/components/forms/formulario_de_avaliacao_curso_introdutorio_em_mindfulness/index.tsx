import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import FormBuilder, { FieldConfig } from "@/components/self/FormBuilder";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { COMMON_LABELS, QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS, SATISFACTION_LEVEL_OPTIONS, YES_NO_NULL_OPTIONS } from "@/constants/forms";
import type { FormularioDeAvaliacaoCursoIntrodutorioMindfulnessFormSchemaType } from "@/schemas/forms/formulario_de_avaliacao_curso_introdutorio_em_mindfulness";

interface FormFieldsProps {
  form: UseFormReturn<FormularioDeAvaliacaoCursoIntrodutorioMindfulnessFormSchemaType>;
  readOnly?: boolean;
  mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
  const fields: FieldConfig<FormularioDeAvaliacaoCursoIntrodutorioMindfulnessFormSchemaType>[] = [
    { type: "input", name: "fullName", label: COMMON_LABELS.fullName, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
    { type: "date", name: "birthDate", label: COMMON_LABELS.birthDate },
    { type: "select", name: "satisfactionLevel", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.satisfactionLevel, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: SATISFACTION_LEVEL_OPTIONS },
    { type: "textarea", name: "likedMostAndHighlights", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.likedMostAndHighlights, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "likedLeastSuggestions", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.likedLeastSuggestions, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "personalChange", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.personalChange, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "selfDifference", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.selfDifference, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "knowledgeMomentsImportance", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.knowledgeMomentsImportance, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "tellAFriend", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.tellAFriend, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "textarea", name: "benefits", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.benefits, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    { type: "select", name: "authorizeUse", label: QUESTIONS_FORMULARIO_DE_AVALIACAO_CURSO_INTRODUTORIO_EM_MINDFULLNESS.authorizeUse, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
  ];

  return (
    <>
      <FormBuilder form={form} fields={fields} readOnly={readOnly} />
      <div className={`col-span-1 flex sm:col-span-2 lg:col-span-3 ${mode === "view" ? "justify-between" : "justify-end"}`}>
        {mode === "view" && (
          <Link href={`/fichas/formulario_de_avaliacao_curso_introdutorio_em_mindfulness`}>
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


