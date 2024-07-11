import { Schema, model } from 'mongoose';
import {
  TGuardian,
  TLocalGuardian,
  TStudent,
  StudentMethod,
  StudentModel,
  TUserName,
} from './student.interface';
import { BloodGroup, Gender } from './student.constant';

export const userNameSchema = new Schema<TUserName>({
  firstName: {
    type: String,
    required: [true, 'First Name is required'],
    trim: true,
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
  middleName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
    required: [true, 'Last Name is required'],
    maxlength: [20, 'Name can not be more than 20 characters'],
  },
});

export const guardianSchema = new Schema<TGuardian>({
  fatherName: {
    type: String,
    required: true,
  },
  fatherOccupation: {
    type: String,
    required: true,
  },
  fatherContactNo: {
    type: String,
    required: true,
  },
  motherName: {
    type: String,
    required: true,
  },
  motherOccupation: {
    type: String,
    required: true,
  },
  motherContactNo: {
    type: String,
    required: true,
  },
});

export const localGuardianSchema = new Schema<TLocalGuardian>({
  name: {
    type: String,
    required: true,
  },
  occupation: {
    type: String,
    required: true,
  },
  contactNo: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
});

const studentSchema = new Schema<TStudent, StudentModel, StudentMethod>(
  {
    id: {
      type: String,
      required: [true, 'Student id is required'],
      unique: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      required: [true, 'User id is required'],
      unique: true,
      ref: 'User',
    },
    name: {
      type: userNameSchema,
      required: [true, 'Student name is required'],
    },
    gender: {
      type: String,
      enum: {
        values: Gender,
        message: '{VALUE} is not supported',
      },
      required: [true, 'Student gender is required'],
    },
    dateOfBirth: {
      type: String,
    },
    email: {
      type: String,
      required: [true, 'Student email is required'],
      unique: true,
    },
    contactNumber: {
      type: String,
      required: [true, 'Student contact number is required'],
    },
    emergencyContactNumber: {
      type: String,
      required: [true, 'Student emergency contact number is required'],
    },
    bloodGroup: {
      type: String,
      enum: {
        values: BloodGroup,
        message: '{VALUE} is not a valid blood group',
      },
    },
    presentAddress: {
      type: String,
      required: [true, 'Student present address is required'],
    },
    permanentAddress: {
      type: String,
      required: [true, 'Student permanent address is required'],
    },
    guardian: {
      type: guardianSchema,
      required: [true, 'Student guardian is required'],
    },
    localGuardian: {
      type: localGuardianSchema,
      required: [true, 'Student local guardian is required'],
    },
    profileImage: {
      type: String,
    },
    admissionSemester: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicSemester',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    academicDepartment: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicDepartment',
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
  },
);

//virtual
studentSchema.virtual('fullName').get(function () {
  return `${this?.name?.firstName} ${this?.name?.middleName} ${this?.name?.lastName}`;
});

//query middleware
studentSchema.pre('find', function (next) {
  this.find({ isUpdated: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isUpdated: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isUpdated: { $ne: true } } });
  next();
});

studentSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } });
  next();
});

studentSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } });
  next();
});

//creating a custom instance method
studentSchema.methods.isUserExists = async function (id: string) {
  const existingUser = await Student.findOne({ id });
  return existingUser;
};

export const Student = model<TStudent, StudentModel>('Student', studentSchema);
