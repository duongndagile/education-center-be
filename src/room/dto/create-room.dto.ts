import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({
    type: String,
    example: 'Conference Room A',
    description: 'The name of the room',
    required: true,
  })
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: 'A spacious room for meetings and conferences',
    description: 'A brief description of the room',
    required: false,
  })
  @IsString()
  description?: string;

  @ApiProperty({
    type: String,
    example: '123 Main St, Springfield',
    description: 'The address of the room',
    required: false,
  })
  @IsString()
  address?: string;

  @ApiProperty({
    type: Number,
    example: 50,
    description: 'The maximum capacity of the room',
    required: true,
  })
  @IsNumber()
  capacity: number;
}
