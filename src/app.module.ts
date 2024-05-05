import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateEnvironment as validate } from './config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
import typeorm from './config/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate,
      cache: true,
      isGlobal: true,
      load: [typeorm],
    }),
    DbModule,
    UsersModule,
    AuthModule,
  ],
})
export class AppModule {}
