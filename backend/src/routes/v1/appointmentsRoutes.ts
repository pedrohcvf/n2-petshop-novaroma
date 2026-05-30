import express = require("express");
import * as appontmentsController from "../../controllers/appointmentsController"

const router = express.Router()

router.get("/", appontmentsController.getAll)
router.get("/:id", appontmentsController.getById)

router.post("/", appontmentsController.create)

router.put("/", appontmentsController.update)

router.delete("/:id", appontmentsController.deleteById)

export default router;