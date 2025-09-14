import express from "express";
import { addDepartment, deleteDepartment, getAllDepartment } from "../controllers/departmentController.js";

const router = express.Router();

router.get("/", getAllDepartment);
router.post("/", addDepartment);
router.delete("/:id", deleteDepartment);

export default router;
