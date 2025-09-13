
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import FormBuilder, { FieldConfig } from "@/components/self/FormBuilder";
import { masks } from "@/lib/masks";
import { COMMON_LABELS, PAYMENT_MEDIUM_OPTIONS_GLOBAL, PAYMENT_OPTIONS_CURSO_APROFUNDAMENTO_MINDFULLNESS, YES_NO_NULL_OPTIONS, QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS } from "@/constants/forms";
import { InscricaoImersaoEmMindfulnessFormSchemaType } from "@/schemas/forms/inscricao_imersao_em_mindfulness";

interface FormFieldsProps {
    form: UseFormReturn<InscricaoImersaoEmMindfulnessFormSchemaType>;
    readOnly?: boolean;
    mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
    const baseFields: FieldConfig<InscricaoImersaoEmMindfulnessFormSchemaType>[] = [
        { type: "input", name: "fullName", label: COMMON_LABELS.fullName, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
        { type: "mask", name: "phone", label: COMMON_LABELS.phone, className: "col-span-1", mask: masks.cellphone },
        { type: "mask", name: "cep", label: COMMON_LABELS.cep, className: "col-span-1", mask: masks.cep },
        { type: "input", name: "address", label: COMMON_LABELS.address, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
        { type: "input", name: "city", label: COMMON_LABELS.city, className: "col-span-1" },
        { type: "input", name: "district", label: COMMON_LABELS.district, className: "col-span-1" },
        { type: "input", name: "state", label: COMMON_LABELS.state, className: "col-span-1" },
        { type: "input", name: "email", label: COMMON_LABELS.email, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "input", name: "alreadyParticipatedInCourseArtin", label: COMMON_LABELS.alreadyParticipatedInCourseArtin, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "input", name: "alreadyParticipatedInCourseOther", label: COMMON_LABELS.alreadyParticipatedInCourseOther, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "payment", label: COMMON_LABELS.paymentChosen, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: PAYMENT_OPTIONS_CURSO_APROFUNDAMENTO_MINDFULLNESS },
        { type: "input", name: "bankAndInitialDepositDate", label: COMMON_LABELS.paymentBankAndDate, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "paymentMedium", label: COMMON_LABELS.paymentMediumLabel, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: PAYMENT_MEDIUM_OPTIONS_GLOBAL },
        { type: "textarea", name: "paymentInstructions", label: COMMON_LABELS.paymentInstructions, className: "col-span-1 sm:col-span-2 lg:col-span-3", alwaysDisabled: true },
        { type: "textarea", name: "depositData", label: COMMON_LABELS.depositData, className: "col-span-1 sm:col-span-2 lg:col-span-3", startHeight: 220, alwaysDisabled: true },
    ];

    const questionsFields: FieldConfig<InscricaoImersaoEmMindfulnessFormSchemaType>[] = [
        { type: "textarea", name: "whyCourse", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.whyCourse, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "keptTraining", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.keptTraining, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "frequentlyPracticed", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.frequentlyPracticed, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "otherContact", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContact, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: YES_NO_NULL_OPTIONS },
        { type: "textarea", name: "otherContactDescription", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContactDescription, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "psychotherapyTreatment", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.psychotherapyTreatment, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "specialNeeds", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.specialNeeds, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "greatestGain", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.greatestGain, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "expectations", label: QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.expectations, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
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
                    <Link href={`/fichas/inscricao_imersao_em_mindfulness`}>
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


