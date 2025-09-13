
import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { masks } from "@/lib/masks";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import Link from "next/link";
import { COMMON_LABELS, PAYMENT_MEDIUM_OPTIONS_GLOBAL, QUESTIONS_CURSO_APROFUNDAMENTO_FORM, PAYMENT_OPTIONS_CURSO_APROFUNDAMENTO_MINDFULLNESS, YES_NO_NULL_OPTIONS, QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS } from "@/constants/forms";
import { InscricaoImersaoEmMindfulnessFormSchemaType } from "@/schemas/forms/inscricao_imersao_em_mindfulness";

interface FormFieldsProps {
    form: UseFormReturn<InscricaoImersaoEmMindfulnessFormSchemaType>;
    readOnly?: boolean;
    mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
    return (
        <>
            <FormField control={form.control} name="fullName" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-2"
                    field={field}
                    label={COMMON_LABELS.fullName}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="phone" render={({ field }) => (
                <FormMaskInputWithLabel
                    className="col-span-1"
                    field={field}
                    label={COMMON_LABELS.phone}
                    labelBold
                    isDisabled={readOnly}
                    mask={masks.cellphone}
                />
            )} />

            <FormField control={form.control} name="cep" render={({ field }) => (
                <FormMaskInputWithLabel
                    className="col-span-1"
                    field={field}
                    label={COMMON_LABELS.cep}
                    labelBold
                    isDisabled={readOnly}
                    mask={masks.cep}
                />
            )} />
            <FormField control={form.control} name="address" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-2"
                    field={field}
                    label={COMMON_LABELS.address}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="city" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1"
                    field={field}
                    label={COMMON_LABELS.city}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="district" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1"
                    field={field}
                    label={COMMON_LABELS.district}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1"
                    field={field}
                    label={COMMON_LABELS.state}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="email" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={COMMON_LABELS.email}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="alreadyParticipatedInCourseArtin" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={COMMON_LABELS.alreadyParticipatedInCourseArtin}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="alreadyParticipatedInCourseOther" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={COMMON_LABELS.alreadyParticipatedInCourseOther}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="payment" render={({ field }) => (
                <FormSelectWithLabel
                    field={field}
                    labelText={COMMON_LABELS.paymentChosen}
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    labelBold
                    isDisabled={readOnly}
                    idLabel=""
                    options={PAYMENT_OPTIONS_CURSO_APROFUNDAMENTO_MINDFULLNESS}
                />
            )} />
            <FormField control={form.control} name="bankAndInitialDepositDate" render={({ field }) => (
                <FormInputWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={COMMON_LABELS.paymentBankAndDate}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="paymentMedium" render={({ field }) => (
                <FormSelectWithLabel
                    field={field}
                    labelText={COMMON_LABELS.paymentMediumLabel}
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    labelBold
                    isDisabled={readOnly}
                    idLabel=""
                    options={PAYMENT_MEDIUM_OPTIONS_GLOBAL}
                />
            )} />
            <FormField control={form.control} name="paymentInstructions" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={COMMON_LABELS.paymentInstructions}
                    labelBold
                    isDisabled={true} />
            )} />
            <FormField control={form.control} name="depositData" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={COMMON_LABELS.depositData}
                    labelBold
                    startHeight={220}
                    isDisabled={true} />
            )} />

            <div className="col-span-1 sm:col-span-2 lg:col-span-3">
                <h1>Perguntas</h1>
            </div>

            <FormField control={form.control} name="whyCourse" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.whyCourse}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="keptTraining" render={({ field }) => (
                <FormSelectWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    labelText={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.keptTraining}
                    options={YES_NO_NULL_OPTIONS}
                    idLabel=""
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="frequentlyPracticed" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.frequentlyPracticed}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="otherContact" render={({ field }) => (
                <FormSelectWithLabel    
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    labelText={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContact}
                    options={YES_NO_NULL_OPTIONS}
                    idLabel=""
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="otherContactDescription" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.otherContactDescription}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="psychotherapyTreatment" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.psychotherapyTreatment}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="specialNeeds" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.specialNeeds}
                    labelBold
                    isDisabled={readOnly} />
            )} />

            <FormField control={form.control} name="greatestGain" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.greatestGain}
                    labelBold
                    isDisabled={readOnly} />
            )} />
            <FormField control={form.control} name="expectations" render={({ field }) => (
                <FormTextAreaWithLabel
                    className="col-span-1 sm:col-span-2 lg:col-span-3"
                    field={field}
                    label={QUESTIONS_INSCRICAO_IMERSAO_MINDFULLNESS.expectations}
                    labelBold
                    isDisabled={readOnly} />
            )} />
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


