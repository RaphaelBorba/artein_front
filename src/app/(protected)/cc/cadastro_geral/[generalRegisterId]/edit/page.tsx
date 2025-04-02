 "use client";

import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import GeneralRegisterFormFields from "../../generalRegisterFields";

import api from "@/lib/api";
import { CommunicationMethod, EducationLevel, Gender, MaritalStatus, ReferralSource } from "@/types/smallModels";
import { generalRegisterSchema, GeneralRegisterSchemaType } from "@/schemas/generalRegister/generalRegisterSchema";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { GeneralRegister } from "@/types/generalRegister";
import { calculateAge, parseBoolean, parseField, parseNullableNumber } from "@/lib/utils";
import { format, unformat } from "@react-input/mask";
import { masks } from "@/lib/masks";

export default function GeneralRegisterViewPage() {
    const { generalRegisterId } = useParams<{ generalRegisterId: string }>();
    const router = useRouter();
    const { toggleLoader } = useLoader();
    const { toast } = useToast();

    // State for the general register and options
    const [generalRegister, setGeneralRegister] = useState<GeneralRegister | null>(null);
    const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([]);
    const [maritalStatus, setMaritalStatus] = useState<MaritalStatus[]>([]);
    const [educationLevel, setEducationLevel] = useState<EducationLevel[]>([]);
    const [gender, setGender] = useState<Gender[]>([]);
    const [referralSource, setReferralSource] = useState<ReferralSource[]>([]);

    // Initialize react-hook-form with Zod resolver and default values
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
            referredByName: ""
        },
    });

    // onSubmit handler with error handling and proper formatting
    const onSubmit = useCallback(async (values: GeneralRegisterSchemaType) => {
        console.log(values);
        toggleLoader(true);
        try {
            // Format fields based on masks
            values.cpf = parseField(values.cpf, masks.cpf);
            values.cnpj = parseField(values.cnpj, masks.cnpj);
            values.cep = parseField(values.cep, masks.cep);
            values.phoneNumber = parseField(values.phoneNumber, masks.cellphone);

            // Convert IDs from string to number (or undefined if "null")
            values.maritalStatusId = parseNullableNumber(values.maritalStatusId);
            values.educationLevelId = parseNullableNumber(values.educationLevelId);
            values.genderId = parseNullableNumber(values.genderId);
            values.referralSourceId = parseNullableNumber(values.referralSourceId);
            values.receiveInfoMethodId = parseNullableNumber(values.receiveInfoMethodId);

            // Convert boolean fields
            values.status = parseBoolean(values.status);
            values.isPatient = parseBoolean(values.isPatient);
            values.isStudent = parseBoolean(values.isStudent);
            values.interestedInCourses = parseBoolean(values.interestedInCourses);

            delete values.age;

            if (generalRegister) {
                await api.patch(`/general-register/${generalRegister.id}`, values);
                router.push('/cc/cadastro_geral');
            } else {
                toast({ title: "Erro", description: "Registro geral não encontrado.", variant: "destructive" });
            }
        } catch (error) {
            console.error("Error updating general register:", error);
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao atualizar o registro geral.",
                variant: "destructive"
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
    }, [toggleLoader, toast]);

    // Fetch general register data when options are loaded and generalRegisterId is available
    useEffect(() => {
        if (!generalRegisterId) return;
        if (!(maritalStatus.length && educationLevel.length && gender.length && referralSource.length)) return;

        const fetchGeneralRegister = async () => {
            toggleLoader(true);
            try {
                const response = await api.get<GeneralRegister>(`general-register/${generalRegisterId}`);
                const data = response.data;
                setGeneralRegister(data);

                form.reset({
                    photo: data.photo || "",
                    fullName: data.fullName || "",
                    personType: data.personType || "null",
                    birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
                    nationality: data.nationality || "",
                    placeOfBirth: data.placeOfBirth || "",
                    age: data.birthDate ? String(calculateAge(new Date(data.birthDate).toISOString())) : '',
                    maritalStatusId: data.maritalStatusId ? String(data.maritalStatusId) : "null",
                    cpf: (data.cpf != null && !isNaN(Number(data.cpf)))
                        ? format(data.cpf, { mask: masks.cpf, replacement: masks.replacement })
                        : '',
                    cnpj: (data.cnpj != null && !isNaN(Number(data.cnpj)))
                        ? format(data.cnpj, { mask: masks.cnpj, replacement: masks.replacement })
                        : '',
                    companyName: data.companyName || "",
                    educationLevelId: data.educationLevelId ? String(data.educationLevelId) : "null",
                    profession: data.profession || "",
                    workplace: data.workplace || "",
                    currentJob: data.currentJob || "",
                    phoneNumber: (data.phoneNumber != null && !isNaN(Number(data.phoneNumber)))
                        ? format(data.phoneNumber, { mask: masks.cellphone, replacement: masks.replacement })
                        : '',
                    email: data.email || "",
                    firstContactDate: data.firstContactDate ? new Date(data.firstContactDate) : undefined,
                    cep: (data.cep != null && !isNaN(Number(data.cep)))
                        ? format(data.cep, { mask: masks.cep, replacement: masks.replacement })
                        : '',
                    address: data.address || "",
                    complement: data.complement || "",
                    city: data.city || "",
                    neighborhood: data.neighborhood || "",
                    state: data.state || "",
                    country: data.country || "",
                    countryCode: data.countryCode ? String(data.countryCode) : "",
                    religion: data.religion || "",
                    genderId: data.genderId ? String(data.genderId) : "null",
                    status: data.status === null ? "null" : data.status ? "1" : "0",
                    isPatient: data.isPatient === null ? "null" : data.isPatient ? "1" : "0",
                    isStudent: data.isStudent === null ? "null" : data.isStudent ? "1" : "0",
                    interestedInCourses: data.interestedInCourses === null ? "null" : data.interestedInCourses ? "1" : "0",
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

        fetchGeneralRegister();
    }, [generalRegisterId, maritalStatus, educationLevel, gender, referralSource, form, toggleLoader, toast]);

    // Watch CEP changes and fetch address data if valid
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "cep") {
                const cepMask = value.cep;
                if (typeof cepMask !== "string") return;

                const cep = unformat(cepMask, { mask: masks.cep, replacement: masks.replacement });
                if (cep.length !== 8) return;

                (async () => {
                    toggleLoader(true);
                    try {
                        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                        if (data?.erro) {
                            toast({ title: "CEP Inválido!", variant: "destructive" });
                            return;
                        }
                        // Set address fields from API response
                        form.setValue("address", data.logradouro || "");
                        form.setValue("city", data.localidade || "");
                        form.setValue("neighborhood", data.bairro || "");
                        form.setValue("state", data.uf || "");
                    } catch (error) {
                        console.error("Error fetching address data:", error);
                        toast({
                            title: "Erro na API de CEP!",
                            description: "Contate Suporte",
                            variant: "destructive"
                        });
                    } finally {
                        toggleLoader(false);
                    }
                })();
            }
        });
        return () => subscription.unsubscribe();
    }, [form, toggleLoader, toast]);

    // Watch birthDate changes to update age
    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "birthDate" && value.birthDate) {
                form.setValue("age", String(calculateAge(new Date(value.birthDate).toISOString())));
            }
        });
        return () => subscription.unsubscribe();
    }, [form]);

    return (
        <Section title="Cadastro Geral">
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
                    />
                </form>
            </Form>
        </Section>
    );
}
