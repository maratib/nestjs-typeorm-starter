import { config as dotenvConfig } from 'dotenv';
import { plainToClass } from 'class-transformer';
import { IsNumber, IsString, validateSync } from 'class-validator';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { ConfigModule, registerAs } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

dotenvConfig({ path: '.env' });

class EnvironmentVariables {
  @IsNumber()
  PORT: number;

  @IsString()
  DB_HOST: string;

  @IsNumber()
  DB_PORT: number;

  @IsString()
  DB_USERNAME: string;

  @IsString()
  DB_PASSWORD: string;

  @IsString()
  DB_NAME: string;

  @IsString()
  JWT_ACCESS_TOKEN_SECRET: string;

  @IsNumber()
  JWT_ACCESS_TOKEN_EXPIRATION_TIME: number;

  @IsString()
  JWT_REFRESH_TOKEN_SECRET: string;

  @IsNumber()
  JWT_REFRESH_TOKEN_EXPIRATION_TIME: number;
}

export function validateEnvironment(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

/******* TypeORM Setup */
export const dbConfig: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: `${process.env.DB_HOST}`,
  port: Number(process.env.DB_PORT),
  username: `${process.env.DB_USERNAME}`,
  password: `${process.env.DB_PASSWORD}`,
  database: `${process.env.DB_NAME}`,

  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],

  seeds: ['dist/orm/seeds/**/*.seeder.js'],
  // factories: ['dist/db/factories/**/*.js'],

  // autoLoadEntities: true,
  synchronize: false,
};
export const dbConfigWithAutoLoad = () => {
  return { ...dbConfig, autoLoadEntities: true };
};

// export const TypeOrmConfigModule = ConfigModule.forRoot({
//   validate: validateEnvironment,
//   cache: true,
//   isGlobal: true,
//   load: [registerAs('typeorm', dbConfigWithAutoLoad)],
// });

// export const TypeOrmTestingModule = (entities: any[]) =>
//   TypeOrmModule.forRoot({ ...dbConfig, entities: [...entities] });

export const connectionSource = new DataSource(dbConfig as DataSourceOptions);

export const getLogLevels = (): any[] => {
  return process.env.LOG_LEVELS!.split(',');
};
