import { Button } from "@/components/ui/button";
import { masks } from "@/lib/masks";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import { GeneralRegisterFilterSchemaType } from "@/schemas/generalRegister/generalRegisterFilterSchema";
import { UseFormReturn } from "react-hook-form";
import { CommunicationMethod } from "@/types/smallModels";

interface FiltersGeneralRegister {
    form: UseFormReturn<GeneralRegisterFilterSchemaType>;
    communicationMethod: CommunicationMethod[];
}

export function FiltersGeneralRegister({ communicationMethod, form }: FiltersGeneralRegister) {

    const cleanInputs = () => {
        form.reset()
    }

    return (<>
        <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
                <FormInputWithLabel
                    field={field}
                    label="Nome Completo"
                    labelBold
                />
            )}
        />
        <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
                <FormMaskInputWithLabel
                    field={field}
                    label="CPF"
                    labelBold
                    mask={masks.cpf}
                />
            )}
        />
        <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
                <FormMaskInputWithLabel
                    field={field}
                    label="CNPJ"
                    labelBold
                    mask={masks.cnpj}
                />
            )}
        />
        <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
                <FormMaskInputWithLabel
                    field={field}
                    label="Celular"
                    labelBold
                    mask={masks.cellphone}
                />
            )}
        />

        <FormField
            control={form.control}
            name="interestedInCourses"
            render={({ field }) => (
                <FormSelectWithLabel
                    field={field}
                    labelText="Interessado em Cursos"
                    labelBold
                    idLabel=""
                    options={[
                        { value: 'null', label: "---" },
                        { value: "1", label: "Interessado" },
                        { value: "0", label: "Desinteressado" },
                    ]}
                />
            )}
        />
        <FormField
            control={form.control}
            name="receiveInfoMethodId"
            render={({ field }) => (
                <FormSelectWithLabel
                    field={field}
                    labelText="Receber Informações Via"
                    labelBold
                    idLabel=""
                    options={[
                        { value: 'null', label: "---" },
                        ...communicationMethod
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