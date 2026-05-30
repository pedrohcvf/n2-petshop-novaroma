import { z } from "zod";
import {stateEnum} from "@prisma/client"

export const createAppointmentsSchema = z.object({
    scheduled_date : z.date(),
    status : z.nativeEnum(stateEnum),
    fk_tutor_id : z.number(),
    fk_pet_id : z.number(),
    fk_service_id : z.number(),
})


export const updateAppointmentsSchema = createAppointmentsSchema.partial();