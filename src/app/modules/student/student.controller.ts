import { Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";


const getAllStudents = async(req: Request, res: Response) => {
   try{
    const result = await StudentServices.getAllStudentsFromDB();
    res.status(200).json({
        success: true,
        message: "Students are retrieved successfully",
        data: result
    })
   }catch(err: any){
    res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err
    })
   }
}


const getSingleStudent = async(req: Request, res: Response) => {
    try{
        const {studentId} = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is retrieved successfully",
            data: result
        })
    }catch(err: any){
     res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err
     })
    }
 }

 const updateStudent = async(req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const updateData = req.body.student; 
        const result = await StudentServices.updateStudentFromDB(studentId, updateData);
        res.status(200).json({
            success: true,
            message: 'Student is updated successfully',
            data: result,
        });
    } catch (err: any) {
        res.status(500).json({
            success: false,
            message: err.message || 'Something went wrong',
            error: err,
        });
    }
 }

 const deleteStudent = async(req: Request, res: Response) => {
    try{
        const {studentId} = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);
        res.status(200).json({
            success: true,
            message: "Student is deletedretrieved successfully",
            data: result
        })
    }catch(err: any){
     res.status(500).json({
        success: false,
        message: err.message || "Something went wrong",
        error: err
     })
    }
 }

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    updateStudent,
    deleteStudent
}


