/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Schemas } from 'libs/mongo';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log('Validating user:', user);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(dto: LoginDto) {
    console.log('Login attempt with:', dto);
    const user: Schemas.User = await this.validateUser(dto.email, dto.password);
    if (!user) throw new Error('Unauthorized');
    console.log('User found:', user);
    const payload = { email: user.email, role: user.role };
    console.log('Login successful, payload:', payload);
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: RegisterDto) {
    const hashed = await bcrypt.hash(userData?.password, 10);
    return this.userService.create({ ...userData, password: hashed });
  }
}
