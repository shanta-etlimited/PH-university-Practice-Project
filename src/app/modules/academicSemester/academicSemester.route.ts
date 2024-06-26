import express from "express";
import { AcademicSemesterControllers } from "./academicSemester.controller";
import validateRequest from "../../middlewares/validateRequest";
import { AcademicSemesterValidationSchema } from "./academicSemester.validation";

const router = express.Router();

router.post("/create-academic-semester", 
    validateRequest(AcademicSemesterValidationSchema.academicSemesterValidation),
    AcademicSemesterControllers.createAcademicSemester);

export const AcademicSemesterRoutes = router;