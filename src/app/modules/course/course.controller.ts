import httpStatus from "http-status";
import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import { CourseServices } from "./course.service";

const createCourse = catchAsyncError(async (req, res, next) => {
    const result = await CourseServices.createCourseIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is created successfully',
        data: result
    })
})

const getAllCourses = catchAsyncError(async (req, res) => {
    const result = await CourseServices.getAllCourseFromDB(req.query);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Courses are retrieved successfully',
        data: result
    })
})

const getSingleCourse = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is retrieved successfully',
        data: result
    })
})

const updateSingleCourse = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.updateSingleCourseIntoDB(id, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is updated successfully',
        data: result
    })
})

const deleteSingleCourse = catchAsyncError(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteSingleCourseFromDB(id);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Course is deleted successfully',
        data: result
    })
})

export const CourseControllers = {
    createCourse,
    getAllCourses,
    getSingleCourse,
    updateSingleCourse,
    deleteSingleCourse
}