/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useEffect } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";
import { CourseFormSchemaType, courseSchema } from "@/schemas/courses/coursesSchema";
import { CourseI } from "@/types/courses";
import CoursesFormFields from "../coursesFormFields";

export default function CourseViewPage() {
    const { courseId } = useParams<{ courseId: string }>();

    const { toggleLoader } = useLoader();
    const { toast } = useToast();

    const form = useForm<CourseFormSchemaType>({
        resolver: zodResolver(courseSchema),
        defaultValues: {
            description: "",
            name: "",
            price: 0,
            workload: ""
        },
    });

    useEffect(() => {
        // Now load the general register data after options have loaded
        const fetchCourse = async () => {
            toggleLoader(true);
            try {
                const response = await api.get<CourseI>(`/courses/${courseId}`);
                const course = response.data
                // Map fetched numeric IDs to strings (and use "null" if no value)
                form.reset({
                    name: course.name || "",
                    description: course.description || "",
                    workload: course.workload || "",
                    price: course.price || 0,
                });
            } catch (error) {
                console.error("Error fetching general register:", error);
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados do cadastro.",
                    variant: "destructive"
                });
            } finally {
                toggleLoader(false);
            }
        };

        fetchCourse();

    }, [courseId]);

    return (
        <Section title="Cursos">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <CoursesFormFields
                        mode="view"
                        form={form}
                        readOnly
                    />
                </form>
            </Form>
        </Section>
    );
}
