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
import FormFields from "@/components/forms/formulario_aulas_regulares";
import { useCepAddress } from "@/hooks/useCepAddress";
import { FormularioAulasRegularesFormSchemaType, formularioAulasRegularesSchema } from "@/schemas/forms/formulario_aulas_regulares";

export default function FormularioAulasRegularesPage() {

    const { toggleLoader } = useLoader();
    const { toast } = useToast();
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const form = useForm<FormularioAulasRegularesFormSchemaType>({
        resolver: zodResolver(formularioAulasRegularesSchema),
        defaultValues: {
            regularClasses: [],
            fullName: "",
            birthDate: undefined,
            cep: "",
            address: "",
            city: "",
            district: "",
            state: "",
            phone: "",
            email: "",
            payment: "",
            otherPayment: "",
            paymentMedium: "",

            specialNeeds: "",
            underMedicalCare: "",
            whichMedicalCare: "",
            underPsychologicalCare: "",
            whichPsychologicalCare: "",
            underPsychiatricCare: "",
            whichPsychiatricCare: "",

            healthImportantInfo: "",
            previousActivityArtin: "",
            inspiration: "",
            otherRegularClassInterest: "",
            wantsCourseInfo: "",
            suggestions: "",
            wouldRecommend: "",
        },
    });

    async function onSubmit(values: FormularioAulasRegularesFormSchemaType) {
        toggleLoader(true);
        try {
            const payload = {
                formSlug: "formulario_aulas_regulares",
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
            <div className="p-10 bg-white rounded-lg w-full">
                <h1 className="text-2xl font-bold text-black mb-5">Formulário de Aulas Regulares</h1>
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


