import { RequestHandler } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';



const createStudent = catchAsyncError(async ( req, res, next ) => {
  //creating a schema validation using zod
  // User name schema
  const { password, student: studentData } = req.body;
  
  const result = await UserServices.createStudentIntoDB(
    password,
    studentData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result
  })
})

export const UserControllers = {
  createStudent,
};
