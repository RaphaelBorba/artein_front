/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import Section from "@/components/self/Section";
import { leadSchema, LeadSchemaType } from "@/schemas/lead/leadSchema";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
  Form,
} from "@/components/ui/form"
import { masks } from "@/lib/masks";
import { useEffect, useState } from "react";
import { useLoader } from "@/hooks/useLoader";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";
import api from "@/lib/api";
import { Option } from "@/types/smallModels";
import { getApiErrorMessage, parseField } from "@/lib/utils";
import LeadFormFields from "../leadFormFields";
import { useRouter } from "next/navigation";

export default function LeadForm() {

  const form = useForm<LeadSchemaType>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      shift: "null",
      observations: "",
      courses: [],
    },
  })
  const router = useRouter()
  const { toggleLoader } = useLoader();
  const { toast } = useToast();
  const [courses, setCourses] = useState<Option[]>([])

  async function onSubmit(values: LeadSchemaType) {
    toggleLoader(true)
    try {
      values.phone = parseField(values.phone, masks.cellphone) ?? "";
      values.shift = values.shift === "null" ? undefined : values.shift;
      values.email = values.email ? values.email : undefined;

      await api.post('/lead', values)
      router.push('/cc/leads')
    } catch (error) {
      toast({
        title: "Erro",
        description: getApiErrorMessage(error),
        variant: "destructive"
      });
    } finally {
      toggleLoader(false)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true)
      try {
        const response = await api.get<Option[]>("/lead/courses")
        setCourses(response.data)
      } catch (error) {
        if (!axios.isAxiosError(error) || error.status !== 401) {
          toast({
            title: "Erro",
            description: getApiErrorMessage(error),
          });
        }
      } finally {
        toggleLoader(false);
      }
    }
    fetchData()
  }, [])

  return (
    <Section title="Leads">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
          <LeadFormFields
            form={form}
            courses={courses}
            mode="create"
          />
        </form>
      </Form>
    </Section>
  )
}
