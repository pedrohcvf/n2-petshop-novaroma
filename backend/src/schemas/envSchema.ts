import { z } from "zod";
import dotenv from "dotenv";
dotenv.config()

const envSchema = z.object({
    PORT: z.coerce.number(),
    DATABASE_URL: z.string(),
    DIRECT_URL: z.string(),
    JWTSECRETKEY: z.string().min(32),
    NODE_ENV: z.enum(["development", "production", "test"])
});

export const env = envSchema.parse(process.env);