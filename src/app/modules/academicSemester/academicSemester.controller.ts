import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import { AcademicSemesterServices } from './academicSemester.service';



const createAcademicSemester = catchAsyncError(async ( req, res, next ) => {
  // creating a schema validation using zod
  // User name schema
  // const { password, student: studentData } = req.body;
  
  const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(
    req.body
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Academic semester is created successfully',
    data: result
  })
})

export const AcademicSemesterControllers = {
  createAcademicSemester,
};
