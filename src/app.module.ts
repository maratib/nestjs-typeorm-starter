import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './config';
import { OrmModule } from './orm/orm.module';
import { UsersModule } from './users/users.module';
// import typeorm from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [OrmModule, UsersModule, AuthModule],
})
export class AppModule {}
