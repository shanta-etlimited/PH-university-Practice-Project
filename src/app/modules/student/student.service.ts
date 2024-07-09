import mongoose from 'mongoose';
import { TStudent } from './student.interface';
import { Student } from './student.model';
import AppError from '../../errors/AppError';
import { User } from '../user/user.model';
import httpStatus from 'http-status';



const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  const { searchTerm, sort, limit, ...filterQuery } = query;

  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  const searchConditions: Record<string, any> = {};

  if (searchTerm) {
    const searchRegex = new RegExp(searchTerm as string, 'i');
    searchConditions.$or = studentSearchableFields.map((field) => ({ [field]: searchRegex }));
  }

  // Exclude unnecessary fields
  const excludedFields = ['searchTerm', 'sort', 'limit'];
  excludedFields.forEach((field) => delete filterQuery[field]);

  let studentsQuery = Student.find({ ...searchConditions, ...filterQuery })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });

  // Apply sorting
  const sortFields = sort ? (sort as string).split(',').join(' ') : '-createdAt';
  studentsQuery = studentsQuery.sort(sortFields);
  
  // Apply pagination
  const limitNumber = limit ? parseInt(limit as string, 10) : 10;
  studentsQuery = studentsQuery.limit(limitNumber);

  const results = await studentsQuery.exec();
  return results;
};



const getSingleStudentFromDB = async (id: string) => {
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicFaculty',
      },
    });
  // const  result = await Student.aggregate([
  //     {$match: {id: id}}
  // ])
  return result;
};

const updateStudentFromDB = async (id: string, payload: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingStudentData,
  };

  /*
      guardain: {
        fatherOccupation:"Teacher"
      }
  
      guardian.fatherOccupation = Teacher
  
      name.firstName = 'Mezba'
      name.lastName = 'Abedin'
    */

  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdatedData[`guardian.${key}`] = value;
    }
  }

  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdatedData[`localGuardian.${key}`] = value;
    }
  }

  console.log(modifiedUpdatedData);

  const result = await Student.findOneAndUpdate({ id }, modifiedUpdatedData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteStudentFromDB = async (id: string) => {
  const studentExist = await Student.findOne({ id });
  if (!studentExist) {
    throw new AppError(httpStatus.BAD_REQUEST, 'This student does not exist');
  }

  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );

    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user');
    }

    await session.commitTransaction();
    await session.endSession();
    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to delete student');
  }
};

export const StudentServices = {
  getAllStudentsFromDB,
  getSingleStudentFromDB,
  updateStudentFromDB,
  deleteStudentFromDB,
};
