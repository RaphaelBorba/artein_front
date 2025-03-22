
export interface IDataTableResposne<Response> {
    records: Response,
    pagination: IPagination
}

export interface IPagination{
    page: number
    pageSize: number
    totalPages: number
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}