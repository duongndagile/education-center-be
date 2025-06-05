import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Room, RoomDocument } from 'libs/mongo/schemas/room.schema';
import { Model } from 'mongoose';

@Injectable()
export class RoomService {
  constructor(
    @InjectModel(Room.name)
    private roomModel: Model<RoomDocument>,
  ) {}

  create(createRoomDto: CreateRoomDto) {
    console.log('createRoomDto', createRoomDto);
    return this.roomModel.create(createRoomDto);
  }

  findAll() {
    return `This action returns all room`;
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    console.log('updateRoomDto', updateRoomDto);
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
