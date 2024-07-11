import { Model, Types } from 'mongoose';

export type TGender = "male" | "female" | "other";
export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type TGuardian={
    fatherName: string;
    fatherOccupation: string;
    fatherContactNo: string;
    motherName: string;
    motherOccupation: string;
    motherContactNo: string;
}

export type TLocalGuardian={
    name: string;
    occupation: string;
    contactNo: string;
    address: string;
}

export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}
export type TStudent = {
    id: string;
    user: Types.ObjectId;
    password: string;
    name: TUserName;
    gender:  TGender;
    dateOfBirth?: String;
    email: string; 
    contactNumber: string;
    emergencyContactNumber: string;
    bloodGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    guardian: TGuardian;
    localGuardian: TLocalGuardian;
    profileImage?: string;
    admissionSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
}

export type StudentMethod = {
    isUserExists(id: string): Promise<TStudent | null>
}

export type StudentModel = Model<TStudent , Record<string, never>, StudentMethod>;