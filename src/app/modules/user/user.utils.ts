// year semesterCode 4digit number
import { TAcademicDepartment } from '../academicDepartment/academicDepartment.interface';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();

  //2030 01 0001
  return lastStudent?.id ? lastStudent.id : undefined;
};

export const generateStudentId = async (payload: TAcademicSemester) => {
  // first time 0000
  //0001  => 1
  let currentId = (0).toString(); // 0000 by deafult
  const lastStudentId = await findLastStudentId();// 2030 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); //01;
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2030
  const currentSemesterCode = payload.code;
  const currentYear = payload.year;

  if (
    lastStudentId && lastStudentSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
    currentId = lastStudentId.substring(6); // 00001
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

  incrementId = `${payload.year}${payload.code}${incrementId}`;

  return incrementId;
};


export const findLastFacultyId = async () => {
  const lastFaculty = await User.findOne(
    {
      role: 'faculty',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  console.log("last Faculty1", lastFaculty?.id);// F-0001
  console.log("last Faculty2", lastFaculty?.id.substring(2));// 0001
  

  return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

// F-0001
export const generateFacultyId = async () => {
  let currentId = (0).toString(); // 0 by deafult
  console.log("currentId",currentId);
  
  const lastFacultyId = await findLastFacultyId();
  if (lastFacultyId) {
    currentId = lastFacultyId // 0001
  }
  console.log(currentId);// 0001

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  console.log("incrementId",incrementId);// 0002
  incrementId = `F-${incrementId}`;
  console.log("incrementId",incrementId);// F-0002

  return incrementId;
};


export const findLastAdminId = async () => {
  const lastAdmin = await User.findOne(
    {
      role: 'admin',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  console.log("last Admin1", lastAdmin?.id);// A-0001
  console.log("last Admin2", lastAdmin?.id.substring(2));// 0001
  

  return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};


export const generateAdminId = async () => {
  let currentId = (0).toString(); // 0 by deafult
  console.log("currentId",currentId);
  
  const lastAdminId = await findLastAdminId();
  if (lastAdminId) {
    currentId = lastAdminId // 0001
  }
  console.log(currentId);// 0001

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  console.log("incrementId",incrementId);// 0002
  incrementId = `A-${incrementId}`;
  console.log("incrementId",incrementId);// A-0002

  return incrementId;
};