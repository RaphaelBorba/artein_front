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
import CoursesFormFields from "../../coursesFormFields";

export default function CoursePagePage() {
  const { courseId } = useParams<{ courseId: string }>();

  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const router = useRouter();

  const [course, setCourse] = useState<CourseI>()
  console.log(course)

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
      if (!course || !courseId) {
        toast({
          title: "Erro",
          description: "Registro geral não encontrado.",
          variant: "destructive",
        });
        return;
      }

      const payload: Partial<CourseI> = {
        name: values.name,
        description: values.description,
        workload: values.workload,
        price: values.price
      }
      console.log(payload)
      await api.patch(`/courses/${courseId}`, payload);
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
  }, [course, router, toggleLoader, toast]);

  useEffect(() => {
    // Now load the general register data after options have loaded
    const fetchCourse = async () => {
      toggleLoader(true);
      try {
        const response = await api.get<CourseI>(`/courses/${courseId}`);
        const courseResp = response.data
        setCourse(courseResp)
        // Map fetched numeric IDs to strings (and use "null" if no value)
        form.reset({
          name: courseResp.name || "",
          description: courseResp.description || "",
          workload: courseResp.workload || "",
          price: courseResp.price || 0,
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
    <Section title="Pacientes">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
          <CoursesFormFields
            mode="edit"
            form={form}
          />
        </form>
      </Form>
    </Section>
  );
}
