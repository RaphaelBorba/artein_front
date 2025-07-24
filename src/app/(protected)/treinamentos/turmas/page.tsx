"use client";
import { useEffect, useState } from "react";
import Section from "@/components/self/Section";
import { useToast } from "@/hooks/use-toast";
import { useLoader } from "@/hooks/useLoader";
import api from "@/lib/api";
import { DataTable } from "@/components/self/DataTable";
import axios from "axios";
import { IDataTableResposne, IPagination } from "@/types/dataTableResponse";
import { getColumns } from "./columns";
import { CourseI } from "@/types/courses";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

export default function GeneralRegister() {
  const { toast } = useToast();
  const { toggleLoader } = useLoader();
  const [registers, setRegisters] = useState<CourseI[]>([]);
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
        const generalRes= await  api.get<IDataTableResposne<CourseI[]>>("/course-classes", {
            params: {
              'page': pagination.page,
              'limit': pagination.pageSize
            }
          })
          console.log(generalRes)
        setRegisters(generalRes.data.records);
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
  }, [toggleLoader, toast, pagination.page, pagination.pageSize]);

  return (
    <Section title="Turmas">
      <div className="space-y-8">
        {/* Grid for the four standard inputs */}
      </div>
      <div className="overflow-x-auto">
        <DataTable<CourseI, unknown>
          data={registers}
          columns={getColumns('turmas')}
          pagination={pagination}
          setPagination={setPagination}
        />
      </div>
            <div className="flex w-full justify-end">
        <Button
          onClick={() => router.push('turmas/create')}
          type="button"
          variant="outline"
          className="flex items-center justify-between text-base"><Plus strokeWidth={5} /> Cadastrar</Button>
      </div>
    </Section>
  );
}
