/* eslint-disable react-hooks/exhaustive-deps */
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
import FormMaskInputWithLabel from "@/components/self/FormMaskInputWIthLabel";
import { masks } from "@/lib/masks";
import { unformat } from "@react-input/mask";
import FormSelectWithLabel from "@/components/self/FormSelectWithLabel";
import FormDatePicker from "@/components/self/FormDatePicker";
import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { CommunicationMethod, EducationLevel, Gender, MaritalStatus, ReferralSource } from "@/types/smallModels";
import { calculateAge } from "@/lib/utils";

export default function GeneralRegisterForm() {

  const form = useForm<GeneralRegisterSchemaType>({
    resolver: zodResolver(generalRegisterSchema),
    defaultValues: {
      photo: "",
      fullName: "",
      personType: "null",
      birthDate: undefined,
      nationality: "",
      placeOfBirth: "",
      age: "",
      maritalStatusId: "null",
      cpf: "",
      cnpj: "",
      companyName: "",
      educationLevelId: "null",
      profession: "",
      workplace: "",
      currentJob: "",
      phoneNumber: "",
      email: "",
      firstContactDate: undefined,
      cep: "",
      address: "",
      complement: "",
      city: "",
      neighborhood: "",
      state: "",
      country: "",
      countryCode: 0,
      religion: "",
      genderId: "null",
      status: "null",
      isPatient: "null",
      isStudent: "null",
      interestedInCourses: "null",
      receiveInfoMethodId: "null",
      additionalInfo: "",
      referralSourceId: "null",
      otherReferral: "",
      referredByName: ""
    },
  })

  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([])
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([])
  const [educationLevel, setEducationLevel] = useState<EducationLevel[]>([])
  const [gender, setGender] = useState<Gender[]>([])
  const [referralSource, setReferralSource] = useState<ReferralSource[]>([])

  function onSubmit(values: GeneralRegisterSchemaType) {

    const parseField = (
      value: unknown,
      mask: string
    ): string | undefined => {
      return typeof value === 'string'
        ? unformat(value, { mask, replacement: masks.replacement })
        : undefined;
    };

    const parseNullableNumber = (value: string | undefined): string | undefined =>
      value === "null" ? undefined : value;

    const parseBoolean = (value: string | undefined): string | undefined =>
      value === '1' ? 'true' : value === '0' ? 'false' : undefined;

    values.cpf = parseField(values.cpf, masks.cpf);
    values.cnpj = parseField(values.cnpj, masks.cnpj);
    values.cep = parseField(values.cep, masks.cep);
    values.phoneNumber = parseField(values.phoneNumber, masks.cellphone);

    // Convert IDs to numbers, treating "null" as undefined
    values.maritalStatusId = parseNullableNumber(values.maritalStatusId);
    values.educationLevelId = parseNullableNumber(values.educationLevelId);
    values.genderId = parseNullableNumber(values.genderId);
    values.referralSourceId = parseNullableNumber(values.referralSourceId);
    values.receiveInfoMethodId = parseNullableNumber(values.receiveInfoMethodId);

    values.status = parseBoolean(values.status);
    values.isPatient = parseBoolean(values.isPatient);
    values.isStudent = parseBoolean(values.isStudent);
    values.interestedInCourses = parseBoolean(values.interestedInCourses);
    console.log(values)
    delete values.age
    api.post('/general-register', values)
  }

  const fetchCommunicationMethods = async () => {
    const response = await api.get<CommunicationMethod[]>("/general-register/communication-method")
    setCommunicationMethod(response.data)
  }

  const fetchMaritalStatus = async () => {
    const response = await api.get<CommunicationMethod[]>("/general-register/marital-status")
    setMaritalStatus(response.data)
  }

  const fetchEducationLevel = async () => {
    const response = await api.get<CommunicationMethod[]>("/general-register/education-level")
    setEducationLevel(response.data)
  }

  const fetchGender = async () => {
    const response = await api.get<CommunicationMethod[]>("/general-register/gender")
    setGender(response.data)
  }

  const fetchReferralSource = async () => {
    const response = await api.get<CommunicationMethod[]>("/general-register/referral-source")
    setReferralSource(response.data)
  }

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true)
      try {
        await Promise.all([
          fetchCommunicationMethods(),
          fetchMaritalStatus(),
          fetchEducationLevel(),
          fetchGender(),
          fetchReferralSource()
        ])
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status !== 401) {
            toast({
              title: "Erro",
              description: JSON.stringify(error?.response?.data),
            });
          }
        } else {
          console.log(error)
          toast({
            title: "Erro",
            description: JSON.stringify(error),
          });
        }
      } finally {
        toggleLoader(false);
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    async function fetchAddressByCep() {
      const cepMask = form.getValues('cep');

      if (typeof cepMask !== 'string') return;

      const cep = unformat(cepMask, { mask: masks.cep, replacement: masks.replacement });
      if (cep.length !== 8) return;

      toggleLoader(true);

      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (data?.erro) {
          toast({
            title: "CEP Inválido!",
            variant: "destructive"
          })
        }
        form.setValue('address', data?.logradouro)
        form.setValue('city', data?.localidade)
        form.setValue('neighborhood', data?.bairro)
        form.setValue('state', data?.estado)
        form.setValue('address', data?.logradouro)
      } catch (error) {
        console.error('Error fetching address data:', error);
        toast({
          title: "Erro na API de CEP!",
          description: "Contate Suporte",
          variant: "destructive"
        })
      } finally {
        toggleLoader(false);
      }
    }

    fetchAddressByCep();
  }, [form.watch('cep')]);

  useEffect(() => {
    const date = form.watch('birthDate') as Date | undefined
    if (date) {
      form.setValue('age', String(calculateAge(date.toISOString())))
    }
  }, [form.watch('birthDate')])

  return (
    <Section title="Cadastro Geral">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
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
              <FormSelectWithLabel
                field={field}
                labelBold
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
              <FormSelectWithLabel
                field={field}
                labelText="Estado Civil"
                labelBold
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
              <FormSelectWithLabel
                field={field}
                labelText="Escolaridade"
                labelBold
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
            name="firstContactDate"
            render={({ field }) => (
              <FormDatePicker
                field={field}
                labelText="Data 1º Contato"
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
              <FormMaskInputWithLabel
                field={field}
                label="CEP"
                labelBold
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
              <FormSelectWithLabel
                field={field}
                labelText="Por Qual Meio Nos Encontrou?"
                labelBold
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