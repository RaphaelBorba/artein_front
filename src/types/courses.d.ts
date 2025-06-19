export interface CourseI {
  /** Auto-incrementing primary key */
  id: number;

  /** Course name (nullable in the DB) */
  name?: string;

  /** General description (nullable) */
  description?: string;

  /** Workload, e.g. "40h" (nullable) */
  workload?: string;

  /** Price in your currency, e.g. 199.90 (nullable) */
  price?: number;
}