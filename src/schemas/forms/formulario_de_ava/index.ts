import { z } from "zod";

export const formularioDeAvaSchema = z.object({
    fullName: z.string().min(1, "O nome completo é obrigatório"),
    birthDate: z.date().optional(),

    satisfactionLevel: z.string().optional(),
    likedMostAndHighlights: z.string().optional(),
    likedLeastDiscomfort: z.string().optional(),
    personalChange: z.string().optional(),
    takeHomeCare: z.string().optional(),
    tellAFriend: z.string().optional(),
    praiseOrComplaint: z.string().optional(),
    improvementSuggestions: z.string().optional(),
    nextTopics: z.string().optional(),
    wantsInfo: z.string().optional(),
    preferredMedia: z.string().optional(),
    authorizeUse: z.string().optional(),
});

export type FormularioDeAvaFormSchemaType = z.infer<typeof formularioDeAvaSchema>;


