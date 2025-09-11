/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useEffect } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { CursoIntrodutorioMindfulnessFormSchemaType, cursoIntrodutorioMindfulnessSchema } from "@/schemas/cursoIntrodutorioMindfulness/cursoIntrodutorioMindfulnessSchema";
import type { CursoIntrodutorioMindfulnessI } from "@/types/cursoIntrodutorioMindfulness";
import FormFields from "@/components/forms/curso_introdutorio_em_mindfulness";

export default function CursoIntrodutorioViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const { toggleLoader } = useLoader();
    const { toast } = useToast();

    const form = useForm<CursoIntrodutorioMindfulnessFormSchemaType>({
        resolver: zodResolver(cursoIntrodutorioMindfulnessSchema),
        defaultValues: {
            fullName: "",
            profession: "",
            birthDate: undefined,
            cep: "",
            address: "",
            city: "",
            district: "",
            state: "",
            phone: "",
            email: "",
            indication: "",
            payment: "null",
            otherPayment: "",
            paymentMedium: "null",
            discount: "null",
            otherDiscounts: "",
            bankAndInitialDepositDate: "",
            depositData: `•	BANCO DO BRASIL \n
            Ag. 3111-9\n
            C.C. 21.000-5\n

            •	BANCO BRADESCO\n
            Ag. 2788\n
            C.C. 15.707-4\n

            CPF 072227657-51\n
            Titular: Angélica Gurjão Borba`,
            whyCourse: "",
            meditationExperience: "",
            mindfulnessContact: "",
            psychotherapyTreatment: "",
            specialNeeds: "",
            expectations: "",
        },
    });

    useEffect(() => {
        const fetchRecord = async () => {
            toggleLoader(true);
            try {
                const response = await api.get<CursoIntrodutorioMindfulnessI>(`/forms/curso_introdutorio_em_mindfulness/submissions/${submissionId}`);
                const data = response.data;
                form.reset({
                    fullName: data.fullName || "",
                    profession: data.profession || "",
                    birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
                    cep: data.cep || "",
                    address: data.address || "",
                    city: data.city || "",
                    district: data.district || "",
                    state: data.state || "",
                    phone: data.phone || "",
                    email: data.email || "",
                    indication: data.indication || "",
                    payment: data.payment || "",
                    otherPayment: data.otherPayment || "",
                    paymentMedium: data.paymentMedium || "",
                    discount: data.discount || "",
                    otherDiscounts: data.otherDiscounts || "",
                    bankAndInitialDepositDate: data.bankAndInitialDepositDate || "",
                    depositData: data.depositData || "",
                    whyCourse: data.whyCourse || "",
                    meditationExperience: data.meditationExperience || "",
                    mindfulnessContact: data.mindfulnessContact || "",
                    psychotherapyTreatment: data.psychotherapyTreatment || "",
                    specialNeeds: data.specialNeeds || "",
                    expectations: data.expectations || "",
                });
            } catch (error) {
                console.error("Error fetching record:", error);
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados.",
                    variant: "destructive",
                });
            } finally {
                toggleLoader(false);
            }
        };

        fetchRecord();
    }, [submissionId]);

    return (
        <Section title="Curso Introdutório de Mindfulness">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </Section>
    );
}


