import { Router } from "express";
import tutorsRoutes from "./tutorsRoutes";
import productsRoutes from "./productsRoutes";

const router = Router();

router.use("/tutors", tutorsRoutes);
router.use("/products", productsRoutes)

export default router;