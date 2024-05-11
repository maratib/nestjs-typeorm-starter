import { dbConfigWithAutoLoad } from '@/config';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async () => ({
        ...dbConfigWithAutoLoad(),
      }),
    }),
  ],
})
export class OrmModule {}
