import httpStatus from "http-status";
import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import { AcademicFacultyServices } from "./academicFaculty.service";

const createAcademicFaculty = catchAsyncError(async (req, res, next) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is created successfully',
        data: result
    })
})

const getAllAcademicFaculties = catchAsyncError(async (req, res) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesIntoDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculties are retrieved successfully',
        data: result
    })
})

const getSingleAcademicFaculty = catchAsyncError(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.getSingleAcademicFacultyIntoDB(facultyId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is retrieved successfully',
        data: result
    })
})

const updateSingleAcademicFaculty = catchAsyncError(async (req, res) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateSingleAcademicFacultyIntoDB(facultyId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic faculty is updated successfully',
        data: result
    })
})

export const AcademicFacultyControllers = {
    createAcademicFaculty,
    getAllAcademicFaculties,
    getSingleAcademicFaculty,
    updateSingleAcademicFaculty
}