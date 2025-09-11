import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import type { CursoIntrodutorioMindfulnessFormSchemaType } from "@/schemas/cursoIntrodutorioMindfulness/cursoIntrodutorioMindfulnessSchema";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Plus } from "lucide-react";
import { masks } from "@/lib/masks";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";

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
					label="Nome Completo"
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="profession" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-2"
					field={field}
					label="Profissão"
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="birthDate" render={({ field }) => (
				<FormDatePicker
					labelText="Data de Nascimento"
					field={field}
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="cep" render={({ field }) => (
				<FormMaskInputWithLabel
					className="col-span-1"
					field={field}
					label="CEP"
					labelBold
					isDisabled={readOnly}
					mask={masks.cep}
				/>
			)} />
			<FormField control={form.control} name="address" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2"
					field={field}
					label="Endereço"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="city" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1"
					field={field}
					label="Cidade"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="district" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1"
					field={field}
					label="Bairro"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="state" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1"
					field={field}
					label="Estado"
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="phone" render={({ field }) => (
				<FormMaskInputWithLabel
					className="col-span-1"
					field={field}
					label="Telefone"
					labelBold
					isDisabled={readOnly}
					mask={masks.cellphone}
				/>
			)} />
			<FormField control={form.control} name="email" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2"
					field={field}
					label="E-mail"
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="indication" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Indicação de"
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="payment" render={({ field }) => (
				<FormSelectWithLabel
					field={field}
					labelText="Valor e Forma de Pagamento"
					className="col-span-1 sm:col-span-2 lg:col-span-2"
					labelBold
					isDisabled={readOnly}
					idLabel=""
					options={[
						{ value: 'null', label: "---" },
						{ value: "R$950 à vista", label: "R$950 à vista" },
						{ value: "R$1000,00 em 2 vezes de R$500,00", label: "R$1000,00 em 2 vezes de R$500,00" },
						{ value: "R$1005,00 em 3 vezes de R$335,00", label: "R$1005,00 em 3 vezes de R$335,00" },
						{ value: "R$1008,00 em 4 vezes de R$252,00", label: "R$1008,00 em 4 vezes de R$252,00" },
						{ value: "R$1010,00 em 5 vezes de R$202,00", label: "R$1010,00 em 5 vezes de R$202,00" },
						{ value: "EX-ALUNOS: R$800,00 à vista ou em 2 vezes de R$410,00", label: "EX-ALUNOS: R$800,00 à vista ou em 2 vezes de R$410,00" },
					]}
				/>
			)} />
			<FormField control={form.control} name="otherPayment" render={({ field }) => (
				<FormInputWithLabel
					field={field}
					label="Outra Forma de Pagamento"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="paymentMedium" render={({ field }) => (
				<FormSelectWithLabel
					field={field}
					labelText="Meio de Pagamento"
					className="col-span-1 sm:col-span-2 lg:col-span-2"
					labelBold
					isDisabled={readOnly}
					idLabel=""
					options={[
						{ value: 'null', label: "---" },
						{ value: "Cartão de Crédito", label: "Cartão de Crédito" },
						{ value: "Cartão de Débito", label: "Cartão de Débito" },
						{ value: "Cheque", label: "Cheque" },
						{ value: "Depósito Bancário", label: "Depósito Bancário" },
						{ value: "Dinheiro", label: "Dinheiro" },
						{ value: "Pix", label: "Pix" },
						{ value: "Transferência Bancária", label: "Transferência Bancária" },
					]}
				/>
			)} />

			<FormField control={form.control} name="discount" render={({ field }) => (
				<FormSelectWithLabel
					field={field}
					labelText="Desconto"
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					labelBold
					isDisabled={readOnly}
					idLabel=""
					observation="Obs: Descontos não acumulativos"
					options={[
						{ value: 'null', label: "---" },
						{ value: "Desconto de 10% para sócios da ATC, FBTC e ABRAMIND", label: "Desconto de 10% para sócios da ATC, FBTC e ABRAMIND" },
						{ value: "Desconto de R$100,00 em qualquer forma de pagamento, caso o participante traga um parete ou amigo para fazer o mesmo curso", label: "Desconto de R$100,00 em qualquer forma de pagamento, caso o participante traga um parete ou amigo para fazer o mesmo curso" },
						{ value: "Outra Opção. Qual?", label: "Outra Opção. Qual?" },
					]}
				/>
			)} />
			<FormField control={form.control} name="otherDiscounts" render={({ field }) => (
				<FormInputWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Outros Descontos"
					labelBold
					isDisabled={readOnly} />
			)} />

			<FormField control={form.control} name="bankAndInitialDepositDate" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Se Possível, Informe-nos o BANCO e a DATA DO DEPÓSITO INICIAL, Assim Como a Data Para Pagamento Das DEMAIS PARCELAS:"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="depositData" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Dados para depósito ou transferência"
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
					label="Por que você deseja fazer este CURSO INTRODUTÓRIO de Mindfulness (Consciência Plena)? O que o/a mobilizou a ingressar neste programa de auto-desenvolvimento?"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="meditationExperience" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Você possui alguma experiência em práticas de meditação? Caso sim, qual(is)?"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="mindfulnessContact" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Já teve algum contato com o tema ou experiências Mindfulness (leituras, palestras, vivências etc)? Descreva quais:"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="psychotherapyTreatment" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Você já realizou algum tipo de tratamento psicoterapêutico ou está atualmente sob os cuidados de algum psicólogo/psiquiatra? Descreva em poucas palavras o que houve ou o que está havendo:"
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="specialNeeds" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Tem alguma necessidade ou cuidado especial? Qual? (Exemplo: cadeirante, dificuldade auditiva, etc)."
					labelBold
					isDisabled={readOnly} />
			)} />
			<FormField control={form.control} name="expectations" render={({ field }) => (
				<FormTextAreaWithLabel
					className="col-span-1 sm:col-span-2 lg:col-span-3"
					field={field}
					label="Diga suas expectativas em relação a este curso de Mindfulness (Consciência Plena):"
					labelBold
					isDisabled={readOnly} />
			)} />

			<div className="col-span-1 flex justify-end sm:col-span-2 lg:col-span-3">
				{mode !== 'view' && (
					<Button type="submit" variant="default" className="flex items-center text-base"><Plus strokeWidth={5} /> {mode === 'create' ? 'Cadastrar' : 'Atualizar'}</Button>
				)}
			</div>
		</>
	);
};

export default FormFields;


