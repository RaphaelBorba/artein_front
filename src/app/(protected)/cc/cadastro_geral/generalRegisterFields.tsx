// GeneralRegisterFormFields.tsx
import { FC, ReactNode } from "react";
import { UseFormReturn } from "react-hook-form";
import { GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { FormField } from "@/components/ui/form";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import { masks } from "@/lib/masks";
import { CommunicationMethod, EducationLevel, Gender, MaritalStatus, ReferralSource } from "@/types/smallModels";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Plus } from "lucide-react";

// Props for the reusable fields component
interface GeneralRegisterFormFieldsProps {
    form: UseFormReturn<GeneralRegisterSchemaType>;
    readOnly?: boolean;
    maritalStatus: MaritalStatus[];
    educationLevel: EducationLevel[];
    gender: Gender[];
    communicationMethod: CommunicationMethod[];
    referralSource: ReferralSource[];
    mode: "create" | "edit" | "view";
    path: "cadastro_geral" | "pacientes" | "alunos";
    children?: ReactNode;
  }

const GeneralRegisterFormFields: FC<GeneralRegisterFormFieldsProps> = ({
    form,
    maritalStatus,
    educationLevel,
    gender,
    communicationMethod,
    referralSource,
    path,
    mode,
    readOnly = false,
    children,
}) => {
    return (
        <>
            <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                    <FormInputWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-2"
                        field={field}
                        label="Nome Completo"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="personType"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelBold
                        isDisabled={readOnly}
                        idLabel="personType"
                        labelText="Tipo Pessoa"
                        options={[{ label: "---", value: "null" }, { label: "Pessoa Física", value: "Pessoa Física" }, { label: "Pessoa Jurídica", value: "Pessoa Jurídica" }]}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="birthDate"
                render={({ field }) => (
                    <FormDatePicker
                        field={field}
                        labelText="Data de Nascimento"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="age"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Idade"
                        labelBold
                        isDisabled
                    />
                )}
            />
            <FormField
                control={form.control}
                name="nationality"
                render={({ field }) => (
                    <FormInputWithLabel
                        // className="col-span-1 sm:col-span-2 lg:col-span-2"
                        field={field}
                        label="Nacionalidade"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="placeOfBirth"
                render={({ field }) => (
                    <FormInputWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-2"
                        field={field}
                        label="Naturalidade"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="maritalStatusId"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Estado Civil"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            ...maritalStatus
                        ]}
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
                        isDisabled={readOnly}
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
                        isDisabled={readOnly}
                        mask={masks.cnpj}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="companyName"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Razão Social"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="educationLevelId"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Escolaridade"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            ...educationLevel
                        ]}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="profession"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Profissão"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="workplace"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Local de Trabalho"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="currentJob"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Ocupação Atual"
                        labelBold
                        isDisabled={readOnly}
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
                        isDisabled={readOnly}
                        mask={masks.cellphone}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="firstContactDate"
                render={({ field }) => (
                    <FormDatePicker
                        field={field}
                        labelText="Data 1º Contato"
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
                        className="col-span-1 sm:col-span-2 lg:col-span-3"
                        field={field}
                        label="Email"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="cep"
                render={({ field }) => (
                    <FormMaskInputWithLabel
                        field={field}
                        label="CEP"
                        labelBold
                        isDisabled={readOnly}
                        mask={masks.cep}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormInputWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-2"
                        field={field}
                        label="Endereço"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="complement"
                render={({ field }) => (
                    <FormInputWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-3"
                        field={field}
                        label="Complemento"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Cidade"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="neighborhood"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Bairro"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Estado"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="country"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="País"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="countryCode"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Código do País"
                        labelBold
                        isDisabled={readOnly}
                        type='number'
                    />
                )}
            />
            <FormField
                control={form.control}
                name="religion"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Religião"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="genderId"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Sexo"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            ...gender
                        ]}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Status"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            { value: '1', label: "Ativo" },
                            { value: '0', label: "Inativo" },
                        ]}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="isPatient"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Paciente"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            { value: "1", label: "Paciente" },
                            { value: "0", label: "Não-Paciente" },
                        ]}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="isStudent"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Aluno"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            { value: "1", label: "Aluno" },
                            { value: "0", label: "Não-Aluno" },
                        ]}
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
                        isDisabled={readOnly}
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
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            ...communicationMethod
                        ]}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="additionalInfo"
                render={({ field }) => (
                    <FormInputWithLabel
                        className="col-span-1 sm:col-span-2 lg:col-span-3"
                        field={field}
                        label="Informações Adicionais"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            <FormField
                control={form.control}
                name="referralSourceId"
                render={({ field }) => (
                    <FormSelectWithLabel
                        field={field}
                        labelText="Por Qual Meio Nos Encontrou?"
                        labelBold
                        isDisabled={readOnly}
                        idLabel=""
                        options={[
                            { value: 'null', label: "---" },
                            ...referralSource
                        ]}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="otherReferral"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Outro"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />
            <FormField
                control={form.control}
                name="referredByName"
                render={({ field }) => (
                    <FormInputWithLabel
                        field={field}
                        label="Nome da Indicação"
                        labelBold
                        isDisabled={readOnly}
                    />
                )}
            />

            {children}

            <div className="col-span-1 flex justify-between sm:col-span-2 lg:col-span-3">
                <Link href={`/cc/${path}`}>
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

export default GeneralRegisterFormFields;
