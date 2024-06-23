import {Schema, model} from 'mongoose'; 
import { TUser } from './user.interface';

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: [true, "User id is required"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "User password is required"],
        maxLength: [20, "Password cannot be more than 20 characters"]
    },
    needsPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['student', 'admin', 'faculty'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
},  
{
    timestamps: true
}
)

export const User = model<TUser>('User', userSchema)

