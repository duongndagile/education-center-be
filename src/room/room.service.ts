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
    return this.roomModel.find().exec();
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: string, updateRoomDto: UpdateRoomDto) {
    return this.roomModel.findByIdAndUpdate(id, updateRoomDto);
  }

  remove(id: string) {
    const deleteRoom = this.roomModel.findByIdAndDelete(id);
    return deleteRoom;
  }
}
