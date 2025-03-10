"use client"
import Section from "@/components/self/Section";
import { generalRegisterSchema, GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
  FormField,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import FormInputWithLabel from "@/components/self/FormInputWithLabel";
import { Plus } from "lucide-react";

export default function GeneralRegisterForm() {

  const form = useForm<GeneralRegisterSchemaType>({
    resolver: zodResolver(generalRegisterSchema),
    defaultValues: {
      photo: "",
      fullName: "",
      personType: "",
      birthDate: "",
      nationality: "",
      placeOfBirth: "",
      age: "",
      maritalStatusId: "",
      cpf: "",
      cnpj: "",
      companyName: "",
      educationLevelId: undefined,
      profession: "",
      workplace: "",
      currentJob: "",
      phoneNumber: "",
      email: "",
      firstContactDate: "",
      cep: "",
      address: "",
      complement: "",
      city: "",
      neighborhood: "",
      state: "",
      country: "",
      countryCode: undefined,
      religion: "",
      genderId: undefined,
      status: false,
      isPatient: false,
      isStudent: false,
      interestedInCourses: false,
      receiveInfoMethodId: undefined,
      additionalInfo: "",
      referralSourceId: undefined,
      otherReferral: "",
      referredByName: ""
    },
  })

  console.log(form.formState.errors)

  function onSubmita(values: GeneralRegisterSchemaType) {
    console.log(values)
  }

  return (
    <Section title="Cadastro Geral">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmita)}
          className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">

          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormInputWithLabel
                className="col-span-1 sm:col-span-2 lg:col-span-2"
                field={field}
                label="Nome Completo"
                labelBold
              />
            )}
          />

          <FormField
            control={form.control}
            name="personType"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Tipo Pessoa"
                labelBold
              />
            )}
          />

          <FormField
            control={form.control}
            name="birthDate"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Data de Nascimento"
                labelBold
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
              />
            )}
          />
          <FormField
            control={form.control}
            name="maritalStatusId"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Estado Civil"
                labelBold
              />
            )}
          />

          <FormField
            control={form.control}
            name="cpf"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="CPF"
                labelBold
              />
            )}
          />

          <FormField
            control={form.control}
            name="cnpj"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="CNPJ"
                labelBold
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
              />
            )}
          />
          <FormField
            control={form.control}
            name="educationLevelId"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Escolaridade"
                labelBold
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
              />
            )}
          />

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Celular"
                labelBold
              />
            )}
          />

          <FormField
            control={form.control}
            name="firstContactDate"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Data 1º Contato"
                labelBold
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
              />
            )}
          />

          <FormField
            control={form.control}
            name="cep"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="CEP"
                labelBold
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
              />
            )}
          />
          <FormField
            control={form.control}
            name="genderId"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Sexo"
                labelBold
              />
            )}
          />
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Status"
                labelBold
              />
            )}
          />
          <FormField
            control={form.control}
            name="isPatient"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Paciente"
                labelBold
              />
            )}
          />
          <FormField
            control={form.control}
            name="isStudent"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Aluno"
                labelBold
              />
            )}
          />
          <FormField
            control={form.control}
            name="interestedInCourses"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Interessado em Cursos"
                labelBold
              />
            )}
          />
          <FormField
            control={form.control}
            name="receiveInfoMethodId"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Receber Informações Via"
                labelBold
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
              />
            )}
          />

          <FormField
            control={form.control}
            name="referralSourceId"
            render={({ field }) => (
              <FormInputWithLabel
                field={field}
                label="Por Qual Meio Nos Encontrou"
                labelBold
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
              />
            )}
          />

          {/* Se quiser que o botão ocupe uma linha inteira em qualquer breakpoint: 
        use col-span-1, col-span-2, ou col-span-3 de acordo com a necessidade */}
          <div className="col-span-1 flex justify-end sm:col-span-2 lg:col-span-3">
            <Button
              type="submit"
              variant="default"
              className="flex w-fit items-center text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
          </div>
        </form>
      </Form>

    </Section>
  )
}

// API FOR CEP https://viacep.com.br/ws/{cep}/json/