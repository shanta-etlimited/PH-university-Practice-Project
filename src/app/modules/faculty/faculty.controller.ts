import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import { FacultyServices } from './faculty.service';


const getAllFaculty = catchAsyncError(async (req, res) => {
  
  const result = await FacultyServices.getAllFacultiesFromDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties are retrieved successfully',
    data: result,
  });
});

const getSingleFaculty = catchAsyncError(async (req, res) => {
    const { facultyId } = req.params;
    const result = await FacultyServices.getSingleFacultyFromDB(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is retrieved successfully',
      data: result,
    });
});

const updateFaculty = catchAsyncError(async (req, res) => {
    const { facultyId } = req.params;
    const updateData = req.body.student;
    const result = await FacultyServices.updateFacultyIntoDB(
      facultyId,
      updateData,
    );
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is updated successfully',
      data: result,
    });
});

const deleteFaculty = catchAsyncError(async (req, res) => {
    const { facultyId } = req.params;
    const result = await FacultyServices.deleteFacultyFromDB(facultyId);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Faculty is deleted successfully',
      data: result,
    });
});

export const FacultyControllers = {
 getAllFaculty,
 getSingleFaculty,
 updateFaculty,
 deleteFaculty,
};