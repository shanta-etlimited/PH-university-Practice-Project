import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { FacultyControllers } from "./faculty.controller";
import { facultyValidation } from "./faculty.validation";

const router = express.Router();

router.get("/", FacultyControllers.getAllFaculty);

router.get("/:facultyId", FacultyControllers.getSingleFaculty);

router.patch("/:facultyId", 
    validateRequest(facultyValidation.updateFacultyValidationSchema), FacultyControllers.updateFaculty);

router.delete("/:facultyId", FacultyControllers.deleteFaculty);

export const FacultyRoutes = router;