
"use client";
import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import { useToast } from "@/hooks/use-toast";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { DataTable } from "@/components/self/DataTable";
import axios from "axios";
import { IDataTableResposne, IPagination } from "@/types/dataTableResponse";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus, Download } from "lucide-react";
import { getApiErrorMessage } from "@/lib/utils";
import { fetchAllRecords } from "@/lib/fetchAllRecords";
import { columnsToCsv, downloadCsv } from "@/lib/csvExport";
import type { SubmissionRecord } from "@/types/formResponse";
import { getColumns } from "./columns";

export default function FormularioDeAvaPage() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [forms, setForms] = useState<SubmissionRecord[]>([]);
  const [pagination, setPagination] = useState<IPagination>({
    page: 1,
    pageSize: 10,
    totalPages: 10,
    totalCount: 100,
    hasNextPage: true,
    hasPreviousPage: true,
  })

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      toggleLoader(true);
      try {
        const formsRes= await  api.get<IDataTableResposne<SubmissionRecord[]>>("/forms/formulario_de_ava/submissions", {
            params: {
              'page': pagination.page,
              'limit': pagination.pageSize
            }
          });
        setForms(formsRes.data.records ?? []);
        setPagination(formsRes.data.pagination);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          if (error.response?.status !== 401) {
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
  }, [toggleLoader, toast, pagination.page, pagination.pageSize]);

  const handleExport = async () => {
    toggleLoader(true);
    try {
      const all = await fetchAllRecords<SubmissionRecord>("/forms/formulario_de_ava/submissions");
      const csv = columnsToCsv(getColumns('/fichas/formulario_de_ava'), all);
      downloadCsv(`formulario_de_ava_${new Date().toISOString().slice(0, 10)}.csv`, csv);
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
    <Section title="Formulário de Ava Imersão em Mindfulness">
      <div className="space-y-8">
      </div>
      <div className="overflow-x-auto">
        <DataTable<SubmissionRecord, unknown>
          data={forms}
          columns={getColumns('/fichas/formulario_de_ava')}
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
          onClick={() => router.push('/forms/formulario_de_ava')}
          type="button"
          variant="outline"
          className="flex items-center justify-between text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
      </div>
    </Section>
  );
}
