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
import { CourseClassFormSchemaType, courseClassSchema } from "@/schemas/courseClass/courseClassSchema";
import { CourseClassesI } from "@/types/couseClasses";
import CoursesClassesFormFields from "../courseClassesFormFields";


export default function CourseViewPage() {
    const { courseClassId } = useParams<{ courseClassId: string }>();

    const { toggleLoader } = useLoader();
    const { toast } = useToast();

const form = useForm<CourseClassFormSchemaType>({
  resolver: zodResolver(courseClassSchema),
  defaultValues: {
    name:        "",
    workload:    "",
    classNumber: "",
    location:    "",
    address:     "",
    shift:       "",
    sessionDates: [],
    startDate:   undefined,
    endDate:     undefined,
    startTime:   "",
    endTime:     "",
    daysOfWeek:  [],
    price:       0,           // ← use empty string instead of undefined
  },
});

    useEffect(() => {
        const fetchCourseClasses = async () => {
            if (!courseClassId) return; // Don't fetch if there's no ID

            toggleLoader(true);
            try {
                const response = await api.get<CourseClassesI>(`/course-classes/${courseClassId}`);
                const courseClass = response.data;

                form.reset({
                    name: courseClass.name || "",
                    workload: courseClass.workload || "",
                    classNumber: courseClass.classNumber || "",
                    location: courseClass.location || "",
                    address: courseClass.address || "",
                    shift: courseClass.shift || "",
                    sessionDates: courseClass.sessionDates
                        ? courseClass.sessionDates.map(d => ({ date: new Date(d) }))
                        : [],
                    startDate: courseClass.startDate ? new Date(courseClass.startDate) : undefined,
                    endDate: courseClass.endDate ? new Date(courseClass.endDate) : undefined,
                    startTime: courseClass.startTime || "",
                    endTime: courseClass.endTime || "",
                    daysOfWeek: courseClass.daysOfWeek || [],
                    price: courseClass.price || 0,
                });
            } catch (error) {
                console.error("Error fetching course class:", error);
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados da turma.",
                    variant: "destructive"
                });
            } finally {
                toggleLoader(false);
            }
        };

        fetchCourseClasses();

    }, [courseClassId]);

    return (
        <Section title="Turmas">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <CoursesClassesFormFields
                        mode="view"
                        form={form}
                        readOnly
                    />
                </form>
            </Form>
        </Section>
    );
}
