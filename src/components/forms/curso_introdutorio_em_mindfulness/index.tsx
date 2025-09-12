import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import type { CursoIntrodutorioMindfulnessFormSchemaType } from "@/schemas/forms/cursoIntrodutorioMindfulness/cursoIntrodutorioMindfulnessSchema";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { masks } from "@/lib/masks";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import Link from "next/link";
import { COMMON_LABELS, PAYMENT_OPTIONS_CURSO_INTRODUTORIO_EM_MINDFULLNESS, PAYMENT_MEDIUM_OPTIONS_GLOBAL, DISCOUNT_OPTIONS_GLOBAL, QUESTIONS_CURSO_INTRODUTORIO_FORM } from "@/constants/forms";

interface FormFieldsProps {
	form: UseFormReturn<CursoIntrodutorioMindfulnessFormSchemaType>;
	readOnly?: boolean;
	mode: "create" | "edit" | "view";
}

const FormFields: FC<FormFieldsProps> = ({ form, readOnly = false, mode }) => {
	return (
		<>
			<FormField control={form.control} name="fullName" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={COMMON_LABELS.fullName}
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="profession" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-2"
					field={field}
					label={COMMON_LABELS.profession}
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="birthDate" render={({ field }) => (
				<FormDatePicker
					labelText={COMMON_LABELS.birthDate}
					field={field}
					labelBold
					isDisabled={readOnly} />
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
					className="col-span-1 sm:col-span-2"
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
			<FormField control={form.control} name="email" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2"
					field={field}
					label={COMMON_LABELS.email}
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="indication" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={COMMON_LABELS.indication}
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="payment" render={({ field }) => (
				<FormSelectWithLabel
					field={field}
					labelText={COMMON_LABELS.payment}
					className="col-span-1 sm:col-span-2 lg:col-span-2"
					labelBold
					isDisabled={readOnly}
					idLabel=""
					options={PAYMENT_OPTIONS_CURSO_INTRODUTORIO_EM_MINDFULLNESS}
				/>
			)} />
			<FormField control={form.control} name="otherPayment" render={({ field }) => (
				<FormInputWithLabel
					field={field}
					label={COMMON_LABELS.otherPayment}
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="paymentMedium" render={({ field }) => (
				<FormSelectWithLabel
					field={field}
					labelText={COMMON_LABELS.paymentMedium}
					className="col-span-1 sm:col-span-2 lg:col-span-2"
					labelBold
					isDisabled={readOnly}
					idLabel=""
					options={PAYMENT_MEDIUM_OPTIONS_GLOBAL}
				/>
			)} />

			<FormField control={form.control} name="discount" render={({ field }) => (
				<FormSelectWithLabel
					field={field}
					labelText={COMMON_LABELS.discount}
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					labelBold
					isDisabled={readOnly}
					idLabel=""
					observation="Obs: Descontos não acumulativos"
					options={DISCOUNT_OPTIONS_GLOBAL}
				/>
			)} />
			<FormField control={form.control} name="otherDiscounts" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={COMMON_LABELS.otherDiscounts}
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="bankAndInitialDepositDate" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={COMMON_LABELS.bankAndInitialDepositDate}
					labelBold
					isDisabled={readOnly} />
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
					label={QUESTIONS_CURSO_INTRODUTORIO_FORM.whyCourse}
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="meditationExperience" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={QUESTIONS_CURSO_INTRODUTORIO_FORM.meditationExperience}
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="mindfulnessContact" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={QUESTIONS_CURSO_INTRODUTORIO_FORM.mindfulnessContact}
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="psychotherapyTreatment" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={QUESTIONS_CURSO_INTRODUTORIO_FORM.psychotherapyTreatment}
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="specialNeeds" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={QUESTIONS_CURSO_INTRODUTORIO_FORM.specialNeeds}
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="expectations" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label={QUESTIONS_CURSO_INTRODUTORIO_FORM.expectations}
					labelBold
					isDisabled={readOnly} />
			)} />

			<div className={`col-span-1 flex sm:col-span-2 lg:col-span-3 ${mode === "view" ? "justify-between" : "justify-end"}`}>
				{mode === "view" && (
					<Link href={`/fichas/curso_introdutorio_em_mindfulness`}>
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


