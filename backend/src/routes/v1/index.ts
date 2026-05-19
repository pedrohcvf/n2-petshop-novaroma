import { Router } from "express";
import tutorsRoute from "./tutorsRoute";

const router = Router();

router.get("/test", tutorsRoute);

export default router;