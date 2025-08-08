import { z } from "zod";


export const presenceListSchema = z.object({
    generalRegisterId: z.string().optional(),
    courseClassId: z.string().optional(),
    courseName: z.string().optional(),
    price: z
        .string()
        .nonempty('Preço é obrigatório')
        .regex(
            /^(\d{1,8})([.,]\d{1,2})?$/,
            'Preço inválido: máximo 8 dígitos inteiros e até 2 decimais'
        )
        .transform((str) => {
            const num = parseFloat(str.replace(',', '.'))
            return Math.round(num * 100) / 100
        }),
    presence: z
        .array(
            z.object({
                date: z.coerce.date(),
            })
        )
        .default([]),
    foul: z
        .array(
            z.object({
                date: z.coerce.date(),
            })
        )
        .default([]),
    replacement: z
        .array(
            z.object({
                date: z.coerce.date(),
            })
        )
        .default([]),
    observations: z.string().optional(),
});

export type PresenceListSchemaType = z.infer<typeof presenceListSchema>;
