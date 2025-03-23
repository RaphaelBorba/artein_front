/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import GeneralRegisterFormFields from "../generalRegisterFields";
import { useForm } from "react-hook-form";
import { generalRegisterSchema, GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { CommunicationMethod, EducationLevel, Gender, MaritalStatus, ReferralSource } from "@/types/smallModels";
import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { useParams } from "next/navigation";
import { GeneralRegister } from "@/types/generalRegister";
import { calculateAge } from "@/lib/utils";
import { format } from "@react-input/mask";
import { masks } from "@/lib/masks";

export default function GeneralRegisterViewPage() {
    const { generalRegisterId } = useParams<{ generalRegisterId: string }>();

    const { toggleLoader } = useLoader();
    const { toast } = useToast();

    const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([]);
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
    const [educationLevel, setEducationLevel] = useState<EducationLevel[]>([]);
    const [gender, setGender] = useState<Gender[]>([]);
    const [referralSource, setReferralSource] = useState<ReferralSource[]>([]);

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
    });


    useEffect(() => {
        const fetchOptions = async () => {
            toggleLoader(true);
            try {
                const [
                    communicationRes,
                    maritalRes,
                    educationRes,
                    genderRes,
                    referralRes
                ] = await Promise.all([
                    api.get<CommunicationMethod[]>("/general-register/communication-method"),
                    api.get<MaritalStatus[]>("/general-register/marital-status"),
                    api.get<EducationLevel[]>("/general-register/education-level"),
                    api.get<Gender[]>("/general-register/gender"),
                    api.get<ReferralSource[]>("/general-register/referral-source")
                ]);
                setCommunicationMethod(communicationRes.data);
                setMaritalStatus(maritalRes.data);
                setEducationLevel(educationRes.data);
                setGender(genderRes.data);
                setReferralSource(referralRes.data);
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
                const response = await api.get<GeneralRegister>(`general-register/${generalRegisterId}`);
                const data = response.data;
                // Map fetched numeric IDs to strings (and use "null" if no value)
                form.reset({
                    photo: data.photo || "",
                    fullName: data.fullName || "",
                    personType: data.personType || "null",
                    birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
                    nationality: data.nationality || "",
                    placeOfBirth: data.placeOfBirth || "",
                    age: String(calculateAge(new Date(data.birthDate!).toISOString())),
                    maritalStatusId: `${data.maritalStatusId}` || "null",
                    cpf: !isNaN(Number(data.cpf!)) ? format(data.cpf!, { mask: masks.cpf, replacement: masks.replacement }) : "",
                    cnpj: !isNaN(Number(data.cnpj!)) ? format(data.cnpj!, { mask: masks.cnpj, replacement: masks.replacement }) : "",
                    companyName: data.companyName || "",
                    educationLevelId: data.educationLevelId ? String(data.educationLevelId) : "null",
                    profession: data.profession || "",
                    workplace: data.workplace || "",
                    currentJob: data.currentJob || "",
                    phoneNumber: !isNaN(Number(data.phoneNumber!)) ? format(data.phoneNumber!, { mask: masks.cellphone, replacement: masks.replacement }) : '',
                    email: data.email || "",
                    firstContactDate: data.firstContactDate ? new Date(data.firstContactDate) : undefined,
                    cep: !isNaN(Number(data.cep!)) ? format(data.cep!, { mask: masks.cep, replacement: masks.replacement }) : '',
                    address: data.address || "",
                    complement: data.complement || "",
                    city: data.city || "",
                    neighborhood: data.neighborhood || "",
                    state: data.state || "",
                    country: data.country || "",
                    countryCode: data.countryCode,
                    religion: data.religion || "",
                    genderId: data.genderId ? String(data.genderId) : "null",
                    // Converting booleans to string values ("1" for true, "0" for false)
                    status: data.status ? "1" : "0",
                    isPatient: data.isPatient ? "1" : "0",
                    isStudent: data.isStudent ? "1" : "0",
                    interestedInCourses: data.interestedInCourses ? "1" : "0",
                    receiveInfoMethodId: data.receiveInfoMethodId ? String(data.receiveInfoMethodId) : "null",
                    additionalInfo: data.additionalInfo || "",
                    referralSourceId: data.referralSourceId ? String(data.referralSourceId) : "null",
                    otherReferral: data.otherReferral || "",
                    referredByName: data.referredByName || ""
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
        if (maritalStatus.length && educationLevel.length && gender.length && referralSource.length) {
            fetchGeneralRegister();
        }
    }, [generalRegisterId, maritalStatus, educationLevel, gender, referralSource]);

    return (
        <Section title="Cadastro Geral">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <GeneralRegisterFormFields
                        form={form}
                        communicationMethod={communicationMethod}
                        educationLevel={educationLevel}
                        gender={gender}
                        maritalStatus={maritalStatus}
                        referralSource={referralSource}
                        readOnly
                    />
                </form>
            </Form>
        </Section>
    );
}
