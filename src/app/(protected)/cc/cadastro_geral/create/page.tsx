/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Section from "@/components/self/Section";
import { generalRegisterSchema, GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { masks } from "@/lib/masks";
import { unformat } from "@react-input/mask";
import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { CommunicationMethod, EducationLevel, Gender, MaritalStatus, ReferralSource } from "@/types/smallModels";
import { calculateAge, parseBoolean, parseField, parseNullableNumber } from "@/lib/utils";
import GeneralRegisterFormFields from "../generalRegisterFields";

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
    delete values.age
    api.post('/general-register', values)
  }

  const fetchCommunicationMethods = async () => {
    const response = await api.get<CommunicationMethod[]>("/general-register/communication-method")
    setCommunicationMethod(response.data)
  }

  const fetchMaritalStatus = async () => {
    const response = await api.get<MaritalStatus[]>("/general-register/marital-status")
    setMaritalStatus(response.data)
  }

  const fetchEducationLevel = async () => {
    const response = await api.get<EducationLevel[]>("/general-register/education-level")
    setEducationLevel(response.data)
  }

  const fetchGender = async () => {
    const response = await api.get<Gender[]>("/general-register/gender")
    setGender(response.data)
  }

  const fetchReferralSource = async () => {
    const response = await api.get<ReferralSource[]>("/general-register/referral-source")
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
          <GeneralRegisterFormFields
            form={form}
            communicationMethod={communicationMethod}
            educationLevel={educationLevel}
            gender={gender}
            maritalStatus={maritalStatus}
            referralSource={referralSource}
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
