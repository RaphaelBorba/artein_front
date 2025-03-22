import * as z from "zod";

export const generalRegisterFilterSchema = z.object({
    fullName: z.string().optional(),
    cpf: z.string().optional(),
    cnpj: z.string().optional(),
    phoneNumber: z.string().optional(),
    interestedInCourses: z.string().optional(),
    receiveInfoMethodId: z.string().optional(),
});

export type GeneralRegisterFilterSchemaType = z.infer<typeof generalRegisterFilterSchema>;