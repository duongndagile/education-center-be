import { Injectable } from '@nestjs/common';
import { CreateClassDto } from './dto/create-class.dto';
import { UpdateClassDto } from './dto/update-class.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Class, ClassDocument } from 'libs/mongo/schemas';
import { Model } from 'mongoose';

@Injectable()
export class ClassService {
  constructor(
    @InjectModel(Class.name)
    private classModel: Model<ClassDocument>,
  ) {}

  create(createClassDto: CreateClassDto) {
    return this.classModel.create(createClassDto);
  }

  findAll() {
    return this.classModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} class`;
  }

  update(id: number, updateClassDto: UpdateClassDto) {
    return this.classModel.findByIdAndUpdate(id, updateClassDto);
  }

  remove(id: number) {
    return this.classModel.findByIdAndDelete(id);
  }
}
