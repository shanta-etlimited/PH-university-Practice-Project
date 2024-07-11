import { Model, Types } from "mongoose"

export type TGender = "male" | "female" | "other";
export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TFaculty = {
    id: string,
    user: Types.ObjectId,
    designation: string,
    name: TUserName,           
    gender: TGender,
    dateOfBirth?: String,
    email: string,
    contactNumber: string,
    emergencyContactNumber: string,
    bloodGroup?: TBloodGroup,
    presentAddress: string,
    permanentAddress: string,
    profileImage?: string,
    academicDepartment: Types.ObjectId,
    academicFaculty: Types.ObjectId,
    isDeleted: boolean
}

export type FacultyModel = Model<TFaculty> & {
    isUserExists(id: string): Promise<TFaculty | null>;
};
