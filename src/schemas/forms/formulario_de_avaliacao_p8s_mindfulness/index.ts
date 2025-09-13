import { z } from "zod";

export const formularioDeAvaliacaoP8sMindfulnessSchema = z.object({
    fullName: z.string().min(1, "O nome completo é obrigatório"),
    birthDate: z.date().optional(),

    satisfactionLevel: z.string().optional(),

    likedMostAndTakeaways: z.string().optional(),
    likedLeastSuggestions: z.string().optional(),
    personalChange: z.string().optional(),
    selfDifference: z.string().optional(),
    knowledgeMomentsImportance: z.string().optional(),
    tellAFriend: z.string().optional(),
    benefits: z.string().optional(),
    authorizeUse: z.string().optional(),
});

export type FormularioDeAvaliacaoP8sMindfulnessFormSchemaType = z.infer<typeof formularioDeAvaliacaoP8sMindfulnessSchema>;


