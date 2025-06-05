import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LessionService } from './lession.service';
import { CreateLessionDto } from './dto/create-lession.dto';
import { UpdateLessionDto } from './dto/update-lession.dto';
import { ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@ApiTags('Admin')
@Controller('lession')
@UseGuards(JwtAuthGuard)
export class LessionController {
  constructor(private readonly lessionService: LessionService) {}

  @Post()
  create(@Body() createLessionDto: CreateLessionDto) {
    return this.lessionService.create(createLessionDto);
  }

  @Get()
  findAll() {
    return this.lessionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lessionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLessionDto: UpdateLessionDto) {
    return this.lessionService.update(+id, updateLessionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lessionService.remove(+id);
  }
}
