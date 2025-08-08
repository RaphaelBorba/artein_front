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
import { PresenceListI } from "@/types/presenceList";
import { presenceListSchema, PresenceListSchemaType } from "@/schemas/presenceList/presenceListSchema";
import { Option } from "@/types/smallModels";
import PresenceListFormFields from "../../helpers/presenceListFormFields";

export default function CoursePagePage() {
  const { presenceListId } = useParams<{ presenceListId: string }>();
  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const router = useRouter();

  const [presenceList, setPresenceList] = useState<PresenceListI>();
  const [generalRegisters, setGeneralRegisters] = useState<Option[]>([]);
  const [courseClasses, setCourseClasses] = useState<Option[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track when all data is ready

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
      if (!presenceList || !presenceListId) {
        toast({
          title: "Erro",
          description: "Lista de presença não encontrada.",
          variant: "destructive",
        });
        return;
      }

      await api.patch(`/presence-list/${presenceListId}`, {
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
  }, [presenceList, router, toggleLoader, toast]);

  useEffect(() => {
    if (!presenceListId) return;

    const fetchAll = async () => {
      toggleLoader(true);
      try {
        const [genRegsRes, classesRes, plRes] = await Promise.all([
          api.get<Option[]>("/general-register/name-id"),
          api.get<Option[]>("/course-classes/name-id"),
          api.get<PresenceListI>(`/presence-list/${presenceListId}`),
        ]);

        setPresenceList(plRes.data);
        setGeneralRegisters(genRegsRes.data);
        setCourseClasses(classesRes.data);

        const pl = plRes.data;
        form.reset({
          courseName: pl.courseName ?? "",
          price: pl.price || 0,
          presence: pl.presence?.map((d) => ({ date: new Date(d) })) ?? [],
          foul: pl.foul?.map((d) => ({ date: new Date(d) })) ?? [],
          replacement: pl.replacement?.map((d) => ({ date: new Date(d) })) ?? [],
          observations: pl.observations ?? "",
          generalRegisterId: String(pl.generalRegisterId) || "",
          courseClassId: String(pl.courseClassId) || "",
        });

        setIsLoaded(true); // Mark as ready
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
  }, [presenceListId]);

  if (!isLoaded) {
    return <p className="text-center text-gray-500">Carregando...</p>;
  }

  return (
    <Section title="Turmas">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3"
        >
          <PresenceListFormFields
            mode="edit"
            form={form}
            courseClasses={courseClasses}
            generalRegisters={generalRegisters}
          />
        </form>
      </Form>
    </Section>
  );
}
