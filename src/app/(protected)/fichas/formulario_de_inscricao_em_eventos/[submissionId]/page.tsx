/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import PrintableSection from "@/components/self/PrintableSection";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/formulario_de_inscricao_em_eventos";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import type { FormularioDeInscricaoEmEventosI } from "@/types/formularioDeInscricaoEmEventos";
import { FormularioDeInscricaoEmEventosFormSchemaType, formularioDeInscricaoEmEventosSchema } from "@/schemas/forms/formulario_de_inscricao_em_eventos";

export default function FormularioDeInscricaoEmEventosViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

    const form = useForm<FormularioDeInscricaoEmEventosFormSchemaType>({
        resolver: zodResolver(formularioDeInscricaoEmEventosSchema),
        defaultValues: {
            eventName: "",
            fullName: "",
            phone: "",
            cep: "",
            address: "",
            city: "",
            district: "",
            state: "",
            email: "",
            payment: "",
            paymentMedium: "null",
            otherPayment: "",
            previousActivityArtin: "",
            inspiration: "",
            expectations: "",
            personalDevelopmentInterests: "",
            wantsToReceiveInfo: "null",
            suggestions: "",
            wouldRecommend: "",
        },
    });

    useFetchSubmission<FormularioDeInscricaoEmEventosFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/formulario_de_inscricao_em_eventos/submissions/${submissionId}`,
        mapResponse: (data: FormularioDeInscricaoEmEventosI) => ({
            eventName: data.eventName || "",
            fullName: data.fullName || "",
            phone: data.phone || "",
            cep: data.cep || "",
            address: data.address || "",
            city: data.city || "",
            district: data.district || "",
            state: data.state || "",
            email: data.email || "",
            payment: data.payment || "",
            paymentMedium: data.paymentMedium || "",
            otherPayment: data.otherPayment || "",
            previousActivityArtin: data.previousActivityArtin || "",
            inspiration: data.inspiration || "",
            expectations: data.expectations || "",
            personalDevelopmentInterests: data.personalDevelopmentInterests || "",
            wantsToReceiveInfo: data.wantsToReceiveInfo || "",
            suggestions: data.suggestions || "",
            wouldRecommend: data.wouldRecommend || "",
        })
    });

    return (
        <PrintableSection title="Formulário de Inscrição em Eventos">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </PrintableSection>
    );
}


