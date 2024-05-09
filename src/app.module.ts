import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmConfigModule } from './config';
import { DbModule } from './db/db.module';
import { UsersModule } from './users/users.module';
// import typeorm from './config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TypeOrmConfigModule, DbModule, UsersModule, AuthModule],
})
export class AppModule {}
