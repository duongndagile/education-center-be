import { PartialType } from '@nestjs/swagger';
import { CreateLessionDto } from './create-lession.dto';

export class UpdateLessionDto extends PartialType(CreateLessionDto) {}
