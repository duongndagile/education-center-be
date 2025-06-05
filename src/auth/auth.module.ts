/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Schemas } from 'libs/mongo';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/users/users.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: Schemas.UserSchema }]),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        console.log('JWT Config:', {
          secret: config.get<string>('JWT_SECRET'),
          expiresIn: config.get<string>('JWT_EXPIRES_IN'),
        });
        return {
          secret: config.get<string>('JWT_SECRET') || 'super_secret_key',
          signOptions: {
            expiresIn: config.get<string>('JWT_EXPIRES_IN') || '1d',
          },
        };
      },
    }),
  ],
  providers: [AuthService, UserService, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
