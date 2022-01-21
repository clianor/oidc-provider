import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT || 3000;

  // Nest App
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  await app.listen(port);

  console.log(`🚀 server started on port ${port}`);
  console.log(`👉 http://localhost:${port} 👈`);
  console.log(`✅ check its http://localhost:${port}/oidc/.well-known/openid-configuration ✅`);
}
bootstrap();
