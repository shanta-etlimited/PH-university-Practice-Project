import express from "express";
import { StudentControllers } from "./student.controller";

const router = express.Router();

router.get("/", StudentControllers.getAllStudents);

router.get("/:studentId", StudentControllers.getSingleStudent);

router.put("/:studentId", StudentControllers.updateStudent);

router.delete("/:studentId", StudentControllers.deleteStudent);

export const StudentRoutes = router;