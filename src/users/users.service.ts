/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from 'libs/mongo/schemas';

import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const existing = await this.userModel.findOne({ email: data.email });
    if (existing) {
      throw new Error('User with this email already exists');
    }
    return this.userModel.create(data);
  }

  async update(id: string, data: UpdateUserDto) {
    const user = await this.userModel.findById(id);
    if (!user) {
      throw new Error('User not found');
    }

    if (data.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(data.password, salt);
    }

    return this.userModel.updateOne({ _id: id }, data, { new: true });
  }

  async findByEmail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).lean().exec();
  }
}
