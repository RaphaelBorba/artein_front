/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import FormFields from "@/components/forms/formulario_aulas_regulares";
import { useFetchSubmission } from "@/hooks/useFetchSubmission";
import type { FormularioAulasRegularesI } from "@/types/formularioAulasRegulares";
import { FormularioAulasRegularesFormSchemaType, formularioAulasRegularesSchema } from "@/schemas/forms/formulario_aulas_regulares";

export default function FormularioAulasRegularesViewPage() {
    const { submissionId } = useParams<{ submissionId: string }>();

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

    useFetchSubmission<FormularioAulasRegularesFormSchemaType>({
        form,
        submissionId,
        endpoint: `/forms/formulario_aulas_regulares/submissions/${submissionId}`,
        mapResponse: (data: FormularioAulasRegularesI) => ({
            regularClasses: data.regularClasses?.map(item => ({ date: new Date(item.date) })) || [],
            fullName: data.fullName || "",
            birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
            cep: data.cep || "",
            address: data.address || "",
            city: data.city ||  "",
            district: data.district || "",
            state: data.state || "",
            phone: data.phone || "",
            email: data.email || "",
            payment: data.payment || "",
            otherPayment: data.otherPayment || "",
            paymentMedium: data.paymentMedium || "",

            specialNeeds: data.specialNeeds || "",
            underMedicalCare: data.underMedicalCare || "",
            whichMedicalCare: data.whichMedicalCare || "",
            underPsychologicalCare: data.underPsychologicalCare || "",
            whichPsychologicalCare: data.whichPsychologicalCare || "",
            underPsychiatricCare: data.underPsychiatricCare || "",
            whichPsychiatricCare: data.whichPsychiatricCare || "",

            healthImportantInfo: data.healthImportantInfo ||    "",
            previousActivityArtin: data.previousActivityArtin || "",
            inspiration: data.inspiration || "",
            otherRegularClassInterest: data.otherRegularClassInterest || "",
            wantsCourseInfo: data.wantsCourseInfo || "",
            suggestions: data.suggestions || "",
            wouldRecommend: data.wouldRecommend || "",
        })
    });

    return (
        <Section title="Formulário de Aulas Regulares">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <FormFields mode="view" form={form} readOnly />
                </form>
            </Form>
        </Section>
    );
}


