import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import type { P8SEmMindfulnessFormSchemaType } from "@/schemas/forms/ps8_em_mindfulness";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import Link from "next/link";
import FormBuilder, { FieldConfig } from "@/components/self/FormBuilder";
import { masks } from "@/lib/masks";
import { COMMON_LABELS, PAYMENT_MEDIUM_OPTIONS_GLOBAL, DISCOUNT_OPTIONS_GLOBAL, QUESTIONS_PS8_EM_MINDFULLNESS, PAYMENT_OPTIONS_PS8_EM_MINDFULLNESS } from "@/constants/forms";

interface FormFieldsProps {
    form: UseFormReturn<P8SEmMindfulnessFormSchemaType>;
    readOnly?: boolean;
    mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
    const baseFields: FieldConfig<P8SEmMindfulnessFormSchemaType>[] = [
        { type: "input", name: "fullName", label: COMMON_LABELS.fullName, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "input", name: "profession", label: COMMON_LABELS.profession, className: "col-span-1 sm:col-span-2 lg:col-span-2" },
        { type: "date", name: "birthDate", label: COMMON_LABELS.birthDate },
        { type: "mask", name: "cep", label: COMMON_LABELS.cep, className: "col-span-1", mask: masks.cep },
        { type: "input", name: "address", label: COMMON_LABELS.address, className: "col-span-1 sm:col-span-2" },
        { type: "input", name: "city", label: COMMON_LABELS.city, className: "col-span-1" },
        { type: "input", name: "district", label: COMMON_LABELS.district, className: "col-span-1" },
        { type: "input", name: "state", label: COMMON_LABELS.state, className: "col-span-1" },
        { type: "mask", name: "phone", label: COMMON_LABELS.phone, className: "col-span-1", mask: masks.cellphone },
        { type: "input", name: "email", label: COMMON_LABELS.email, className: "col-span-1 sm:col-span-2" },
        { type: "input", name: "indication", label: COMMON_LABELS.indication, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "select", name: "payment", label: COMMON_LABELS.payment, className: "col-span-1 sm:col-span-2 lg:col-span-2", options: PAYMENT_OPTIONS_PS8_EM_MINDFULLNESS },
        { type: "input", name: "otherPayment", label: COMMON_LABELS.otherPayment },
        { type: "select", name: "paymentMedium", label: COMMON_LABELS.paymentMedium, className: "col-span-1 sm:col-span-2 lg:col-span-2", options: PAYMENT_MEDIUM_OPTIONS_GLOBAL },
        { type: "select", name: "discount", label: COMMON_LABELS.discount, className: "col-span-1 sm:col-span-2 lg:col-span-3", options: DISCOUNT_OPTIONS_GLOBAL, observation: "Obs: Descontos não acumulativos" },
        { type: "input", name: "otherDiscounts", label: COMMON_LABELS.otherDiscounts, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "bankAndInitialDepositDate", label: COMMON_LABELS.bankAndInitialDepositDate, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "depositData", label: COMMON_LABELS.depositData, className: "col-span-1 sm:col-span-2 lg:col-span-3", startHeight: 220, alwaysDisabled: true },
    ];

    const questionsFields: FieldConfig<P8SEmMindfulnessFormSchemaType>[] = [
        { type: "textarea", name: "whyMindfulnessProgram", label: QUESTIONS_PS8_EM_MINDFULLNESS.whyMindfulnessProgram, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "motivationForProgram", label: QUESTIONS_PS8_EM_MINDFULLNESS.motivationForProgram, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "meditationExperience", label: QUESTIONS_PS8_EM_MINDFULLNESS.meditationExperience, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "mindfulnessContact", label: QUESTIONS_PS8_EM_MINDFULLNESS.mindfulnessContact, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "psychotherapyTreatment", label: QUESTIONS_PS8_EM_MINDFULLNESS.psychotherapyTreatment, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "specialNeeds", label: QUESTIONS_PS8_EM_MINDFULLNESS.specialNeeds, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
        { type: "textarea", name: "expectations", label: QUESTIONS_PS8_EM_MINDFULLNESS.expectations, className: "col-span-1 sm:col-span-2 lg:col-span-3" },
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
                    <Link href={`/fichas/p8s_em_mindfulness`}>
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


