import { z } from "zod";

export const courseClassSchema = z.object({
  // Optional string fields
  name: z.string().optional(),
  workload: z.string().optional(),
  classNumber: z.string().optional(),
  location: z.string().optional(),
  address: z.string().optional(),
  shift: z.string().optional(),

  // Date and Time fields
  // Uses z.coerce.date() to automatically convert string inputs into Date objects
  sessionDates: z
    .array(
      z.object({
        date: z.coerce.date(),
      })
    )
    .default([]),

  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),

  // Validates time in HH:mm format
  startTime: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:mm)")
    .optional(),
  endTime: z.string()
    .regex(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, "Formato de hora inválido (HH:mm)")
    .optional(),

  // Array of strings
  daysOfWeek: z.array(z.string()),

  // Optional Price field, adapted from your reference
  // It handles empty strings, validates the format, and transforms it into a number
    price: z
        .string()
        .nonempty('Preço é obrigatório')
        // até 8 dígitos antes da vírgula e 1–2 depois (aceita ponto ou vírgula)
        .regex(
            /^(\d{1,8})([.,]\d{1,2})?$/,
            'Preço inválido: máximo 8 dígitos inteiros e até 2 decimais'
        )
        .transform((str) => {
            // padroniza vírgula → ponto e converte
            const num = parseFloat(str.replace(',', '.'))
            return Math.round(num * 100) / 100
        }),
});

// This creates a TypeScript type from the schema
export type CourseClassFormSchemaType = z.infer<typeof courseClassSchema>;
