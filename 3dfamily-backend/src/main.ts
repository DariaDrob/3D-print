import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();


  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/',
    setHeaders: (res, path) => {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    },
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Сервер запущен на http://localhost:${process.env.PORT || 3000}`);
}
bootstrap();