/**
 * Represents a specific class offering for a course.
 */
export interface CourseClassesI {
  /** Auto-incrementing primary key */
  id: number;

  /** Name of the class (e.g., "Turma de Manhã") */
  name?: string;

  /** Total workload, e.g., "60h" */
  workload?: string;

  /** Identifier for the class, e.g., "T01" */
  classNumber?: string;

  /** Location where the class is held, e.g., "Unidade Centro" */
  location?: string;

  /** Full address of the class location */
  address?: string;
  
  /** The shift, e.g., "Manhã", "Tarde", "Noite" */
  shift?: string;

  /** An array of specific dates for each session of the class */
  sessionDates: Date[];

  /** The official start date of the class */
  startDate?: Date;

  /** The official end date of the class */
  endDate?: Date;

  /** The start time for daily sessions, e.g., "09:00" */
  startTime?: string;

  /** The end time for daily sessions, e.g., "12:00" */
  endTime?: string;

  /** Days of the week the class occurs, e.g., ["Segunda-feira", "Quarta-feira"] */
  daysOfWeek: string[];

  /** The price for this specific class offering */
  price?: number;
}
