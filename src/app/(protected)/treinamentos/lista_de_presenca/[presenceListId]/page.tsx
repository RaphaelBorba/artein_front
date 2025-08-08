/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import api from "@/lib/api";
import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { useParams } from "next/navigation";

import {
  presenceListSchema,
  PresenceListSchemaType,
} from "@/schemas/presenceList/presenceListSchema";
import { PresenceListI } from "@/types/presenceList";
import PresenceListFormFields from "../helpers/presenceListFormFields";
import { Option } from "@/types/smallModels";

export default function PresenceListViewPage() {
  const { presenceListId } = useParams<{ presenceListId: string }>();
  const { toggleLoader } = useLoader();
  const { toast } = useToast();

  const [generalRegisters, setGeneralRegisters] = useState<Option[]>([]);
  const [courseClasses, setCourseClasses] = useState<Option[]>([]);
  const [isLoaded, setIsLoaded] = useState(false); // Track loading state

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

  useEffect(() => {
    if (!presenceListId) return;

    const fetchAll = async () => {
      toggleLoader(true);
      try {
        // Fetch dropdowns and presence-list in parallel
        const [genRegsRes, classesRes, plRes] = await Promise.all([
          api.get<Option[]>("/general-register/name-id"),
          api.get<Option[]>("/course-classes/name-id"),
          api.get<PresenceListI>(`/presence-list/${presenceListId}`),
        ]);

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

        setIsLoaded(true); // Mark as ready once everything is set
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
    <Section title="Lista de Presença">
      <Form {...form}>
        <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
          <PresenceListFormFields
            mode="view"
            form={form}
            readOnly
            courseClasses={courseClasses}
            generalRegisters={generalRegisters}
          />
        </form>
      </Form>
    </Section>
  );
}
