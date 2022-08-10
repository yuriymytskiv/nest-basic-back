import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UsernameMiddleware } from './middleware/user.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Global Validating
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  // Port
  const port = process.env.PORT || 3000;
  // Starting App
  await app.listen(port, () =>
    console.log(`Server listening on Port: ${port}`),
  );
}
bootstrap();
