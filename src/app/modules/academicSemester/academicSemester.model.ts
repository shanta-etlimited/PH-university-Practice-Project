import {  Schema, model } from "mongoose";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemesterCode, AcademicSemesterName, Months } from "./academicSemester.constant";

const academicSemesterSchema = new Schema<TAcademicSemester>({
    name: {type: String, required: true, enum: AcademicSemesterName},
    code: {type: String, required: true, enum: AcademicSemesterCode},
    year: {type: Date, required: true},
    startMonth: {type: String, required: true, enum: Months},
    endMonth: {type: String, required: true, enum: Months},

})

export const AcademicSemester = model<TAcademicSemester>("AcademicSemester", academicSemesterSchema)