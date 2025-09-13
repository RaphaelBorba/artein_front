/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect } from "react";
import axios from "axios";
import { unformat } from "@react-input/mask";
import { masks } from "@/lib/masks";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { useLoader } from "@/hooks/useLoader";
import { useToast } from "@/hooks/use-toast";

interface UseCepAddressOptions<TValues extends FieldValues> {
  form: UseFormReturn<TValues>;
  cepFieldName?: Path<TValues>;
  mapping?: Partial<Record<"address" | "city" | "district" | "state", Path<TValues>>>;
}

export function useCepAddress<TValues extends FieldValues>({
  form,
  cepFieldName = "cep" as unknown as Path<TValues>,
  mapping = {
    address: "address" as unknown as Path<TValues>,
    city: "city" as unknown as Path<TValues>,
    district: "district" as unknown as Path<TValues>,
    state: "state" as unknown as Path<TValues>,
  },
}: UseCepAddressOptions<TValues>) {
  const { toggleLoader } = useLoader();
  const { toast } = useToast();

  const cepValue = form.watch(cepFieldName);

  useEffect(() => {
    async function fetchAddressByCep() {
      const cepMask = form.getValues(cepFieldName) as unknown as string;
      if (typeof cepMask !== "string") return;

      const cep = unformat(cepMask, { mask: masks.cep, replacement: masks.replacement });
      if (cep.length !== 8) return;

      toggleLoader(true);
      try {
        const { data } = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
        if (data?.erro) {
          toast({ title: "CEP Inválido!", variant: "destructive" });
          return;
        }
        if (mapping.address) form.setValue(mapping.address, data?.logradouro as any);
        if (mapping.city) form.setValue(mapping.city, data?.localidade as any);
        if (mapping.district) form.setValue(mapping.district, data?.bairro as any);
        if (mapping.state) form.setValue(mapping.state, (data?.uf || data?.estado) as any);
      } catch (error) {
        console.error("Error fetching address data:", error);
        toast({ title: "Erro na API de CEP!", description: "Contate Suporte", variant: "destructive" });
      } finally {
        toggleLoader(false);
      }
    }

    fetchAddressByCep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cepValue]);
}


