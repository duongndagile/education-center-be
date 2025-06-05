/* eslint-disable @typescript-eslint/require-await */
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { RoomModule } from './room/room.module';
import { ClassModule } from './class/class.module';
import { StudentModule } from './student/student.module';
import { LessionModule } from './lession/lession.module';
import { RolesGuard } from './common/guards/roles.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => {
        return {
          uri:
            config.get<string>(process.env.MONGODB_URL ?? '') ||
            'mongodb://root:example@localhost:27017/cms?authSource=admin',
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PostsModule,
    RoomModule,
    ClassModule,
    StudentModule,
    LessionModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard, // bắt buộc login
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard, // kiểm tra quyền
    },
  ],
})
export class AppModule {}
