/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/formulario_de_avaliacao_curso_aprofundamento_em_mindfulness";
import { FormularioDeAvaliacaoCursoAprofundamentoMindfulnessI } from "@/types/formularioDeAvaliacaoCursoAprofundamentoMindfulness";
import { FormularioDeAvaliacaoCursoAprofundamentoMindfulnessFormSchemaType, formularioDeAvaliacaoCursoAprofundamentoMindfulnessSchema } from "@/schemas/forms/formulario_de_avaliacao_curso_aprofundamento_em_mindfulness";


export default function FormularioDeAvaliacaoCursoAprofundamentoEmMindfulnessViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const form = useForm<FormularioDeAvaliacaoCursoAprofundamentoMindfulnessFormSchemaType>({
        resolver: zodResolver(formularioDeAvaliacaoCursoAprofundamentoMindfulnessSchema),
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

    useFetchSubmission<FormularioDeAvaliacaoCursoAprofundamentoMindfulnessFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/formulario_de_avaliacao_curso_aprofundamento_em_mindfulness/submissions/${submissionId}`,
        mapResponse: (data: FormularioDeAvaliacaoCursoAprofundamentoMindfulnessI) => ({
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
        <Section title="Formulário de Avaliação Curso Aprofundamento em Mindfulness">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </Section>
    );
}


