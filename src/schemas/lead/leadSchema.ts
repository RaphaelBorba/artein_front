import * as z from "zod";

export const leadSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  email: z.string().optional(),
  phone: z.string().min(1, "O telefone é obrigatório"),
  location: z.string().optional(),
  shift: z.string().optional(),
  observations: z.string().optional(),
  courses: z.array(z.string()).optional(),
});

export type LeadSchemaType = z.infer<typeof leadSchema>;
