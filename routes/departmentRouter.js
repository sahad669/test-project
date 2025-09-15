import express from "express";
import { addDepartment, deleteDepartment, getAllDepartment } from "../controllers/departmentController.js";
import { isLogged,checkAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllDepartment);
router.post("/",isLogged,checkAdmin,addDepartment);
router.delete("/:id",isLogged,checkAdmin,deleteDepartment);

export default router;
