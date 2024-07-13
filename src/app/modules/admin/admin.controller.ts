import { NextFunction, Request, RequestHandler, Response } from 'express';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsyncError from '../../utils/catchAsyncError';
import { AdminServices } from './admin.service';

const getAllAdmins = catchAsyncError(async (req, res) => {
  const result = await AdminServices.getAllAdminsIntoDB(req.query);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admins are retrieved successfully',
    data: result,
  });
});

const getSingleAdmin = catchAsyncError(async (req, res) => {
  const { adminId } = req.params;
  console.log('adminId', adminId);

  const result = await AdminServices.getSingleAdminIntoDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is retrieved successfully',
    data: result,
  });
});

const updateAdmin = catchAsyncError(async (req, res) => {
  const { adminId } = req.params;
  const updateData = req.body.admin;
  const result = await AdminServices.updateAdminIntoDB(
    adminId,
    updateData,
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is updated successfully',
    data: result,
  });
});

const deleteAdmin = catchAsyncError(async (req, res) => {
  const { adminId } = req.params;
  const result = await AdminServices.deleteAdminIntoDB(adminId);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Admin is deleted successfully',
    data: result,
  });
});

export const AdminControllers = {
  getAllAdmins,
  getSingleAdmin,
  updateAdmin,
  deleteAdmin,
};
