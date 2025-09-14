import express from "express";
import { createRole, getRole } from "../controllers/roleController.js";

const router = express.Router();

router.get("/", getRole);
router.post("/", createRole);

export default router;
