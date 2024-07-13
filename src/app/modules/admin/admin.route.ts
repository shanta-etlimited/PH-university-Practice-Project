import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AdminControllers } from "./admin.controller";
import { adminValidation } from "./admin.validation";

const router = express.Router();

router.get("/", AdminControllers.getAllAdmins);

router.get("/:adminId", AdminControllers.getSingleAdmin);

router.patch("/:adminId", 
    validateRequest(adminValidation.updateAdminValidationSchema), AdminControllers.updateAdmin);

router.delete("/:adminId", AdminControllers.deleteAdmin);

export const AdminRoutes = router;