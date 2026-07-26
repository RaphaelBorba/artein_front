"use client";
import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import { useToast } from "@/hooks/use-toast";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Option } from "@/types/smallModels";
import { Lead as LeadI } from "@/types/lead";
import { DataTable } from "@/components/self/DataTable";
import { Plus, Download } from "lucide-react";
import { getApiErrorMessage, parseField } from "@/lib/utils";
import { fetchAllRecords } from "@/lib/fetchAllRecords";
import { columnsToCsv, downloadCsv } from "@/lib/csvExport";
import { useRouter } from "next/navigation";
import axios from "axios";
import { masks } from "@/lib/masks";
import { IDataTableResposne, IPagination } from "@/types/dataTableResponse";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { leadFilterSchema, LeadFilterSchemaType } from "@/schemas/lead/leadFilterSchema";
import { FiltersLead } from "./filters";
import { getColumns } from "./columns";

export default function Leads() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [leads, setLeads] = useState<LeadI[]>([]);
  const [courses, setCourses] = useState<Option[]>([]);
  const [valuesChanged, setValuesChanged] = useState<boolean>(false)
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    totalPages: 10,
    totalCount: 100,
    hasNextPage: true,
    hasPreviousPage: true,
  })

  const form = useForm<LeadFilterSchemaType>({
    resolver: zodResolver(leadFilterSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      courseId: "null",
    },
  })

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const [leadsRes, coursesRes] = await Promise.all([
          api.get<IDataTableResposne<LeadI[]>>("/lead", {
            params: {
              'name': form.getValues('name') || undefined,
              'email': form.getValues('email') || undefined,
              'phone': parseField(form.getValues('phone'), masks.cellphone),
              'location': form.getValues('location') || undefined,
              'courseId': form.getValues('courseId') !== 'null' ? form.getValues('courseId') : undefined,
              'page': pagination.page,
              'limit': pagination.pageSize
            }
          }),
          api.get<Option[]>("/lead/courses"),
        ]);
        setLeads(leadsRes.data.records);
        setCourses(coursesRes.data);
        setPagination(leadsRes.data.pagination)
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

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [toggleLoader, toast, valuesChanged, pagination.page, pagination.pageSize]);

  const onSubmit = () => {
    setValuesChanged(!valuesChanged)
  }

  const handleDelete = async (id: number) => {
    if (!window.confirm("Tem certeza que deseja deletar este lead?")) return;

    toggleLoader(true);
    try {
      await api.delete(`/lead/${id}`);
      toast({ title: "Lead deletado com sucesso" });
      setValuesChanged((prev) => !prev);
    } catch (error) {
      toast({
        title: "Erro",
        description: getApiErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      toggleLoader(false);
    }
  }

  const handleExport = async () => {
    toggleLoader(true);
    try {
      const all = await fetchAllRecords<LeadI>("/lead");
      const csv = columnsToCsv(getColumns('leads'), all);
      downloadCsv(`leads_${new Date().toISOString().slice(0, 10)}.csv`, csv);
    } catch (error) {
      toast({
        title: "Erro",
        description: getApiErrorMessage(error),
        variant: "destructive",
      });
    } finally {
      toggleLoader(false);
    }
  }

  return (
    <Section title="Leads">
      <div className="space-y-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 items-end gap-4 sm:grid-cols-2 md:grid-cols-4">

            <FiltersLead
              form={form}
              courses={courses}
            />

          </form>
        </Form>
      </div>
      <div className="overflow-x-auto">
        <DataTable<LeadI, unknown>
          data={leads}
          columns={getColumns('leads', true, true, handleDelete)}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button
          onClick={handleExport}
          type="button"
          variant="outline"
          className="flex items-center gap-2 text-base"><Download strokeWidth={2} /> Exportar CSV</Button>
        <Button
          onClick={() => router.push('leads/create')}
          type="button"
          variant="outline"
          className="flex items-center justify-between text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
      </div>
    </Section>
  );
}
