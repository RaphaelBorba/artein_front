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
import { CourseFormSchemaType, courseSchema } from "@/schemas/courses/coursesSchema";
import { CourseI } from "@/types/courses";
import CoursesFormFields from "../[courseId]/coursesFormFields";

export default function CourseCreatePage() {
  const { courseId } = useParams<{ courseId: string }>();

  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const router = useRouter();

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
    console.log('Validation Errors:', form.formState.errors)
  }, [form.formState.errors])


  const onSubmit = useCallback<
    (values: CourseFormSchemaType) => Promise<void>
  >(async (values) => {
    toggleLoader(true);
    try {


      const payload: Partial<CourseI> = {
        name: values.name,
        description: values.description,
        workload: values.workload,
        price: values.price
      }

      await api.post(`/courses`, payload);
      router.push("/treinamentos/cursos");
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
  }, [ router, toggleLoader, toast]);

  return (
    <Section title="Pacientes">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
          <CoursesFormFields
            mode="create"
            form={form}
          />
        </form>
      </Form>
    </Section>
  );
}
