import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn'],
  });

  app.setGlobalPrefix('/api/v1');
  const configService: ConfigService = app.get(ConfigService);
  const PORT = configService.get<number>('PORT');
  await app.listen(3000);
  console.log(`Server started at port : ${PORT}`);
}
bootstrap();
