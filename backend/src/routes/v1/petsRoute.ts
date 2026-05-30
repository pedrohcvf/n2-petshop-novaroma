import express = require("express");
import * as petsController from "../../controllers/petsController";

const router = express.Router();

router.get("/", petsController.getAll);
router.get("/:id", petsController.getById);

router.post("/", petsController.create);

router.put("/:id", petsController.update);

router.delete("/:id", petsController.deleteById);

export default router;