import httpStatus from 'http-status';
import config from '../../config';
import AppError from '../../errors/AppError';
import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';
import { User } from './user.model';
import { generateStudentId } from './user.utils';
import mongoose from 'mongoose';

const createStudentIntoDB = async (password: string, payload: TStudent) => {
  //create a user object
  let userData: Partial<TUser> = {};

  //if password is not given, use default password
  if (!password) {
    userData.password = config.default_password as string;
  } else {
    userData.password = password;
  }

  //set student role
  userData.role = 'student';

  const admissionSemester = await AcademicSemester.findById(
    payload.admissionSemester,
  );

  if (admissionSemester === null) {
    // Handle the case when the document is not found
    throw new AppError(httpStatus.NOT_FOUND, 'Admission semester not found');
  }

  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    //set manually generated id
    userData.id = await generateStudentId(admissionSemester);

    //create a user(transaction-1)
    const newUser = await User.create([userData], { session });
    //create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user');
    }
      //set id , _id as user
      payload.id = newUser[0].id;
      payload.user = newUser[0]._id; //reference _id

    //create a student(transaction-2)
      const newStudent = await Student.create([payload], { session });
      if(!newStudent.length){
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create student');
      }
      await session.commitTransaction();
      await session.endSession();
      return newStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('Failed to create student');
  }
};

export const UserServices = {
  createStudentIntoDB,
};