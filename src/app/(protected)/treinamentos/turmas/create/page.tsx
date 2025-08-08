/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useCallback, useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import CoursesClassesFormFields from "../courseClassesFormFields";
import { CourseClassFormSchemaType, courseClassSchema } from "@/schemas/courseClass/courseClassSchema";

export default function CourseCreatePage() {

    const { toggleLoader } = useLoader();
    const { toast } = useToast();
    const router = useRouter();

    const form = useForm<CourseClassFormSchemaType>({
        resolver: zodResolver(courseClassSchema),
        defaultValues: {
            name: "",
            workload: "",
            classNumber: "",
            location: "",
            address: "",
            shift: "",
            sessionDates: [],
            startDate: undefined,
            endDate: undefined,
            startTime: "",
            endTime: "",
            daysOfWeek: [],
            price: 0,
        },
    });



    const onSubmit = useCallback<
        (values: CourseClassFormSchemaType) => Promise<void>
    >(async (values) => {
        toggleLoader(true);
        try {

            await api.post(`/course-classes`, { ...values, sessionDates: values.sessionDates.map((obj) => obj.date) });
            router.push("/treinamentos/turmas");
        } catch (error) {
            console.error("Error saving patient:", error);
            toast({
                title: "Erro",
                description: "Ocorreu um erro ao atualizar o paciente.",
                variant: "destructive",
            });
        } finally {
            toggleLoader(false);
        }
    }, [router, toggleLoader, toast]);

    return (
        <Section title="Pacientes">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <CoursesClassesFormFields
                        mode="create"
                        form={form}
                    />
                </form>
            </Form>
        </Section>
    );
}
