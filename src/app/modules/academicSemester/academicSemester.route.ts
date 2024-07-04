import express from 'express';
import { AcademicSemesterControllers } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidationSchema } from './academicSemester.validation';

const router = express.Router();

router.post(
  '/create-academic-semester',
  validateRequest(AcademicSemesterValidationSchema.academicSemesterValidation),
  AcademicSemesterControllers.createAcademicSemester,
);
router.get('/', AcademicSemesterControllers.getAllAcademicSemesters);
router.get('/:semesterId', AcademicSemesterControllers.getSingleAcademicSemester);
router.patch("/:semesterId", validateRequest(AcademicSemesterValidationSchema.updateAcademicSemesterValidation),AcademicSemesterControllers.updateAcademicSemester);

export const AcademicSemesterRoutes = router;
