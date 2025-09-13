
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import FormBuilder, { FieldConfig } from "@/components/self/FormBuilder";
import { masks } from "@/lib/masks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";
import { YES_NO_NULL_OPTIONS, COMMON_LABELS, PAYMENT_MEDIUM_OPTIONS_GLOBAL } from "@/constants/forms";
import type { FormularioAulasRegularesFormSchemaType } from "@/schemas/forms/formulario_aulas_regulares";
import FormDatesField from "./DatesField";
interface FormFieldsProps {
    form: UseFormReturn<FormularioAulasRegularesFormSchemaType>;
    readOnly?: boolean;
    mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
    const baseFields: FieldConfig<FormularioAulasRegularesFormSchemaType>[] = [
        { type: "input", name: "fullName", label: COMMON_LABELS.fullName, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
        { type: "date", name: "birthDate", label: COMMON_LABELS.birthDate },
        { type: "mask", name: "cep", label: COMMON_LABELS.cep, className: "col-span-1", mask: masks.cep },
        { type: "input", name: "address", label: COMMON_LABELS.address, className: "col-span-1 sm:col-span-2" },
        { type: "input", name: "city", label: COMMON_LABELS.city, className: "col-span-1" },
        { type: "input", name: "district", label: COMMON_LABELS.district, className: "col-span-1" },
        { type: "input", name: "state", label: COMMON_LABELS.state, className: "col-span-1" },
        { type: "mask", name: "phone", label: COMMON_LABELS.phone, className: "col-span-1", mask: masks.cellphone },
        { type: "input", name: "email", label: COMMON_LABELS.email, className: "col-span-1 sm:col-span-2" },
        { type: "input", name: "payment", label: COMMON_LABELS.payment, className: "col-span-1 sm:col-span-2" },
        { type: "input", name: "otherPayment", label: COMMON_LABELS.otherPayment, className: "col-span-1 sm:col-span-2" },
        { type: "select", name: "paymentMedium", label: COMMON_LABELS.paymentMediumLabel, className: "col-span-1 sm:col-span-2", options: PAYMENT_MEDIUM_OPTIONS_GLOBAL },
    ];

    const healthFields: FieldConfig<FormularioAulasRegularesFormSchemaType>[] = [
        { type: "textarea", name: "specialNeeds", label: "Você tem alguma necessidade ou cuidado especial? Qual? (ex.: cadeirante etc):", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "underMedicalCare", label: "Atualmente, você se encontra sob cuidado Médico?", className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "whichMedicalCare", label: "Quais?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "underPsychologicalCare", label: "Atualmente, você se encontra sob cuidado Psicológico?", className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "whichPsychologicalCare", label: "Quais?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "underPsychiatricCare", label: "Atualmente, você se encontra sob cuidado Psiquiátrico?", className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "whichPsychiatricCare", label: "Quais?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    ];

    const questionsFields: FieldConfig<FormularioAulasRegularesFormSchemaType>[] = [
        { type: "textarea", name: "healthImportantInfo", label: "1. O que mais considera importante sabermos sobre sua saúde?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "previousActivityArtin", label: "2. Já participou de alguma atividade no ARTE-In? Se sim, qual atividade e quando?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "inspiration", label: "3. O que te inspirou a buscar essa [s] atividade [s] na qual você se inscreveu como aluno?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "otherRegularClassInterest", label: "4. Tem interesse em frequentar alguma outra aula regular? Caso sim, qual? Por que?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "wantsCourseInfo", label: "Quer receber informações sobre nossos cursos:", className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "suggestions", label: "Deseja sugerir algo visando o aprimoramento de nossos serviços e espaço físico?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "wouldRecommend", label: "Indicaria nossas atividades para alguém? Quem?", className: "col-span-1 sm:col-span-2 lg:col-span-3" },
    ];

    return (
        <>
            <FormDatesField form={form} readOnly={readOnly} />

            <FormBuilder form={form} fields={baseFields} readOnly={readOnly} />

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <h1>Saúde</h1>
            </div>
            <FormBuilder form={form} fields={healthFields} readOnly={readOnly} />

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <h1>Perguntas</h1>
            </div>
            <FormBuilder form={form} fields={questionsFields} readOnly={readOnly} />

            <div className={`col-span-1 flex sm:col-span-2 lg:col-span-3 ${mode === "view" ? "justify-between" : "justify-end"}`}>
                {mode === "view" && (
                    <Link href={`/fichas/formulario_aulas_regulares`}>
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


