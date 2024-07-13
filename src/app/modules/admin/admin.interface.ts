import { Model, Types } from "mongoose"

export type TGender = "male" | "female" | "other";
export type TBloodGroup = "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
export type TUserName = {
    firstName: string;
    middleName?: string;
    lastName: string;
}

export type TAdmin = {
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
    isDeleted: boolean
}

export type AdminModel = Model<TAdmin> & {
    isUserExists(id: string): Promise<TAdmin | null>;
};
