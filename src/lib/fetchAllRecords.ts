import api from "./api";
import { IDataTableResposne } from "@/types/dataTableResponse";

export async function fetchAllRecords<T>(
  url: string,
  extraParams?: Record<string, unknown>
): Promise<T[]> {
  const all: T[] = [];
  let page = 1;
  const limit = 100;

  while (true) {
    const response = await api.get<IDataTableResposne<T[]>>(url, {
      params: { ...extraParams, page, limit },
    });
    all.push(...response.data.records);
    if (!response.data.pagination.hasNextPage) break;
    page += 1;
  }

  return all;
}
