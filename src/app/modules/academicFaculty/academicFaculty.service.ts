import { TAcademicFaculty } from "./academicFaculty.interface";
import { AcademicFaculty } from "./academicFaculty.model";

const createAcademicFacultyIntoDB = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
}

const getAllAcademicFacultiesIntoDB = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

const getSingleAcademicFacultyIntoDB = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
}

const updateSingleAcademicFacultyIntoDB = async (_id: string, payload: Partial<TAcademicFaculty>) => {
    const result = await AcademicFaculty.findByIdAndUpdate(_id, payload, {
        new: true
    });
    return result;
}

export const AcademicFacultyServices = {
    createAcademicFacultyIntoDB,
    getAllAcademicFacultiesIntoDB,
    getSingleAcademicFacultyIntoDB,
    updateSingleAcademicFacultyIntoDB
}