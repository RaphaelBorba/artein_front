import { z } from "zod";

export const formularioDeAvaliacaoCursoAprofundamentoMindfulnessSchema = z.object({
    fullName: z.string().min(1, "O nome completo é obrigatório"),
    birthDate: z.date().optional(),

    satisfactionLevel: z.string().optional(),
    likedMostAndHighlights: z.string().optional(),
    likedLeastSuggestions: z.string().optional(),
    personalChange: z.string().optional(),
    selfDifference: z.string().optional(),
    knowledgeMomentsImportance: z.string().optional(),
    tellAFriend: z.string().optional(),
    benefitsBeyondPrevious: z.string().optional(),
    personalPracticeStimulation: z.string().optional(),
    authorizeUse: z.string().optional(),
});

export type FormularioDeAvaliacaoCursoAprofundamentoMindfulnessFormSchemaType = z.infer<typeof formularioDeAvaliacaoCursoAprofundamentoMindfulnessSchema>;


