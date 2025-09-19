import { IUserRepository } from '../../../../domain/repositories/IUserRepository';
import { User } from '../../../../domain/entities/User';
import { UserModel } from '../models/UserModel';
import { Types } from 'mongoose';

export class UserRepository implements IUserRepository {
  async create(user: User): Promise<User> {
    const userModel = new UserModel({
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    });

    const savedUser = await userModel.save();

    return new User(
      (savedUser._id as Types.ObjectId).toString(),
      savedUser.name,
      savedUser.email,
      savedUser.password,
      savedUser.role as 'admin' | 'employee',
      savedUser.createdAt,
      savedUser.updatedAt
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const userModel = await UserModel.findOne({ email });
    if (!userModel) return null;

    return new User(
      (userModel._id as Types.ObjectId).toString(),
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.role as 'admin' | 'employee',
      userModel.createdAt,
      userModel.updatedAt
    );
  }

  async findById(id: string): Promise<User | null> {
    const userModel = await UserModel.findById(id);
    if (!userModel) return null;

    return new User(
      (userModel._id as Types.ObjectId).toString(),
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.role as 'admin' | 'employee',
      userModel.createdAt,
      userModel.updatedAt
    );
  }

  async update(id: string, userData: Partial<User>): Promise<User | null> {
    const userModel = await UserModel.findByIdAndUpdate(id, userData, { new: true });
    if (!userModel) return null;

    return new User(
      (userModel._id as Types.ObjectId).toString(),
      userModel.name,
      userModel.email,
      userModel.password,
      userModel.role as 'admin' | 'employee',
      userModel.createdAt,
      userModel.updatedAt
    );
  }
}
