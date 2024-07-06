import httpStatus from "http-status";
import catchAsyncError from "../../utils/catchAsyncError";
import sendResponse from "../../utils/sendResponse";
import { AcademicDepartmentServices } from "./academicDepartment.service";

const createAcademicDepartment = catchAsyncError(async (req, res) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDB(req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is created successfully',
        data: result
    })
})

const getAllAcademicDepartments = catchAsyncError(async (req, res) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsIntoDB();
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic departments are retrieved successfully',
        data: result
    })
})

const getSingleAcademicDepartment = catchAsyncError(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentIntoDB(departmentId);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is retrieved successfully',
        data: result
    })
})

const updateAcademicDepartment = catchAsyncError(async (req, res) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateSingleAcademicDepartmentIntoDB(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Academic department is updated successfully',
        data: result
    })
})

export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}