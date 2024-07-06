import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";

const createAcademicDepartmentIntoDB = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
}

const getAllAcademicDepartmentsIntoDB = async () => {
    const result = await AcademicDepartment.find();
    return result;
}

const getSingleAcademicDepartmentIntoDB = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
}

const updateSingleAcademicDepartmentIntoDB = async (_id: string, payload: Partial<TAcademicDepartment>) => {
    const result = await AcademicDepartment.findByIdAndUpdate(_id, payload, {
        new: true
    });
    return result;
}


export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDB,
    getAllAcademicDepartmentsIntoDB,
    getSingleAcademicDepartmentIntoDB,
    updateSingleAcademicDepartmentIntoDB
}