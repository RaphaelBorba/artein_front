import * as z from "zod";

export const presenceListFilterSchema = z.object({
    generalRegisterId: z.string().optional(),
    courseClassId: z.string().optional(),
});

export type PresenceListFilterSchemaType = z.infer<typeof presenceListFilterSchema>;