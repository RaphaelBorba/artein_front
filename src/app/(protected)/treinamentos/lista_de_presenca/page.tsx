"use client";

import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import { useToast } from "@/hooks/use-toast";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { DataTable } from "@/components/self/DataTable";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";


import { Option } from "@/types/smallModels";
import {
  presenceListFilterSchema,
  PresenceListFilterSchemaType,
} from "@/schemas/presenceList/presenceListFilterSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { getColumns } from "./helpers/columns";
import { IDataTableResposne, IPagination } from "@/types/dataTableResponse";
import { PresenceListI } from "@/types/presenceList";
import { FiltersPresenceList } from "./helpers/filters";

export default function PresenceList() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const router = useRouter();

  const [registers, setRegisters] = useState<PresenceListI[]>([]);
  const [generalRegisters, setGeneralRegisters] = useState<Option[]>([]);
  const [courseClasses, setCourseClasses] = useState<Option[]>([]);
  const [valuesChanged, setValuesChanged] = useState(false);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    totalPages: 10,
    totalCount: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const form = useForm<PresenceListFilterSchemaType>({
    resolver: zodResolver(presenceListFilterSchema),
    defaultValues: {
      courseClassId: "",
      generalRegisterId: "",
    },
  });

  // re-run fetch only when filters are submitted or page changes
  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [listRes, genRegsRes, classRegsRes] = await Promise.all([
          api.get<IDataTableResposne<PresenceListI[]>>("/presence-list", {
            params: {
              courseClassId: form.getValues("courseClassId") || undefined,
              generalRegisterId: form.getValues("generalRegisterId") || undefined,
              page: pagination.page,
              limit: pagination.pageSize,
            },
          }),
          api.get<Option[]>("/general-register/name-id"),
          api.get<Option[]>("/course-classes/name-id"),
        ]);

        setRegisters(listRes.data.records);
        setPagination(listRes.data.pagination);
        setGeneralRegisters(genRegsRes.data);
        setCourseClasses(classRegsRes.data);
      } catch (error) {
        if (axios.isAxiosError(error) && error.status !== 401) {
          toast({
            title: "Erro",
            description: JSON.stringify(error.response?.data),
          });
        } else if (!axios.isAxiosError(error)) {
          console.error(error);
          toast({
            title: "Erro",
            description: String(error),
          });
        }
      } finally {
        toggleLoader(false);
      }
    };

    fetchData();
    // only re-run when one of these changes:
    // - you submit new filter values (toggle valuesChanged)
    // - page or pageSize change
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleLoader, toast, valuesChanged, pagination.page, pagination.pageSize]);

  const onSubmit = () => setValuesChanged((v) => !v);

  return (
    <Section title="Lista de Presença">
      <div className="space-y-8">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2"
          >
            <FiltersPresenceList
              generalRegisters={generalRegisters}
              courseClasses={courseClasses}
              form={form}
            />
          </form>
        </Form>
      </div>

      <div className="overflow-x-auto">
        <DataTable<PresenceListI, unknown>
          data={registers}
          columns={getColumns("lista_de_presenca")}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>

      <div className="flex w-full justify-end">
        <Button
          variant="outline"
          type="button"
          onClick={() => router.push("lista_de_presenca/create")}
          className="flex items-center space-x-2 text-base"
        >
          <Plus strokeWidth={5} />
          <span>Cadastrar</span>
        </Button>
      </div>
    </Section>
  );
}
