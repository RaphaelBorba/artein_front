import { z } from "zod";

export const formularioAulasRegularesSchema = z.object({
    regularClasses: z
        .array(
            z.object({
                date: z.coerce.date(),
            })
        )
        .default([]),

    fullName: z.string().min(1, "O nome completo é obrigatório"),
    birthDate: z.date().optional(),
    cep: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    payment: z.string().optional(),
    otherPayment: z.string().optional(),
    paymentMedium: z.string().optional(),

    specialNeeds: z.string().optional(),
    underMedicalCare: z.string().optional(),
    whichMedicalCare: z.string().optional(),
    underPsychologicalCare: z.string().optional(),
    whichPsychologicalCare: z.string().optional(),
    underPsychiatricCare: z.string().optional(),
    whichPsychiatricCare: z.string().optional(),

    healthImportantInfo: z.string().optional(),
    previousActivityArtin: z.string().optional(),
    inspiration: z.string().optional(),
    otherRegularClassInterest: z.string().optional(),
    wantsCourseInfo: z.string().optional(),
    suggestions: z.string().optional(),
    wouldRecommend: z.string().optional(),
});

export type FormularioAulasRegularesFormSchemaType = z.infer<typeof formularioAulasRegularesSchema>;


