import { Module } from '@nestjs/common';
import { OrmModule } from './orm/orm.module';
import { UsersModule } from './users/users.module';
// import typeorm from './config';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Module({
  imports: [OrmModule, UsersModule, AuthModule],
})
export class AppModule {}
