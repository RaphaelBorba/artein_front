import { z } from "zod";

export const ps8EmMindfulnessSchema = z.object({
    fullName: z.string().min(1, "O nome completo é obrigatório"),
    profession: z.string().optional(),
    birthDate: z.date().optional(),
    cep: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    phone: z.string().optional(),
    email: z.string().email().optional(),
    indication: z.string().optional(),
    payment: z.string().optional(),
    otherPayment: z.string().optional(),
    paymentMedium: z.string().optional(),
    discount: z.string().optional(),
    otherDiscounts: z.string().optional(),
    bankAndInitialDepositDate: z.string().optional(),
    depositData: z.string().optional(),
    whyMindfulnessProgram: z.string().optional(),
    motivationForProgram: z.string().optional(),
    meditationExperience: z.string().optional(),
    mindfulnessContact: z.string().optional(),
    psychotherapyTreatment: z.string().optional(),
    specialNeeds: z.string().optional(),
    expectations: z.string().optional(),
});

export type P8SEmMindfulnessFormSchemaType = z.infer<typeof ps8EmMindfulnessSchema>;