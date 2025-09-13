import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import FormBuilder, { FieldConfig } from "@/components/self/FormBuilder";
import { masks } from "@/lib/masks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { YES_NO_NULL_OPTIONS, COMMON_LABELS, QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS } from "@/constants/forms";
import type { FormularioDeInscricaoEmEventosFormSchemaType } from "@/schemas/forms/formulario_de_inscricao_em_eventos";

interface FormFieldsProps {
    form: UseFormReturn<FormularioDeInscricaoEmEventosFormSchemaType>;
    readOnly?: boolean;
    mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
    const baseFields: FieldConfig<FormularioDeInscricaoEmEventosFormSchemaType>[] = [
        { type: "input", name: "eventName", label: "Evento", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "input", name: "fullName", label: COMMON_LABELS.fullName, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
        { type: "mask", name: "phone", label: COMMON_LABELS.phone, className: "col-span-1", mask: masks.cellphone },
        { type: "mask", name: "cep", label: COMMON_LABELS.cep, className: "col-span-1", mask: masks.cep },
        { type: "input", name: "address", label: COMMON_LABELS.address, className: "col-span-1 sm:col-span-2" },
        { type: "input", name: "city", label: COMMON_LABELS.city, className: "col-span-1" },
        { type: "input", name: "district", label: COMMON_LABELS.district, className: "col-span-1" },
        { type: "input", name: "state", label: COMMON_LABELS.state, className: "col-span-1" },
        { type: "input", name: "email", label: COMMON_LABELS.email, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "input", name: "payment", label: COMMON_LABELS.payment, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "paymentMedium", label: COMMON_LABELS.paymentMediumLabel, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "input", name: "otherPayment", label: COMMON_LABELS.otherPayment, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    ];

    const questionsFields: FieldConfig<FormularioDeInscricaoEmEventosFormSchemaType>[] = [
        { type: "textarea", name: "previousActivityArtin", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.previousActivityArtin, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "inspiration", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.inspiration, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "expectations", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.expectations, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "personalDevelopmentInterests", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.personalDevelopmentInterests, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "wantsToReceiveInfo", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.wantsToReceiveInfo, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "suggestions", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.suggestions, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "wouldRecommend", label: QUESTIONS_FORMULARIO_DE_INSCRICAO_EM_EVENTOS.wouldRecommend, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    ];

    return (
        <>
            <FormBuilder form={form} fields={baseFields} readOnly={readOnly} />

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <h1>Perguntas</h1>
            </div>

            <FormBuilder form={form} fields={questionsFields} readOnly={readOnly} />

            <div className={`col-span-1 flex sm:col-span-2 lg:col-span-3 ${mode === "view" ? "justify-between" : "justify-end"}`}>
                {mode === "view" && (
                    <Link href={`/fichas/formulario_de_inscricao_em_eventos`}>
                        <Button
                            type="submit"
                            variant="outline"
                            className="flex items-center text-base"><ArrowLeft strokeWidth={4} /> Voltar</Button>
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


