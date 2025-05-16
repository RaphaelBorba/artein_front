import { FC, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import { masks } from "@/lib/masks";
import { PsychologicalDisorders } from "@/types/smallModels";
import { Package } from "lucide-react";
import { PatientWithGeneralSchemaType } from "@/schemas/patients/patientsSchema";

interface PatientsFormFieldsProps {
    form: UseFormReturn<PatientWithGeneralSchemaType>;
    readOnly?: boolean;
    psychologicalDisorders: PsychologicalDisorders[];
    mode: "create" | "edit" | "view";
    path: "cadastro_geral" | "pacientes" | "alunos";
}

const PatientsFormFields: FC<PatientsFormFieldsProps> = ({
    form,
    path,
    mode,
    readOnly = false,
    psychologicalDisorders
}) => {
    return (
        <>
            <div>
                <h3> <Package></Package>Informações Sigilosas</h3>
            </div>
        </>
    );
};

export default PatientsFormFields;
