/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/formulario_de_ava";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import type { FormularioDeAvaI } from "@/types/formularioDeAva";
import { FormularioDeAvaFormSchemaType, formularioDeAvaSchema } from "@/schemas/forms/formulario_de_ava";

export default function FormularioDeAvaViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const form = useForm<FormularioDeAvaFormSchemaType>({
        resolver: zodResolver(formularioDeAvaSchema),
        defaultValues: {
            fullName: "",
            birthDate: undefined,
            satisfactionLevel: "",
            likedMostAndHighlights: "",
            likedLeastDiscomfort: "",
            personalChange: "",
            takeHomeCare: "",
            tellAFriend: "",
            praiseOrComplaint: "",
            improvementSuggestions: "",
            nextTopics: "",
            wantsInfo: "",
            preferredMedia: "",
            authorizeUse: "",
        },
    });

    useFetchSubmission<FormularioDeAvaFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/formulario_de_ava/submissions/${submissionId}`,
        mapResponse: (data: FormularioDeAvaI) => ({
            fullName: data.fullName || "",
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
            satisfactionLevel: data.satisfactionLevel || "",
            likedMostAndHighlights: data.likedMostAndHighlights || "",
            likedLeastDiscomfort: data.likedLeastDiscomfort || "",
            personalChange: data.personalChange || "",
            takeHomeCare: data.takeHomeCare || "",
            tellAFriend: data.tellAFriend || "",
            praiseOrComplaint: data.praiseOrComplaint || "",
            improvementSuggestions: data.improvementSuggestions || "",
            nextTopics: data.nextTopics || "",
            wantsInfo: data.wantsInfo || "",
            preferredMedia: data.preferredMedia || "",
            authorizeUse: data.authorizeUse || "",
        })
    });

    return (
        <Section title="Formulário de Ava">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </Section>
    );
}
