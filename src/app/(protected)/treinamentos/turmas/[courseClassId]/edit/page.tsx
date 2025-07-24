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
import { CourseClassesI } from "@/types/couseClasses";
import { CourseClassFormSchemaType, courseClassSchema } from "@/schemas/courseClass/courseClassSchema";
import CoursesClassesFormFields from "../../courseClassesFormFields";

export default function CoursePagePage() {
  const { courseClassId } = useParams<{ courseClassId: string }>();

  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const router = useRouter();

  const [courseClass, setCourseClass] = useState<CourseClassesI>()

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
      if (!courseClass || !courseClassId) {
        toast({
          title: "Erro",
          description: "Registro geral não encontrado.",
          variant: "destructive",
        });
        return;
      }


      await api.patch(`/course-classes/${courseClassId}`, { ...values, sessionDates: values.sessionDates.map((obj) => obj.date) });
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
  }, [courseClass, router, toggleLoader, toast]);

  useEffect(() => {
    // Now load the general register data after options have loaded
    const fetchCourse = async () => {
      toggleLoader(true);
      try {
        const response = await api.get<CourseClassesI>(`/course-classes/${courseClassId}`);
        const courseClassResp = response.data
        setCourseClass(courseClassResp)
        // Map fetched numeric IDs to strings (and use "null" if no value)
        form.reset({
          name: courseClassResp.name || "",
          workload: courseClassResp.workload || "",
          classNumber: courseClassResp.classNumber || "",
          location: courseClassResp.location || "",
          address: courseClassResp.address || "",
          shift: courseClassResp.shift || "",
          sessionDates: courseClassResp.sessionDates
            ? courseClassResp.sessionDates.map((d: string | number | Date) => ({ date: new Date(d) }))
            : [],
          startDate: courseClassResp.startDate ? new Date(courseClassResp.startDate) : undefined,
          endDate: courseClassResp.endDate ? new Date(courseClassResp.endDate) : undefined,
          startTime: courseClassResp.startTime || "",
          endTime: courseClassResp.endTime || "",
          daysOfWeek: courseClassResp.daysOfWeek || [],
          price: courseClassResp.price || 0,
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

  }, [courseClassId]);

  return (
    <Section title="Turmas">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
          <CoursesClassesFormFields
            mode="edit"
            form={form}
          />
        </form>
      </Form>
    </Section>
  );
}
