import { getLogLevels } from './config/index';
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import {
  ClassSerializerInterceptor,
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { ExcludeNullInterceptor } from './core/interceptors/exclude-null.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'body-parser';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // httpsOptions,
    logger: getLogLevels(),
  });
  const configService: ConfigService = app.get(ConfigService);
  const logger = new Logger('main.ts');
  const PORT = configService.get<number>('PORT');

  // Add Body parser
  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  // Add helmet
  app.use(helmet());
  // Enable cors
  app.enableCors();

  app.setGlobalPrefix('/api/v1');
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new ExcludeNullInterceptor(),
    new ClassSerializerInterceptor(app.get(Reflector)),
  );

  const configApi = new DocumentBuilder()
    .setTitle('Demo Application')
    .setDescription('API Application')
    .setVersion('v1')
    // .addTag('Demo1')
    // .addBearerAuth()
    // .addSecurityRequirements('bearerAuth')

    // .addSecurity('ApiKeyAuth', {
    //   type: 'apiKey',
    //   in: 'header',
    //   name: 'Authorization',
    // })
    .build();
  const document = SwaggerModule.createDocument(app, configApi);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(PORT, () => {
    logger.debug(`Server started at port : ${PORT}`);
  });

  // Using SSL
  // await app.listen(443);
}
bootstrap();
