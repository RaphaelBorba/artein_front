import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Formats an ISO date string into a "dd/mm/yy" format.
 *
 * @param {string} dateString - An ISO formatted date string (e.g., "1990-05-15T00:00:00.000Z").
 * @returns {string} - The formatted date string in "dd/mm/yy" format.
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
  const year = String(date.getFullYear()).slice(-2);
  return `${day}/${month}/${year}`;
}

/**
 * Calculates the age based on an ISO formatted birth date string.
 *
 * @param {string} dateString - An ISO formatted date string representing the birth date (e.g., "1990-05-15T00:00:00.000Z").
 * @returns {number} - The calculated age in years.
 */
export function calculateAge(dateString: string): number {
  const birthDate = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();

  // If the current month is before the birth month, or it's the birth month but the current day is before the birthday, subtract one year
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
}