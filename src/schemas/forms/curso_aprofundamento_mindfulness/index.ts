import { z } from "zod";

export const cursoAprofundamentoMindfulnessSchema = z.object({
    fullName: z.string().min(1, "O nome completo é obrigatório"),
    phone: z.string().optional(),
    cep: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    email: z.string().email().optional(),
    alreadyParticipatedInCourse: z.string().optional(),
    alreadyParticipatedInCourseIntrodutorio: z.string().optional(),
    payment: z.string().optional(),
    bankAndInitialDepositDate: z.string().optional(),
    paymentMedium: z.string().optional(),
    paymentInstructions: z.string().optional(),
    depositData: z.string().optional(),
    whyCourse: z.string().optional(),
    keptTraining: z.string().optional(),
    frequentlyPracticed: z.string().optional(),
    otherContact: z.string().optional(),
    otherContactDescription: z.string().optional(),
    psychotherapyTreatment: z.string().optional(),
    specialNeeds: z.string().optional(),
    greatestGain: z.string().optional(),
    expectations: z.string().optional(),
});

export type CursoAprofundamentoMindfulnessFormSchemaType = z.infer<typeof cursoAprofundamentoMindfulnessSchema>;