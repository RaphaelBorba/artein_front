import { Button } from "@/components/ui/button";
import { masks } from "@/lib/masks";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import { LeadFilterSchemaType } from "@/schemas/lead/leadFilterSchema";
import { UseFormReturn } from "react-hook-form";
import { Option } from "@/types/smallModels";

interface FiltersLeadProps {
    form: UseFormReturn<LeadFilterSchemaType>;
    courses: Option[];
}

export function FiltersLead({ form, courses }: FiltersLeadProps) {

    const cleanInputs = () => {
        form.reset()
    }

    return (<>
        <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
                <FormInputWithLabel
                    field={field}
                    label="Nome"
                    labelBold
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
                />
            )}
        />
        <FormField
            control={form.control}
            name="courseId"
            render={({ field }) => (
                <FormSelectWithLabel
                    field={field}
                    labelText="O que se Interessou"
                    labelBold
                    idLabel=""
                    options={[
                        { value: 'null', label: "---" },
                        ...courses
                    ]}
                />
            )}
        />
        <Button
            type="submit"
            className="bg-[#00c0ef] hover:bg-[#5bc0de]"
        >
            Pesquisar
        </Button>
        <Button
            type="reset"
            onClick={cleanInputs}
            variant="outline"
        >
            Limpar
        </Button>
    </>
    )
}
