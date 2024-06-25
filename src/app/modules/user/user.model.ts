import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    id: {
      type: String,
      required: [true, 'User id is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'User password is required'],
      maxLength: [20, 'Password cannot be more than 20 characters'],
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
    role: {
      type: String,
      enum: ['student', 'admin', 'faculty'],
    },
    status: {
      type: String,
      enum: ['in-progress', 'blocked'],
      default: 'in-progress',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre('save', async function (next) {
  // console.log(this, "pre hook: we will save the data")

  //hashing password and save into db
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

//set "" after saving password
userSchema.post('save', async function (doc, next) {
  doc.password = '';
  // console.log(this, "post hook: we just saved the data")
  next();
});

export const User = model<TUser>('User', userSchema);
