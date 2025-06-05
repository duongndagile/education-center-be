import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { UserRole } from 'src/common/enums/role.enum';

export class RegisterDto {
  @ApiProperty({ type: String, description: 'Email of the user' })
  @IsString()
  email: string;

  @ApiProperty({ type: String, description: 'Password of the user' })
  password: string;

  @ApiProperty({
    type: String,
    enum: UserRole,
    description: 'Role of the user',
    default: UserRole.GUEST,
  })
  role: UserRole;
}
