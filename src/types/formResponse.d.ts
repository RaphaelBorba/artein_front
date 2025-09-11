export type SubmissionRecord = {
  id: number;
  createdAt: Date; // serialized as ISO string in JSON
} & Record<string, unknown>;

export interface GetSubmissionsResponse {
  records: SubmissionRecord[];
  pagination: {
    page: number;
    pageSize: number;
    totalPages: number;
    totalCount: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}