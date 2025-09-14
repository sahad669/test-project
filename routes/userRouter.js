import express from "express";
import { createEmployee, deleteEmployee, editEmployee, getAllEmployees, login, register } from "../controllers/userController.js";
import { checkAdmin, isLogged } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post('/create',isLogged,checkAdmin,createEmployee)
router.get('/employees',isLogged,checkAdmin,getAllEmployees)
router.patch('/editemployee/:id',isLogged,checkAdmin,editEmployee)
router.delete("/delete/:id",isLogged,checkAdmin,deleteEmployee)


export default router;
