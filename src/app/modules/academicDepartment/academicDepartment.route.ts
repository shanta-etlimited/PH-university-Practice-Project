import express from "express";
import { AcademicDepartmentControllers } from "./academicDepartment.controller";
import validateRequest from "../../middlewares/validateRequest";
import { academicDepartmentValidation } from "./academicDepartment.validation";

const router = express.Router();

router.post("/create-academic-department",
    validateRequest(academicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment);

router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

router.get("/:departmentId", AcademicDepartmentControllers.getSingleAcademicDepartment);

router.patch("/:departmentId", 
    validateRequest(academicDepartmentValidation.updateAcademicDepartmentValidationSchema), AcademicDepartmentControllers.updateAcademicDepartment);

export const AcademicDepartmentRoutes = router;