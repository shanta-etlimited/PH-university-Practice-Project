import QueryBuilder from "../../builder/QueryBuilder";
import { courseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";

const createCourseIntoDB = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
};

const getAllCourseFromDB = async (query: Record<string, unknown>) => {
    const courseQuery = new QueryBuilder(Course.find().populate('preRequisiteCourses.course'), query)
    .search(courseSearchableFields)
    .filter()
    .sort()
    .paginate()
    .fields();
    const result = await courseQuery.modelQuery;
    return result;
};

const getSingleCourseFromDB = async (id: string) => {
    const result = await Course.findById(id).populate('preRequisiteCourses.course');
    return result;
};

const updateSingleCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const result = await Course.findByIdAndUpdate(id);
    return result;
};

const deleteSingleCourseFromDB = async (id: string) => {
    const result = await Course.findByIdAndUpdate(id, {isDeleted: true}, {new: true});
    return result;
};

export const CourseServices = {
    createCourseIntoDB,
    getAllCourseFromDB,
    getSingleCourseFromDB,
    updateSingleCourseIntoDB,
    deleteSingleCourseFromDB
}