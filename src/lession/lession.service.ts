import { Injectable } from '@nestjs/common';
import { CreateLessionDto } from './dto/create-lession.dto';
import { UpdateLessionDto } from './dto/update-lession.dto';

@Injectable()
export class LessionService {
  create(createLessionDto: CreateLessionDto) {
    console.log('createLessionDto', createLessionDto);
    return 'This action adds a new lession';
  }

  findAll() {
    return `This action returns all lession`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lession`;
  }

  update(id: number, updateLessionDto: UpdateLessionDto) {
    console.log('updateLessionDto', updateLessionDto);
    return `This action updates a #${id} lession`;
  }

  remove(id: number) {
    return `This action removes a #${id} lession`;
  }
}
