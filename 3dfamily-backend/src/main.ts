import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();

  // Отдаём статические файлы из public
  app.useStaticAssets(join(__dirname, '..', 'public'));

  // ←←←←← SPA fallback: все запросы → index.html
  app.use((req, res, next) => {
    if (req.path.includes('.') || req.path.startsWith('/api') || req.path.startsWith('/projects') || req.path.startsWith('/contact')) {
      next();
    } else {
      res.sendFile(join(__dirname, '..', 'public', 'index.html'));
    }
  });

  await app.listen(process.env.PORT || 3000);
  console.log(`Сервер запущен на порту ${process.env.PORT || 3000}`);
}
bootstrap();