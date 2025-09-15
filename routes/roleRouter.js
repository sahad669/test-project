import express from "express";
import { createRole, getRole } from "../controllers/roleController.js";
import { isLogged,checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getRole);
router.post("/", isLogged,checkAdmin,createRole);

export default router;
