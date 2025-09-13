/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import { UseFormReturn, FieldValues } from "react-hook-form";
import api from "@/lib/api";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";

interface UseFetchSubmissionOptions<TValues extends FieldValues> {
  form: UseFormReturn<TValues>;
  submissionId?: string;
  endpoint: string; // e.g. `/forms/slug/submissions/${id}`
  mapResponse?: (data: any) => Partial<TValues>;
}

export function useFetchSubmission<TValues extends FieldValues>({
  form,
  submissionId,
  endpoint,
  mapResponse,
}: UseFetchSubmissionOptions<TValues>) {
  const { toggleLoader } = useLoader();
  const { toast } = useToast();

  useEffect(() => {
    if (!submissionId) return;
    const fetchRecord = async () => {
      toggleLoader(true);
      try {
        const response = await api.get(endpoint);
        const data = response.data;
        const values = mapResponse ? mapResponse(data) : (data as Partial<TValues>);
        form.reset(values as any);
      } catch (error) {
        console.error("Error fetching record:", error);
        toast({ title: "Erro", description: "Não foi possível carregar os dados.", variant: "destructive" });
      } finally {
        toggleLoader(false);
      }
    };

    fetchRecord();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);
}


