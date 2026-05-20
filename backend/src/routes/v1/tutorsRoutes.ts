import express = require("express");
import * as tutorsController from "../../controllers/tutorsController";

const router = express.Router();

router.get("/", tutorsController.getAll);
router.get("/:id", tutorsController.getById);

router.post("/", tutorsController.create);

router.put("/:id", tutorsController.update);

router.delete("/:id", tutorsController.deleteById);

export default router;