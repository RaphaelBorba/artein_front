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
import { useRouter } from "next/navigation";
import { presenceListSchema, PresenceListSchemaType } from "@/schemas/presenceList/presenceListSchema";
import { Option } from "@/types/smallModels";
import PresenceListFormFields from "../helpers/presenceListFormFields";

export default function CoursePagePage() {
  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const router = useRouter();

  const [generalRegisters, setGeneralRegisters] = useState<Option[]>([]);
  const [courseClasses, setCourseClasses] = useState<Option[]>([]);

  const form = useForm<PresenceListSchemaType>({
    resolver: zodResolver(presenceListSchema),
    defaultValues: {
      courseName: "",
      price: 0,
      presence: [],
      foul: [],
      replacement: [],
      observations: "",
      generalRegisterId: "",
      courseClassId: "",
    },
  });

  const onSubmit = useCallback<
    (values: PresenceListSchemaType) => Promise<void>
  >(async (values) => {
    toggleLoader(true);
    try {
      await api.post(`/presence-list/`, {
        ...values,
        presence: values.presence.map((obj) => obj.date),
        foul: values.foul.map((obj) => obj.date),
        replacement: values.replacement.map((obj) => obj.date),
        courseClassId: Number(values.courseClassId),
        generalRegisterId: Number(values.generalRegisterId),
      });
      router.push("/treinamentos/lista_de_presenca");
    } catch (error) {
      console.error("Error saving presence list:", error);
      toast({
        title: "Erro",
        description: "Ocorreu um erro ao atualizar a lista de presença.",
        variant: "destructive",
      });
    } finally {
      toggleLoader(false);
    }
  }, [router, toggleLoader, toast]);

  useEffect(() => {
    const fetchAll = async () => {
      toggleLoader(true);
      try {
        const [genRegsRes, classesRes] = await Promise.all([
          api.get<Option[]>("/general-register/name-id"),
          api.get<Option[]>("/course-classes/name-id"),
        ]);

        setGeneralRegisters(genRegsRes.data);
        setCourseClasses(classesRes.data);

      } catch (err) {
        console.error(err);
        toast({
          title: "Erro",
          description: "Não foi possível carregar os dados da lista de presença.",
          variant: "destructive",
        });
      } finally {
        toggleLoader(false);
      }
    };

    fetchAll();
  }, []);

  return (
    <Section title="Turmas">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3"
        >
          <PresenceListFormFields
            mode="create"
            form={form}
            courseClasses={courseClasses}
            generalRegisters={generalRegisters}
          />
        </form>
      </Form>
    </Section>
  );
}
