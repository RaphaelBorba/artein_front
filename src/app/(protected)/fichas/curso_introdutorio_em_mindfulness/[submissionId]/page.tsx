/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import { useParams } from "next/navigation";
import { CursoIntrodutorioMindfulnessFormSchemaType, cursoIntrodutorioMindfulnessSchema } from "@/schemas/forms/cursoIntrodutorioMindfulness/cursoIntrodutorioMindfulnessSchema";
import type { CursoIntrodutorioMindfulnessI } from "@/types/cursoIntrodutorioMindfulness";
import FormFields from "@/components/forms/curso_introdutorio_em_mindfulness";

export default function CursoIntrodutorioViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

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

    useFetchSubmission<CursoIntrodutorioMindfulnessFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/curso_introdutorio_em_mindfulness/submissions/${submissionId}`,
        mapResponse: (data: CursoIntrodutorioMindfulnessI) => ({
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
        })
    });

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


