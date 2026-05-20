import { z } from "zod";
import { productEnum } from "@prisma/client";

export const createProductSchema = z.object({
    name: z.string().min(1).max(255),
    description: z.string().min(1).max(255).optional(),
    price: z.number().positive(),
    stock: z.number().positive(),
    product_type: z.nativeEnum(productEnum)
})

export const updateProductSchema = createProductSchema.partial();