import { TStudent } from "./student.interface";
import { Student } from "./student.model";



const getAllStudentsFromDB = async()=>{
    const result = await Student.find().populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result
}

const getSingleStudentFromDB = async(id: string)=>{
    const result = await Student.findById({id}).populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    // const  result = await Student.aggregate([
    //     {$match: {id: id}}
    // ])
    return result
}


const updateStudentFromDB = async (id: string, updateData: Partial<TStudent>) => {
    const result = await Student.updateOne({ id }, { $set: updateData });
    return result;
}

const deleteStudentFromDB = async(id: string)=>{
    const result = await Student.updateOne({id}, {isDeleted: true});
    return result
}

export const StudentServices ={
    getAllStudentsFromDB,
    getSingleStudentFromDB,
    updateStudentFromDB,
    deleteStudentFromDB
}