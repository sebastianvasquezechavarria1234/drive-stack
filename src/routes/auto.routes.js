import express from "express";
import * as autoController from "../controllers/auto.controller.js";
import { validateAuto } from "../middlewares/auto.validator.js";

const router = express.Router();

router.get("/", autoController.getAllAutos);
router.get("/:id", autoController.getAutoById);
router.post("/", validateAuto, autoController.createAuto);
router.put("/:id", validateAuto, autoController.updateAuto);
router.delete("/:id", autoController.deleteAuto);

export default router;
