import mongoose, { Schema, Document } from 'mongoose';
import { User } from '../../../../domain/entities/User';

export interface IUserModel extends Document {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'employee';
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'employee'], required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

UserSchema.pre<IUserModel>('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const UserModel = mongoose.model<IUserModel>('User', UserSchema);
