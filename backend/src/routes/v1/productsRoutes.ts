import express = require("express");
import * as productsController from "../../controllers/productsController";

const router = express.Router();

router.get("/", productsController.getAll);
router.get("/:id", productsController.getById);

router.post("/", productsController.create);

router.put("/:id", productsController.update);

router.delete("/:id", productsController.deleteById);

export default router;