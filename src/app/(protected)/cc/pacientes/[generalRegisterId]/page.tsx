/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import GeneralRegisterFormFields from "../../cadastro_geral/generalRegisterFields";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { PsychologicalDisorders } from "@/types/smallModels";
import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { GeneralRegister } from "@/types/generalRegister";
import { calculateAge } from "@/lib/utils";
import { format } from "@react-input/mask";
import { masks } from "@/lib/masks";
import PatientsFormFields from "./patientsFormFields";
import { patientWithGeneralSchema, PatientWithGeneralSchemaType } from "@/schemas/patients/patientsSchema";
import { Patient } from "@/types/Patients";

export default function PatientViewPage() {
    const { generalRegisterId } = useParams<{ generalRegisterId: string }>();

    const { toggleLoader } = useLoader();
    const { toast } = useToast();

    const [psychologicalDisorders, setPsychologicalDisordersRes] = useState<PsychologicalDisorders[]>([]);

    const form = useForm<PatientWithGeneralSchemaType>({
        resolver: zodResolver(patientWithGeneralSchema),
        defaultValues: {
            // General Register Schema
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


    useEffect(() => {
        const fetchOptions = async () => {
            toggleLoader(true);
            try {
                const [
                    psychologicalDisordersRes,
                ] = await Promise.all([
                    api.get<PsychologicalDisorders[]>("/patient/psychological-disorders"),
                ]);
                setPsychologicalDisordersRes(psychologicalDisordersRes.data);
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
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        // Now load the general register data after options have loaded
        const fetchGeneralRegister = async () => {
            toggleLoader(true);
            try {
                const response = await api.get<{ patient?: Patient, generalRegister: GeneralRegister }>(`/patient/${generalRegisterId}`);
                const { generalRegister, patient } = response.data;
                // Map fetched numeric IDs to strings (and use "null" if no value)
                form.reset({
                    photo: generalRegister.photo || "",
                    fullName: generalRegister.fullName || "",
                    personType: generalRegister.personType || "null",
                    birthDate: generalRegister.birthDate ? new Date(generalRegister.birthDate) : undefined,
                    nationality: generalRegister.nationality || "",
                    placeOfBirth: generalRegister.placeOfBirth || "",
                    age: generalRegister.birthDate ? String(calculateAge(new Date(generalRegister.birthDate!).toISOString())) : '',
                    maritalStatusId: `${generalRegister.maritalStatusId}` || "null",
                    cpf: !isNaN(Number(generalRegister.cpf!)) ? format(generalRegister.cpf!, { mask: masks.cpf, replacement: masks.replacement }) : "",
                    cnpj: !isNaN(Number(generalRegister.cnpj!)) ? format(generalRegister.cnpj!, { mask: masks.cnpj, replacement: masks.replacement }) : "",
                    companyName: generalRegister.companyName || "",
                    educationLevelId: generalRegister.educationLevelId ? String(generalRegister.educationLevelId) : "null",
                    profession: generalRegister.profession || "",
                    workplace: generalRegister.workplace || "",
                    currentJob: generalRegister.currentJob || "",
                    phoneNumber: !isNaN(Number(generalRegister.phoneNumber!)) ? format(generalRegister.phoneNumber!, { mask: masks.cellphone, replacement: masks.replacement }) : '',
                    email: generalRegister.email || "",
                    firstContactDate: generalRegister.firstContactDate ? new Date(generalRegister.firstContactDate) : undefined,
                    cep: !isNaN(Number(generalRegister.cep!)) ? format(generalRegister.cep!, { mask: masks.cep, replacement: masks.replacement }) : '',
                    address: generalRegister.address || "",
                    complement: generalRegister.complement || "",
                    city: generalRegister.city || "",
                    neighborhood: generalRegister.neighborhood || "",
                    state: generalRegister.state || "",
                    country: generalRegister.country || "",
                    countryCode: String(generalRegister.countryCode) || '',
                    religion: generalRegister.religion || "",
                    genderId: generalRegister.genderId ? String(generalRegister.genderId) : "null",
                    // Converting booleans to string values ("1" for true, "0" for false)
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
                    previousPsychotherapyTreatment: patient?.previousPsychotherapyTreatment === null ?
                        "null" : patient?.previousPsychotherapyTreatment ? "1" : "0",
                    psychotherapyTreatmentDetails: patient?.psychotherapyTreatmentDetails || "",
                    pastPsychiatricTreatment: patient?.pastPsychiatricTreatment === null ?
                        "null" : patient?.pastPsychiatricTreatment ? "1" : "0",
                    pastPsychiatricTreatmentDate: patient?.pastPsychiatricTreatmentDate ?
                        new Date(patient?.pastPsychiatricTreatmentDate) : undefined,
                    currentPsychiatricTreatment: patient?.currentPsychiatricTreatment === null ?
                        "null" : patient?.currentPsychiatricTreatment ? "1" : "0",
                    currentPsychiatricTreatmentStartDate: patient?.currentPsychiatricTreatmentStartDate ?
                        new Date(patient?.currentPsychiatricTreatmentStartDate) : undefined,
                    psychiatrist: patient?.psychiatrist || "",
                    psychiatristPhone: !isNaN(Number(patient!.psychiatristPhone!)) ? format(patient!.psychiatristPhone!, { mask: masks.cellphone, replacement: masks.replacement }) : '',
                    currentMedications: patient?.currentMedications || "",
                    medicationDiagnosis: patient?.medicationDiagnosis || "",
                    generalMedicalTreatment: patient?.generalMedicalTreatment === null ?
                        "null" : patient?.generalMedicalTreatment ? "1" : "0",
                    generalMedicalTreatmentDetails: patient?.generalMedicalTreatmentDetails || "",
                    nonPsychiatricMedications: patient?.nonPsychiatricMedications || "",
                    ongoingLegalProcess: patient?.ongoingLegalProcess === null ?
                        "null" : patient?.ongoingLegalProcess ? "1" : "0",
                    legalProcessDetails: patient?.legalProcessDetails || "",
                    reasonForSeekingHelp: patient?.reasonForSeekingHelp || "",
                    psychologicalDisorders: patient?.psychologicalDisorders ? patient.psychologicalDisorders.length > 0 ? patient?.psychologicalDisorders : [] : [],
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

        // Optionally check if options are loaded before calling fetchGeneralRegister.
        if (psychologicalDisorders.length) {
            fetchGeneralRegister();
        }
    }, [generalRegisterId, psychologicalDisorders]);

    return (
        <Section title="Pacientes">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <GeneralRegisterFormFields
                        form={form}
                        communicationMethod={[]}
                        educationLevel={[]}
                        gender={[]}
                        maritalStatus={[]}
                        referralSource={[]}
                        mode="view"
                        readOnly
                        path="pacientes">
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
