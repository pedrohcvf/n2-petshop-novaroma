import {z} from "zod"

export const createPetsSchema = z.object({
    name: z.string().min(1).max(255),
    specie: z.string().min(1).max(255),
    race: z.string().min(1).max(255),
    gender: z.enum(["M", "F"]),
    fk_tutor_id: z.number()
})

export const updatePetsSchema = createPetsSchema.partial();