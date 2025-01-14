import { z } from "zod";

export const loginSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  password: z.string().min(1, "Senha é obrigatório")
});

export type UserFormData = z.infer<typeof loginSchema>;
