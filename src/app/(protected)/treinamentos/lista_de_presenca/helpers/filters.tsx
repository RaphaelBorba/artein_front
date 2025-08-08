import { Button } from "@/components/ui/button";
import { FormField } from "@/components/ui/form";

import { UseFormReturn } from "react-hook-form";
import { PresenceListFilterSchemaType } from "@/schemas/presenceList/presenceListFilterSchema";
import FormSelectWithFilter from "@/components/self/FormSelectWithFilter";
import { Option } from "@/types/smallModels";

interface FiltersPresenceList {
    form: UseFormReturn<PresenceListFilterSchemaType>;
    generalRegisters: Option[];
    courseClasses: Option[];
}

export function FiltersPresenceList({ courseClasses, generalRegisters, form }: FiltersPresenceList) {

    const cleanInputs = () => {
        form.reset()
    }

    return (<>
        <FormField
            control={form.control}
            name="courseClassId"
            render={({ field }) => (
                <FormSelectWithFilter
                    field={field}
                    labelBold
                    idLabel="courseClassId"
                    labelText="Turma"
                    options={courseClasses}
                />
            )}
        />
        <FormField
            control={form.control}
            name="generalRegisterId"
            render={({ field }) => (
                <FormSelectWithFilter
                    field={field}
                    labelBold
                    idLabel="generalRegisterId"
                    labelText="Cliente"
                    options={generalRegisters}
                />
            )}
        />
        <div className="flex gap-2">
        <Button
            type="submit"
            className="bg-[#00c0ef] hover:bg-[#5bc0de] w-[50%]"
        >
            Pesquisar
        </Button>
        <Button
        className="w-[50%]"
            type="reset"
            onClick={cleanInputs}
            variant="outline"
        >
            Limpar
        </Button>
        </div>
    </>
    )
}