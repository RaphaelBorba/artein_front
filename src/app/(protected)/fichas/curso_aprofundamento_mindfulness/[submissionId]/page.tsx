/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/curso_aprofundamento_mindfulness";
import { CursoAprofundamentoMindfulnessFormSchemaType, cursoAprofundamentoMindfulnessSchema } from "@/schemas/forms/curso_aprofundamento_mindfulness";
import { CursoAprofundamentoMindfulnessI } from "@/types/cursoAprofundamentoMindfulness";


export default function CursoIntrodutorioViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const form = useForm<CursoAprofundamentoMindfulnessFormSchemaType>({
        resolver: zodResolver(cursoAprofundamentoMindfulnessSchema),
        defaultValues: {
            fullName: "",
            cep: "",
            address: "",
            city: "",
            district: "",
            state: "",
            phone: "",
            email: "",
            alreadyParticipatedInCourse: "",
            alreadyParticipatedInCourseIntrodutorio: "",
            payment: "null",
            bankAndInitialDepositDate: "",
            paymentMedium: "null",
            paymentInstructions: "Para garantir sua vaga no curso é necessário o pagamento de um depósito/transferência do valor combinado a ser enviado por whatsapp (anterior ao início do curso) e o pagamento do restante do valor no primeiro dia de curso (em dinheiro ou cheques pré-datados), juntamente com a entrega do presente formulário preenchido.",
            depositData: `•	BANCO DO BRASIL \n
            Ag. 3111-9\n
            C.C. 21.000-5\n

            •	BANCO BRADESCO\n
            Ag. 2788\n
            C.C. 15.707-4\n

            CPF 072227657-51\n
            Titular: Angélica Gurjão Borba`,
            whyCourse: "",
            keptTraining: "",
            frequentlyPracticed: "",
            otherContact: "",
            otherContactDescription: "",
            psychotherapyTreatment: "",
            specialNeeds: "",
            greatestGain: "",
            expectations: "",
        },
    });

    useFetchSubmission<CursoAprofundamentoMindfulnessFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/curso_aprofundamento_mindfulness/submissions/${submissionId}`,
        mapResponse: (data: CursoAprofundamentoMindfulnessI) => ({
            fullName: data.fullName || "",
            phone: data.phone || "",
            cep: data.cep || "",
            address: data.address || "",
            city: data.city || "",
            district: data.district || "",
            state: data.state || "",
            email: data.email || "",
            alreadyParticipatedInCourse: data.alreadyParticipatedInCourse || "",
            alreadyParticipatedInCourseIntrodutorio: data.alreadyParticipatedInCourseIntrodutorio || "",
            payment: data.payment || "",
            paymentMedium: data.paymentMedium || "",
            paymentInstructions: data.paymentInstructions || "",
            bankAndInitialDepositDate: data.bankAndInitialDepositDate || "",
            depositData: data.depositData || "",
            whyCourse: data.whyCourse || "",
            keptTraining: data.keptTraining || "",
            frequentlyPracticed: data.frequentlyPracticed || "",
            otherContact: data.otherContact || "",
            otherContactDescription: data.otherContactDescription || "",
            psychotherapyTreatment: data.psychotherapyTreatment || "",
            specialNeeds: data.specialNeeds || "",
            greatestGain: data.greatestGain || "",
            expectations: data.expectations || "",
        })
    });

    return (
        <Section title="Curso Aprofundamento em Mindfulness">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </Section>
    );
}


