import httpStatus from 'http-status';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';
import catchAsyncError from '../../utils/catchAsyncError';

const createStudent = catchAsyncError(async (req, res) => {
  const { password, student: studentData } = req.body;


  const result = await UserServices.createStudentIntoDB(password, studentData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created succesfully',
    data: result,
  });
});

const createFaculty = catchAsyncError(async (req, res) => {
  const { password, faculty: facultyData } = req.body;


  const result = await UserServices.createFacultyIntoDB(password, facultyData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty is created succesfully',
    data: result,
  });
});

export const UserControllers = {
  createStudent,
  createFaculty
};