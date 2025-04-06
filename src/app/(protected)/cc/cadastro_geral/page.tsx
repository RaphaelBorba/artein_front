"use client";
import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import { useToast } from "@/hooks/use-toast";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { CommunicationMethod } from "@/types/smallModels";
import { GeneralRegister as GeneralRegisterI } from "@/types/generalRegister";
import { DataTable } from "@/components/self/DataTable";
import { Plus } from "lucide-react";
import { parseBoolean, parseField, parseNullableNumber } from "@/lib/utils";
import { useRouter } from "next/navigation";
import axios from "axios";
import { masks } from "@/lib/masks";
import { IDataTableResposne, IPagination } from "@/types/dataTableResponse";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { generalRegisterFilterSchema, GeneralRegisterFilterSchemaType } from "@/schemas/generalRegister/generalRegisterFilterSchema";
import { FiltersGeneralRegister } from "../filters";
import { getColumns } from "../columns";

export default function GeneralRegister() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [registers, setRegisters] = useState<GeneralRegisterI[]>([]);
  const [communicationMethod, setCommunicationMethod] = useState<CommunicationMethod[]>([]);
  const [valuesChanged, setValuesChanged] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    totalPages: 10,
    totalCount: 100,
    hasNextPage: true,
    hasPreviousPage: true,
  })

  const form = useForm<GeneralRegisterFilterSchemaType>({
    resolver: zodResolver(generalRegisterFilterSchema),
    defaultValues: {
      fullName: "",
      cpf: "",
      cnpj: "",
      phoneNumber: "",
      interestedInCourses: "null",
      receiveInfoMethodId: "null",
    },
  })

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [generalRes, communicationRes] = await Promise.all([
          api.get<IDataTableResposne<GeneralRegisterI[]>>("/general-register", {
            params: {
              'name': form.getValues('fullName') || undefined,
              'cpf': parseField(form.getValues('cpf'), masks.cpf),
              'cnpj': parseField(form.getValues('cnpj'), masks.cnpj),
              'phoneNumber': parseField(form.getValues('phoneNumber'), masks.cellphone),
              'interestedInCourses': parseBoolean(form.getValues('interestedInCourses')),
              'receiveInfoMethodId': parseNullableNumber(form.getValues('receiveInfoMethodId')),
              'page': pagination.page,
              'limit': pagination.pageSize
            }
          }),
          api.get<CommunicationMethod[]>("/general-register/communication-method"),
        ]);
        setRegisters(generalRes.data.records);
        setCommunicationMethod(communicationRes.data);
        setPagination(generalRes.data.pagination)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.status !== 401) {
            toast({
              title: "Erro",
              description: JSON.stringify(error?.response?.data),
            });
          }
        } else {
          console.log(error)
          toast({
            title: "Erro",
            description: JSON.stringify(error),
          });
        }

      } finally {
        toggleLoader(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleLoader, toast, valuesChanged, pagination.page, pagination.pageSize]);

  const onSubmit = () => {
    setValuesChanged(!valuesChanged)
  }

  return (
    <Section title="Cadastro Geral">
      <div className="space-y-8">
        {/* Grid for the four standard inputs */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-4">

            <FiltersGeneralRegister
              communicationMethod={communicationMethod}
              form={form}
            />

          </form>
        </Form>
      </div>
      <div className="overflow-x-auto">
        <DataTable<GeneralRegisterI, unknown>
          data={registers}
          columns={getColumns('cadastro_geral')}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <div className="flex w-full justify-end">
        <Button
          onClick={() => router.push('cadastro_geral/create')}
          type="button"
          variant="outline"
          className="flex items-center justify-between text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
      </div>
    </Section>
  );
}
