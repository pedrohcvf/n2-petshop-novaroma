import { z } from "zod";

export const createTutorsSchema = z.object({
    name: z.string().min(1).max(255),
    email: z.email(),
    phone: z.string().regex(/^(\d{2}) \d{5}-\d{4}$/).min(11).max(11),
    address: z.string().min(1).max(255),
});

export const updateTutorsSchema = createTutorsSchema.partial();