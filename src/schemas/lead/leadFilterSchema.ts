import * as z from "zod";

export const leadFilterSchema = z.object({
    name: z.string().optional(),
    email: z.string().optional(),
    phone: z.string().optional(),
    location: z.string().optional(),
    courseId: z.string().optional(),
});

export type LeadFilterSchemaType = z.infer<typeof leadFilterSchema>;
