import { z } from 'zod';

const createAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic department must be string',
      required_error: 'Academic department name is required',
    }),
    academicFaculty: z.string({
      invalid_type_error: 'Academic faculty must be string',
      required_error: 'Academic faculty id is required',
    }),
  }),
});

const updateAcademicDepartmentValidationSchema = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: 'Academic department must be string',
        required_error: 'Academic department name is required',
      })
      .optional(),
    academicFaculty: z
      .string({
        invalid_type_error: 'Academic faculty must be string',
        required_error: 'Academic faculty id is required',
      })
      .optional(),
  }),
});

export const academicDepartmentValidation = {
  createAcademicDepartmentValidationSchema,
  updateAcademicDepartmentValidationSchema,
};
