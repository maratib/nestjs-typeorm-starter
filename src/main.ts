import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { ExcludeNullInterceptor } from './core/interceptors/exclude-null.interceptor';
import { readFileSync } from 'fs';
import { resolve } from 'path';

async function bootstrap() {
  // Using SSL
  // "const httpsOptions = {
  //   key: readFileSync(resolve(__dirname, '../cert/key.pem')),
  //   cert: readFileSync(resolve(__dirname, '../cert/certificate.pem')),
  // };"

  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
    logger: ['error', 'warn'],
  });

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );
  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(3000);

  // Using SSL
  // await app.listen(443);

  console.log(`Server started at port : ${PORT}`);
}
bootstrap();
