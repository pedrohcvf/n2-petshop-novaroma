import { Router } from "express";
import * as testController from "../../controllers/testController"

const router = Router();

router.get("/test", testController.test);

export default router;