import { FC } from "react";
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
import { Separator } from "@/components/ui/separator";
import FormTextAreaWithLabel from "@/components/self/FormTextAreaWithLabel";
import { MultiSelect } from "@/components/self/FormSelectMultipleWithLabel";

interface PatientsFormFieldsProps {
  form: UseFormReturn<PatientWithGeneralSchemaType>;
  readOnly?: boolean;
  psychologicalDisorders: PsychologicalDisorders[];
  mode: "create" | "edit" | "view";
  path: "cadastro_geral" | "pacientes" | "alunos";
}

const PatientsFormFields: FC<PatientsFormFieldsProps> = ({
  form,
  readOnly = false,
  psychologicalDisorders,
}) => {
  return (
    <>
      <div className="col-span-1 flex gap-3 sm:col-span-2 lg:col-span-3">
        <Package /> <span className="font-bold ">Informações Sigilosas</span>
      </div>
      <Separator className="col-span-1 sm:col-span-2 lg:col-span-3" />

      <FormField
        control={form.control}
        name="attendanceType"
        render={({ field }) => (
          <FormSelectWithLabel
            field={field}
            labelBold
            isDisabled={readOnly}
            idLabel="attendanceType"
            labelText="Tipo do Atendimento"
            options={[{ label: "---", value: "null" }, { label: "Online", value: "Online" }, { label: "Presencial", value: "Presencial" }]}
          />
        )}
      />

      <FormField
        control={form.control}
        name="attendanceLocation"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Local do Atendimento"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="familyOfOrigin"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Família Natal:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

      <FormField
        control={form.control}
        name="currentFamily"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Família Atual:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="peopleInHousehold"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Quantas e Quais Pessoas Moram na Mesma Casa do Cliente?"
            labelBold
            isDisabled={readOnly}
            type='number'
          />
        )}
      />
      <FormField
        control={form.control}
        name="previousPsychotherapyTreatment"
        render={({ field }) => (
          <FormSelectWithLabel
            field={field}
            labelText="Tratamento Psicoterápico anterior?"
            labelBold
            isDisabled={readOnly}
            idLabel="previousPsychotherapyTreatment"
            options={[
              { value: 'null', label: "---" },
              { value: "1", label: "Sim" },
              { value: "0", label: "Não" },
            ]}
          />
        )}
      />
      <FormField
        control={form.control}
        name="psychotherapyTreatmentDetails"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Qual ou Quais? Em Qual(is) Ano(s) e Qual a Duração?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="pastPsychiatricTreatment"
        render={({ field }) => (
          <FormSelectWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            labelText="Tratamento Psiquiátrico Passado?"
            labelBold
            isDisabled={readOnly}
            idLabel="pastPsychiatricTreatment"
            options={[
              { value: 'null', label: "---" },
              { value: "1", label: "Sim" },
              { value: "0", label: "Não" },
            ]}
          />
        )}
      />
      <FormField
        control={form.control}
        name="pastPsychiatricTreatmentDate"
        render={({ field }) => (
          <FormDatePicker
            field={field}
            labelText="Quando?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="currentPsychiatricTreatment"
        render={({ field }) => (
          <FormSelectWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            labelText="Tratamento Psiquiátrico Atual?"
            labelBold
            isDisabled={readOnly}
            idLabel="currentPsychiatricTreatment"
            options={[
              { value: 'null', label: "---" },
              { value: "1", label: "Sim" },
              { value: "0", label: "Não" },
            ]}
          />
        )}
      />
      <FormField
        control={form.control}
        name="currentPsychiatricTreatmentStartDate"
        render={({ field }) => (
          <FormDatePicker
            field={field}
            labelText="Início?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="psychiatrist"
        render={({ field }) => (
          <FormInputWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Psiquiatra:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="psychiatristPhone"
        render={({ field }) => (
          <FormMaskInputWithLabel
            field={field}
            label="Celular Psiquiatra"
            labelBold
            isDisabled={readOnly}
            mask={masks.cellphone}
          />
        )}
      />
      <FormField
        control={form.control}
        name="currentMedications"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Medicamentos Atuais:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="medicationDiagnosis"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Diagnóstico que Justifica a Medicação:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="generalMedicalTreatment"
        render={({ field }) => (
          <FormSelectWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            labelText="Tratamento Médico em geral? Doença grave ou acidente com prejuízo atual?"
            labelBold
            isDisabled={readOnly}
            idLabel="generalMedicalTreatment"
            options={[
              { value: 'null', label: "---" },
              { value: "1", label: "Sim" },
              { value: "0", label: "Não" },
            ]}
          />
        )}
      />
      <FormField
        control={form.control}
        name="generalMedicalTreatmentDetails"
        render={({ field }) => (
          <FormTextAreaWithLabel
            field={field}
            label="Quais?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="nonPsychiatricMedications"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Medicamentos não Psiquiátricos? Quais:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="ongoingLegalProcess"
        render={({ field }) => (
          <FormSelectWithLabel
            field={field}
            labelText="Envolvimento Atual em Processo Judicial?"
            labelBold
            isDisabled={readOnly}
            idLabel="ongoingLegalProcess"
            options={[
              { value: 'null', label: "---" },
              { value: "1", label: "Sim" },
              { value: "0", label: "Não" },
            ]}
          />
        )}
      />
      <FormField
        control={form.control}
        name="legalProcessDetails"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-2"
            field={field}
            label="Qual (is)?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="reasonForSeekingHelp"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Motivo da Procura (Queixas Principais):"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="psychologicalDisorders"
        render={({ field }) => (
          <MultiSelect
            options={psychologicalDisorders}
            onValueChange={field.onChange}
            defaultValue={field.value !== undefined ? field.value : []}
            placeholder="Selecione as Opções"
            // maxCount={6}
            labelBold
            labelText="Transtornos Psicológicos Presentes?"
            classNameFather="col-span-1 sm:col-span-2 lg:col-span-3"
            disabled={readOnly}
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
            label="Observação:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="physicalAndMentalDevelopment"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Desenvolvimento Físico e Mental?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="educationalAndProfessionalHistory"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="História Educacional e Profissional?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="familyAndAffectiveHistory"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="História Familiar e Afetiva?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="patientComplaintHistory"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="História Relacionada à(s) Queixa(s) do Paciente? Há Quanto Tempo Sofre Com os Transtornos Apresentados Atualmente?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="therapyExpectations"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Expectativas da Terapia?"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />
      <FormField
        control={form.control}
        name="medicalRecord"
        render={({ field }) => (
          <FormTextAreaWithLabel
            className="col-span-1 sm:col-span-2 lg:col-span-3"
            field={field}
            label="Prontuário:"
            labelBold
            isDisabled={readOnly}
          />
        )}
      />

    </>
  );
};

export default PatientsFormFields;
