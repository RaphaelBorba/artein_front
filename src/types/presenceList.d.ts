import { CourseClassesI } from "./couseClasses";
import { GeneralRegister } from "./generalRegister";

/**
 * Represents the structure of a Presence List record, 
 * based on the Prisma model.
 */
export interface PresenceListI {
  id: number;
  courseName: string | null;
  price: number | null; // Prisma Decimal is handled as a number in JS/TS
  presence: string[];    // Array of ISO date strings
  foul: string[];        // Array of ISO date strings
  replacement: string[]; // Array of ISO date strings
  observations: string | null;
  createdAt: string;     // ISO date string
  updatedAt: string;     // ISO date string

  // Relational fields
  generalRegisterId: number;
  generalRegister: GeneralRegister;

  courseClassId: number;
  courseClass: CourseClassesI;
}
