import { NestFactory } from '@nestjs/core';
import * as bcrypt from 'bcrypt';
import { AppModule } from 'src/app.module';
import { UserRole } from 'src/common/enums/role.enum';
import { UserService } from 'src/users/users.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);

  const userService = app.get(UserService);

  const existing = await userService.findByEmail('admin@example.com');
  if (existing) {
    console.log('Admin account already exists.');
    await app.close();
    return;
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await userService.create({
    email: 'admin@example.com',
    password: hashedPassword,
    role: UserRole.ADMIN,
  });

  console.log('✅ Admin account created!');
  await app.close();
}
bootstrap();
