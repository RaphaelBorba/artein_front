import { FC } from "react";
import { UseFormReturn } from "react-hook-form";
import { LeadSchemaType } from "@/schemas/lead/leadSchema";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";
import { MultiSelect } from "@/components/self/FormSelectMultipleWithLabel";
import { masks } from "@/lib/masks";
import { Option } from "@/types/smallModels";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

interface LeadFormFieldsProps {
    form: UseFormReturn<LeadSchemaType>;
    readOnly?: boolean;
    courses: Option[];
    mode: "create" | "edit" | "view";
}

const LeadFormFields: FC<LeadFormFieldsProps> = ({
    form,
    courses,
    mode,
    readOnly = false,
}) => {
    return (
        <>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormInputWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-2"
                        field={field}
                        label="Nome"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Email"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormMaskInputWithLabel
                        field={field}
                        label="Telefone"
                        labelBold
                        isDisabled={readOnly}
                        mask={masks.cellphone}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Local que Mora"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="shift"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Turno Disponível"
                        labelBold
                        isDisabled={readOnly}
                        idLabel="shift"
                        options={[
                            { value: 'null', label: "---" },
                            { value: "MANHA", label: "Manhã" },
                            { value: "TARDE", label: "Tarde" },
                            { value: "NOITE", label: "Noite" },
                        ]}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="observations"
                render={({ field }) => (
                    <FormTextAreaWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-3"
                        field={field}
                        label="Observação"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="courses"
                render={({ field }) => (
                    <MultiSelect
                        options={courses}
                        onValueChange={field.onChange}
                        defaultValue={field.value !== undefined ? field.value : []}
                        placeholder="Selecione as Opções"
                        labelBold
                        labelText="O que se Interessou"
                        classNameFather="col-span-1 sm:col-span-2 lg:col-span-3"
                        disabled={readOnly}
                    />
                )}
            />

            <div className="col-span-1 flex justify-between sm:col-span-2 lg:col-span-3">
                <Link href="/cc/leads">
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

export default LeadFormFields;
