import { z } from "zod";

export const formularioDeInscricaoEmEventosSchema = z.object({
    eventName: z.string().min(1, "O evento é obrigatório"),
    fullName: z.string().min(1, "O nome completo é obrigatório"),
    phone: z.string().optional(),
    cep: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    district: z.string().optional(),
    state: z.string().optional(),
    email: z.string().email().optional(),
    payment: z.string().optional(),
    paymentMedium: z.string().optional(),
    otherPayment: z.string().optional(),

    // Questions
    previousActivityArtin: z.string().optional(),
    inspiration: z.string().optional(),
    expectations: z.string().optional(),
    personalDevelopmentInterests: z.string().optional(),
    wantsToReceiveInfo: z.string().optional(),
    suggestions: z.string().optional(),
    wouldRecommend: z.string().optional(),
});

export type FormularioDeInscricaoEmEventosFormSchemaType = z.infer<typeof formularioDeInscricaoEmEventosSchema>;


