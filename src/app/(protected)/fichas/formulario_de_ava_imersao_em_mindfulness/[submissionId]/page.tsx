/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PrintableSection from "@/components/self/PrintableSection";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/formulario_de_ava_imersao_em_mindfulness";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import type { FormularioDeAvaImersaoEmMindfulnessI } from "@/types/formularioDeAvaImersaoEmMindfulness";
import { FormularioDeAvaImersaoEmMindfulnessFormSchemaType, formularioDeAvaImersaoEmMindfulnessSchema } from "@/schemas/forms/formulario_de_ava_imersao_em_mindfulness";

export default function FormularioDeAvaImersaoEmMindfulnessViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const form = useForm<FormularioDeAvaImersaoEmMindfulnessFormSchemaType>({
        resolver: zodResolver(formularioDeAvaImersaoEmMindfulnessSchema),
        defaultValues: {
            fullName: "",
            birthDate: undefined,
            satisfactionLevel: "",
            likedMostAndHighlights: "",
            likedLeastSuggestions: "",
            personalChange: "",
            selfDifference: "",
            knowledgeMomentsImportance: "",
            tellAFriend: "",
            benefitsBeyondPrevious: "",
            personalPracticeStimulation: "",
            authorizeUse: "",
        },
    });

    useFetchSubmission<FormularioDeAvaImersaoEmMindfulnessFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/formulario_de_ava_imersao_em_mindfulness/submissions/${submissionId}`,
        mapResponse: (data: FormularioDeAvaImersaoEmMindfulnessI) => ({
            fullName: data.fullName || "",
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
            satisfactionLevel: data.satisfactionLevel || "",
            likedMostAndHighlights: data.likedMostAndHighlights || "",
            likedLeastSuggestions: data.likedLeastSuggestions || "",
            personalChange: data.personalChange || "",
            selfDifference: data.selfDifference || "",
            knowledgeMomentsImportance: data.knowledgeMomentsImportance || "",
            tellAFriend: data.tellAFriend || "",
            benefitsBeyondPrevious: data.benefitsBeyondPrevious || "",
            personalPracticeStimulation: data.personalPracticeStimulation || "",
            authorizeUse: data.authorizeUse || "",
        })
    });

    return (
        <PrintableSection title="Formulário de Ava Imersão em Mindfulness">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </PrintableSection>
    );
}


