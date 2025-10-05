/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import GeneralRegisterFormFields from "../../../cadastro_geral/generalRegisterFields";

import api from "@/lib/api";
import { CommunicationMethod, EducationLevel, Gender, MaritalStatus, PsychologicalDisorders, ReferralSource } from "@/types/smallModels";
import { GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { GeneralRegister } from "@/types/generalRegister";
import { calculateAge, parseBoolean, parseField, parseNullableNumber } from "@/lib/utils";
import { format, unformat } from "@react-input/mask";
import { masks } from "@/lib/masks";
import PatientsFormFields from "../patientsFormFields";
import { patientWithGeneralSchema, PatientWithGeneralSchemaType } from "@/schemas/patients/patientsSchema";
import { Patient } from "@/types/Patients";

export default function GeneralRegisterViewPage() {
  const { generalRegisterId } = useParams<{ generalRegisterId: string }>();
  const router = useRouter();
  const { toggleLoader } = useLoader();
  const { toast } = useToast();

  // State for the general register and options
  const [generalRegister, setGeneralRegister] = useState<GeneralRegister | null>(null);
  const [patient, setPatient] = useState<Patient | null>(null);
  const [psychologicalDisorders, setPsychologicalDisordersRes] = useState<PsychologicalDisorders[]>([]);
  const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([]);
  const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
  const [educationLevel, setEducationLevel] = useState<EducationLevel[]>([]);
  const [gender, setGender] = useState<Gender[]>([]);
  const [referralSource, setReferralSource] = useState<ReferralSource[]>([]);



  // Initialize react-hook-form with Zod resolver and default values
  const form = useForm<PatientWithGeneralSchemaType>({
    resolver: zodResolver(patientWithGeneralSchema),
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
      countryCode: "",
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
      referredByName: "",

      // Patients Schema
      attendanceType: "null",
      attendanceLocation: "",
      familyOfOrigin: "",
      currentFamily: "",
      peopleInHousehold: "",
      previousPsychotherapyTreatment: "null",
      psychotherapyTreatmentDetails: "",
      pastPsychiatricTreatment: "null",
      pastPsychiatricTreatmentDate: undefined,
      currentPsychiatricTreatment: "null",
      currentPsychiatricTreatmentStartDate: undefined,
      psychiatrist: "",
      psychiatristPhone: "",
      currentMedications: "",
      medicationDiagnosis: "",
      generalMedicalTreatment: "null",
      generalMedicalTreatmentDetails: "",
      nonPsychiatricMedications: "",
      ongoingLegalProcess: "null",
      legalProcessDetails: "",
      reasonForSeekingHelp: "",
      psychologicalDisorders: [],
      observations: "",
      physicalAndMentalDevelopment: "",
      educationalAndProfessionalHistory: "",
      familyAndAffectiveHistory: "",
      patientComplaintHistory: "",
      therapyExpectations: "",
      medicalRecord: "",
    },
  });

  // onSubmit handler with error handling and proper formatting
  const onSubmit = useCallback<
    (values: Partial<PatientWithGeneralSchemaType>) => Promise<void>
  >(async (values) => {
    toggleLoader(true);

    try {
      if (!generalRegister) {
        toast({
          title: "Erro",
          description: "Registro geral não encontrado.",
          variant: "destructive",
        });
        return;
      }

      const {
        fullName,
        email,
        photo,
        personType,
        birthDate,
        nationality,
        placeOfBirth,
        age,
        maritalStatusId,
        cpf,
        cnpj,
        companyName,
        educationLevelId,
        profession,
        workplace,
        currentJob,
        phoneNumber,
        firstContactDate,
        cep,
        address,
        complement,
        city,
        neighborhood,
        state,
        country,
        countryCode,
        religion,
        genderId,
        status,
        isPatient,
        isStudent,
        interestedInCourses,
        receiveInfoMethodId,
        additionalInfo,
        referralSourceId,
        otherReferral,
        referredByName,
        ...rest
      } = values;

      const payload = {
        ...rest,
        generalRegisterId: generalRegister.id,
        psychiatristPhone: rest.psychiatristPhone
          ? parseField(rest.psychiatristPhone, masks.cellphone)
          : undefined,
        previousPsychotherapyTreatment: parseBoolean(
          rest.previousPsychotherapyTreatment
        ),
        pastPsychiatricTreatment: parseBoolean(
          rest.pastPsychiatricTreatment
        ),
        ongoingLegalProcess: parseBoolean(rest.ongoingLegalProcess),
        generalMedicalTreatment: parseBoolean(rest.generalMedicalTreatment),
        currentPsychiatricTreatment: parseBoolean(
          rest.currentPsychiatricTreatment
        ),
      };

      await api.post("/patient/", payload);
      router.push("/cc/pacientes");
    } catch (error) {
      console.error("Error saving patient:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar o paciente.",
        variant: "destructive",
      });
    } finally {
      toggleLoader(false);
    }
  }, [generalRegister, router, toggleLoader, toast]);

  // Fetch options data on mount
  useEffect(() => {
    const fetchOptions = async () => {
      toggleLoader(true);
      try {
        const [
          psychologicalDisordersRes,
          communicationRes,
          maritalRes,
          educationRes,
          genderRes,
          referralRes
        ] = await Promise.all([
          api.get<PsychologicalDisorders[]>("/patient/psychological-disorders"),
          api.get<CommunicationMethod[]>("/general-register/communication-method"),
          api.get<MaritalStatus[]>("/general-register/marital-status"),
          api.get<EducationLevel[]>("/general-register/education-level"),
          api.get<Gender[]>("/general-register/gender"),
          api.get<ReferralSource[]>("/general-register/referral-source")
        ]);
        setPsychologicalDisordersRes(psychologicalDisordersRes.data);
        setCommunicationMethod(communicationRes.data);
        setMaritalStatus(maritalRes.data);
        setEducationLevel(educationRes.data);
        setGender(genderRes.data);
        setReferralSource(referralRes.data);
      } catch (error) {
        console.error("Error fetching options:", error);
        if (axios.isAxiosError(error) && error.response?.status !== 401) {
          toast({
            title: "Erro",
            description: JSON.stringify(error.response?.data),
            variant: "destructive"
          });
        } else {
          toast({
            title: "Erro",
            description: JSON.stringify(error),
            variant: "destructive"
          });
        }
      } finally {
        toggleLoader(false);
      }
    };

    fetchOptions();
  }, []);

  // Fetch general register data when options are loaded and generalRegisterId is available
  useEffect(() => {
    if (!generalRegisterId) return;
    if (!(maritalStatus.length &&
      educationLevel.length &&
      gender.length &&
      referralSource.length &&
      psychologicalDisorders.length)) return;

    const fetchGeneralRegister = async () => {
      toggleLoader(true);
      try {
        const response = await api.get<{ patient: Patient, generalRegister: GeneralRegister }>(`/patient/${generalRegisterId}`);
        const { generalRegister, patient } = response.data;
        setGeneralRegister(generalRegister);
        setPatient(patient)

        form.reset({
          photo: generalRegister.photo || "",
          fullName: generalRegister.fullName || "",
          personType: generalRegister.personType || "null",
          birthDate: generalRegister.birthDate ? new Date(generalRegister.birthDate) : undefined,
          nationality: generalRegister.nationality || "",
          placeOfBirth: generalRegister.placeOfBirth || "",
          age: generalRegister.birthDate ? String(calculateAge(new Date(generalRegister.birthDate).toISOString())) : '',
          maritalStatusId: generalRegister.maritalStatusId ? String(generalRegister.maritalStatusId) : "null",
          cpf: (generalRegister.cpf != null && !isNaN(Number(generalRegister.cpf)))
            ? format(generalRegister.cpf, { mask: masks.cpf, replacement: masks.replacement })
            : '',
          cnpj: (generalRegister.cnpj != null && !isNaN(Number(generalRegister.cnpj)))
            ? format(generalRegister.cnpj, { mask: masks.cnpj, replacement: masks.replacement })
            : '',
          companyName: generalRegister.companyName || "",
          educationLevelId: generalRegister.educationLevelId ? String(generalRegister.educationLevelId) : "null",
          profession: generalRegister.profession || "",
          workplace: generalRegister.workplace || "",
          currentJob: generalRegister.currentJob || "",
          phoneNumber: (generalRegister.phoneNumber != null && !isNaN(Number(generalRegister.phoneNumber)))
            ? format(generalRegister.phoneNumber, { mask: masks.cellphone, replacement: masks.replacement })
            : '',
          email: generalRegister.email || "",
          firstContactDate: generalRegister.firstContactDate ? new Date(generalRegister.firstContactDate) : undefined,
          cep: (generalRegister.cep != null && !isNaN(Number(generalRegister.cep)))
            ? format(generalRegister.cep, { mask: masks.cep, replacement: masks.replacement })
            : '',
          address: generalRegister.address || "",
          complement: generalRegister.complement || "",
          city: generalRegister.city || "",
          neighborhood: generalRegister.neighborhood || "",
          state: generalRegister.state || "",
          country: generalRegister.country || "",
          countryCode: generalRegister.countryCode ? String(generalRegister.countryCode) : "",
          religion: generalRegister.religion || "",
          genderId: generalRegister.genderId ? String(generalRegister.genderId) : "null",
          status: generalRegister.status === null ? "null" : generalRegister.status ? "1" : "0",
          isPatient: generalRegister.isPatient === null ? "null" : generalRegister.isPatient ? "1" : "0",
          isStudent: generalRegister.isStudent === null ? "null" : generalRegister.isStudent ? "1" : "0",
          interestedInCourses: generalRegister.interestedInCourses === null ? "null" : generalRegister.interestedInCourses ? "1" : "0",
          receiveInfoMethodId: generalRegister.receiveInfoMethodId ? String(generalRegister.receiveInfoMethodId) : "null",
          additionalInfo: generalRegister.additionalInfo || "",
          referralSourceId: generalRegister.referralSourceId ? String(generalRegister.referralSourceId) : "null",
          otherReferral: generalRegister.otherReferral || "",
          referredByName: generalRegister.referredByName || "",
          // Patients Fields
          attendanceLocation: patient?.attendanceLocation || "",
          attendanceType: patient?.attendanceLocation || "null",
          familyOfOrigin: patient?.familyOfOrigin || "",
          currentFamily: patient?.currentFamily || "",
          peopleInHousehold: String(patient?.peopleInHousehold) || '',
          previousPsychotherapyTreatment: patient?.previousPsychotherapyTreatment === null || patient?.previousPsychotherapyTreatment === undefined ?
            "null" : patient?.previousPsychotherapyTreatment ? "1" : "0",
          psychotherapyTreatmentDetails: patient?.psychotherapyTreatmentDetails || "",
          pastPsychiatricTreatment: patient?.pastPsychiatricTreatment === null || patient?.pastPsychiatricTreatment === undefined ?
            "null" : patient?.pastPsychiatricTreatment ? "1" : "0",
          pastPsychiatricTreatmentDate: patient?.pastPsychiatricTreatmentDate ?
            new Date(patient?.pastPsychiatricTreatmentDate) : undefined,
          currentPsychiatricTreatment: patient?.currentPsychiatricTreatment === null || patient?.currentPsychiatricTreatment === undefined ?
            "null" : patient?.currentPsychiatricTreatment ? "1" : "0",
          currentPsychiatricTreatmentStartDate: patient?.currentPsychiatricTreatmentStartDate ?
            new Date(patient?.currentPsychiatricTreatmentStartDate) : undefined,
          psychiatrist: patient?.psychiatrist || "",
          psychiatristPhone: (patient?.psychiatristPhone != null && !isNaN(Number(patient.psychiatristPhone)))
            ? format(patient.psychiatristPhone, { mask: masks.cellphone, replacement: masks.replacement })
            : '',
          currentMedications: patient?.currentMedications || "",
          medicationDiagnosis: patient?.medicationDiagnosis || "",
          generalMedicalTreatment: patient?.generalMedicalTreatment === null || patient?.generalMedicalTreatment === undefined ?
            "null" : patient?.generalMedicalTreatment ? "1" : "0",
          generalMedicalTreatmentDetails: patient?.generalMedicalTreatmentDetails || "",
          nonPsychiatricMedications: patient?.nonPsychiatricMedications || "",
          ongoingLegalProcess: patient?.ongoingLegalProcess === null || patient?.ongoingLegalProcess === undefined ?
            "null" : patient?.ongoingLegalProcess ? "1" : "0",
          legalProcessDetails: patient?.legalProcessDetails || "",
          reasonForSeekingHelp: patient?.reasonForSeekingHelp || "",
          psychologicalDisorders: patient?.psychologicalDisorders ? patient.psychologicalDisorders.length > 0 ? patient?.psychologicalDisorders.map(v => v.value) : [] : [],
          observations: patient?.observations || "",
          physicalAndMentalDevelopment: patient?.physicalAndMentalDevelopment || "",
          educationalAndProfessionalHistory: patient?.educationalAndProfessionalHistory || "",
          familyAndAffectiveHistory: patient?.familyAndAffectiveHistory || "",
          patientComplaintHistory: patient?.patientComplaintHistory || "",
          therapyExpectations: patient?.therapyExpectations || "",
          medicalRecord: patient?.medicalRecord || "",
        });
      } catch (error) {
        console.error("Error fetching general register:", error);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados do cadastro.",
          variant: "destructive"
        });
      } finally {
        toggleLoader(false);
      }
    };

    fetchGeneralRegister();
  }, [generalRegisterId, maritalStatus, educationLevel, gender, referralSource, psychologicalDisorders, form, toggleLoader, toast]);

  return (
    <Section title="Pacientes">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
          <GeneralRegisterFormFields
            form={form}
            communicationMethod={communicationMethod}
            educationLevel={educationLevel}
            gender={gender}
            maritalStatus={maritalStatus}
            referralSource={referralSource}
            mode="edit"
            readOnly
            path="pacientes"
          >
            <PatientsFormFields
              form={form}
              mode="edit"
              path="pacientes"
              psychologicalDisorders={psychologicalDisorders}
            />
          </GeneralRegisterFormFields>
        </form>
      </Form>
    </Section>
  );
}
