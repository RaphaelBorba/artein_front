/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import Section from "@/components/self/Section";
import { Form } from "@/components/ui/form";
import LeadFormFields from "../leadFormFields";

import api from "@/lib/api";
import { Option } from "@/types/smallModels";
import { leadSchema, LeadSchemaType } from "@/schemas/lead/leadSchema";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";
import { Lead } from "@/types/lead";
import { format } from "@react-input/mask";
import { masks } from "@/lib/masks";
import { getApiErrorMessage } from "@/lib/utils";

export default function LeadViewPage() {
    const { leadId } = useParams<{ leadId: string }>();
    const { toggleLoader } = useLoader();
    const { toast } = useToast();

    const [courses, setCourses] = useState<Option[]>([]);

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
    });

    useEffect(() => {
        const fetchOptions = async () => {
            toggleLoader(true);
            try {
                const response = await api.get<Option[]>("/lead/courses");
                setCourses(response.data);
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
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        if (!leadId) return;
        if (!courses.length) return;

        const fetchLead = async () => {
            toggleLoader(true);
            try {
                const response = await api.get<Lead>(`/lead/${leadId}`);
                const data = response.data;

                form.reset({
                    name: data.name || "",
                    email: data.email || "",
                    phone: (data.phone != null && !isNaN(Number(data.phone)))
                        ? format(data.phone, { mask: masks.cellphone, replacement: masks.replacement })
                        : '',
                    location: data.location || "",
                    shift: data.shift || "null",
                    observations: data.observations || "",
                    courses: data.courses ? data.courses.map((c) => String(c.id)) : [],
                });
            } catch (error) {
                console.error("Error fetching lead:", error);
                toast({
                    title: "Erro",
                    description: "Não foi possível carregar os dados do lead.",
                    variant: "destructive"
                });
            } finally {
                toggleLoader(false);
            }
        };

        fetchLead();
    }, [leadId, courses]);

    return (
        <Section title="Leads">
            <Form {...form}>
                <form className="grid grid-cols-1 gap-4 text-black sm:grid-cols-2 lg:grid-cols-3">
                    <LeadFormFields
                        form={form}
                        courses={courses}
                        mode="view"
                        readOnly
                    />
                </form>
            </Form>
        </Section>
    );
}
