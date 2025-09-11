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
import { Plus } from "lucide-react";
import type { SubmissionRecord } from "@/types/formResponse";
import { getColumns } from "./columns";
export default function GeneralRegister() {
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
        const formsRes= await  api.get<IDataTableResposne<SubmissionRecord[]>>("/forms/curso_introdutorio_em_mindfulness/submissions", {
            params: {
              'page': pagination.page,
              'limit': pagination.pageSize
            }
          });
        console.log(formsRes.data);
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

  return (
    <Section title="Curso Introdutório em Mindfulness">
      <div className="space-y-8">
      </div>
      <div className="overflow-x-auto">
        <DataTable<SubmissionRecord, unknown>
          data={forms}
          columns={getColumns('curso_introdutorio_em_mindfulness')}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
            <div className="flex w-full justify-end">
        <Button
          onClick={() => router.push('/forms/curso_introdutorio_em_mindfulness')}
          type="button"
          variant="outline"
          className="flex items-center justify-between text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
      </div>
    </Section>
  );
}
