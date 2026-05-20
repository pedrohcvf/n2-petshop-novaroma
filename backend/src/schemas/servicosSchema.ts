import { z } from "zod";

export const createServicoSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255),
    price: z.number().positive(),
    type: z.enum(["BATH", "SHEAR", "CONSULT", "VACCINATION"]),
})

export const updateServicoSchema = createServicoSchema.partial();