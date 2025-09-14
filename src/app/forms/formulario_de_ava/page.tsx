/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import FormFields from "@/components/forms/formulario_de_ava";
import { FormularioDeAvaFormSchemaType, formularioDeAvaSchema } from "@/schemas/forms/formulario_de_ava";

export default function FormularioDeAvaPage() {

    const { toggleLoader } = useLoader();
    const { toast } = useToast();
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const form = useForm<FormularioDeAvaFormSchemaType>({
        resolver: zodResolver(formularioDeAvaSchema),
        defaultValues: {
            fullName: "",
            birthDate: undefined,
            satisfactionLevel: "null",
            likedMostAndHighlights: "",
            likedLeastDiscomfort: "",
            personalChange: "",
            takeHomeCare: "",
            tellAFriend: "",
            praiseOrComplaint: "",
            improvementSuggestions: "",
            nextTopics: "",
            wantsInfo: "null",
            preferredMedia: "Whatsapp",
            authorizeUse: "null",
        },
    });

    async function onSubmit(values: FormularioDeAvaFormSchemaType) {
        toggleLoader(true);
        try {
            const payload = {
                formSlug: "formulario_de_ava",
                data: values,
            };

            await api.post("/forms/submissions", payload, { skipAuth: true });

            toast({
                title: "Formulário enviado!",
                description: "Recebemos sua avaliação.",
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

    return (
        <div className="flex justify-center sm:p-10">
            <div className="p-10 bg-white rounded-lg">
                <h1 className="text-2xl font-bold text-black mb-5">Formulário de Ava</h1>
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
