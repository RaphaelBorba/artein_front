/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PrintableSection from "@/components/self/PrintableSection";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/formulario_de_avaliacao_p8s_mindfulness";
import { FormularioDeAvaliacaoP8sMindfulnessFormSchemaType, formularioDeAvaliacaoP8sMindfulnessSchema } from "@/schemas/forms/formulario_de_avaliacao_p8s_mindfulness";
import { FormularioDeAvaliacaoP8sMindfulnessI } from "@/types/formularioDeAvaliacaoP8sMindfulness";

export default function FormularioDeAvaliacaoP8sMindfulnessViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const form = useForm<FormularioDeAvaliacaoP8sMindfulnessFormSchemaType>({
        resolver: zodResolver(formularioDeAvaliacaoP8sMindfulnessSchema),
        defaultValues: {
            fullName: "",
            birthDate: undefined,
            satisfactionLevel: "",
            likedMostAndTakeaways: "",
            likedLeastSuggestions: "",
            personalChange: "",
            selfDifference: "",
            knowledgeMomentsImportance: "",
            tellAFriend: "",
            benefits: "",
            authorizeUse: "",
        },
    });

    useFetchSubmission<FormularioDeAvaliacaoP8sMindfulnessFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/formulario_de_avaliacao_p8s_mindfulness/submissions/${submissionId}`,
        mapResponse: (data: FormularioDeAvaliacaoP8sMindfulnessI) => ({
            fullName: data.fullName || "",
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
            satisfactionLevel: data.satisfactionLevel || "",
            likedMostAndTakeaways: data.likedMostAndTakeaways || "",
            likedLeastSuggestions: data.likedLeastSuggestions || "",
            personalChange: data.personalChange || "",
            selfDifference: data.selfDifference || "",
            knowledgeMomentsImportance: data.knowledgeMomentsImportance || "",
            tellAFriend: data.tellAFriend || "",
            benefits: data.benefits || "",
            authorizeUse: data.authorizeUse || "",
        })
    });

    return (
        <PrintableSection title="Formulário de Avaliação P8S em Mindfulness">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </PrintableSection>
    );
}


