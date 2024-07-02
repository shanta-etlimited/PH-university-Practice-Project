import { academicSemesterNameCodeMapper } from './academicSemester.constant';
import { TAcademicSemester } from './academicSemester.interface';
import { AcademicSemester } from './academicSemester.model';

const createAcademicSemesterIntoDB = async (payload: TAcademicSemester) => {
  if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
    throw new Error('Invalid academic semester code');
  }

  const result = await AcademicSemester.create(payload);
  return result;
};

const getAllAcademicSemesterFromDB = async () => {
  const result = await AcademicSemester.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (_id: string) => {
  const result = await AcademicSemester.findOne({ _id });
  // const  result = await AcademicSemester.aggregate([
  //     {$match: {_id: id}}
  // ])
  return result;
};

const updateSingleAcademicSemesterFromDB = async ( _id: string, payload: Partial<TAcademicSemester>) => {
  if (
    payload.name &&
    academicSemesterNameCodeMapper[payload.name] !== payload.code
  ) {
    throw new Error('Invalid academic semester code');
  }

  const result = await AcademicSemester.findByIdAndUpdate(_id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

export const AcademicSemesterServices = {
  createAcademicSemesterIntoDB,
  getAllAcademicSemesterFromDB,
  getSingleAcademicSemesterFromDB,
  updateSingleAcademicSemesterFromDB,
};
