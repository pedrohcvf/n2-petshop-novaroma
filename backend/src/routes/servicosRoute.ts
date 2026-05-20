import express = require("express");
import * as servicosController from "../../controllers/servicosController";

const router = express.Router();

router.get("/", servicosController.getAll);
router.get("/:id", servicosController.getById);
router.post("/", servicosController.create);
router.put("/:id", servicosController.update);
router.delete("/:id", servicosController.deleteById);

export default router;