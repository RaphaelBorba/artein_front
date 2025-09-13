/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import FormFields from "@/components/forms/curso_aprofundamento_mindfulness";
import { useCepAddress } from "@/hooks/useCepAddress";
import { CursoAprofundamentoMindfulnessFormSchemaType, cursoAprofundamentoMindfulnessSchema } from "@/schemas/forms/curso_aprofundamento_mindfulness";

export default function CursoAprofundamentoViewPage() {

    const { toggleLoader } = useLoader();
    const { toast } = useToast();
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const form = useForm<CursoAprofundamentoMindfulnessFormSchemaType>({
        resolver: zodResolver(cursoAprofundamentoMindfulnessSchema),
        defaultValues: {
            fullName: "",
            phone: "",
            cep: "",
            address: "",
            city: "",
            district: "",
            state: "",
            email: "",
            alreadyParticipatedInCourse: "",
            alreadyParticipatedInCourseIntrodutorio: "",
            payment: "null",
            paymentMedium: "null",
            bankAndInitialDepositDate: "",
            paymentInstructions: "Para garantir sua vaga no curso é necessário o pagamento de um depósito/transferência do valor combinado a ser enviado por whatsapp (anterior ao início do curso) e o pagamento do restante do valor no primeiro dia de curso (em dinheiro ou cheques pré-datados), juntamente com a entrega do presente formulário preenchido.",
            depositData: `•	BANCO DO BRASIL
            Ag. 3111-9
            C.C. 21.000-5

•	BANCO BRADESCO
            Ag. 2788
            C.C. 15.707-4

CPF 072227657-51
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

    async function onSubmit(values: CursoAprofundamentoMindfulnessFormSchemaType) {
        toggleLoader(true);
        try {
            const payload = {
                formSlug: "curso_aprofundamento_mindfulness",
                data: values,
            };
            
            await api.post("/forms/submissions", payload, { skipAuth: true });

            toast({
                title: "Formulário enviado!",
                description: "Recebemos sua inscrição.",
            });
            form.reset();
            setWasSubmitted(true);
        } catch (error) {
            console.error("Erro ao enviar formulário:", error);
            toast({
                title: "Erro ao enviar",
                description: "Tente novamente mais tarde.",
                variant: "destructive",
            });
        } finally {
            toggleLoader(false);
        }
    }


    useCepAddress({ form });

    return (
        <div className="flex justify-center sm:p-10">
            <div className="p-10 bg-white rounded-lg">
                <h1 className="text-2xl font-bold text-black mb-5">Curso Aprofundamento em Mindfulness</h1>
                {wasSubmitted ? (
                    <div className="text-black">
                        <h2 className="text-xl font-semibold mb-2">Formulário respondido!</h2>
                        <p>Obrigado por responder o formulário.</p>
                    </div>
                ) : (
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                            <FormFields mode="create" form={form} />
                        </form>
                    </Form>
                )}
            </div>
        </div>
    );
}


