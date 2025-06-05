import { IsEnum, IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/role.enum';

export class CreateUserDto {
  @IsString()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role: UserRole;
}
