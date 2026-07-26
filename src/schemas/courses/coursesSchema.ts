import { z } from "zod";

export const courseSchema = z.object({
    name: z.string().min(1, "Nome é obrigatório"),
    description: z.string().min(1, "Descrição é obrigatória"),
    workload: z.string().min(1, "Carga horária é obrigatória"),
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

export type CourseFormSchemaType = z.infer<typeof courseSchema>;
