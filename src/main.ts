import { fastifyCsrfProtection } from '@fastify/csrf-protection';
import { fastifyHelmet } from '@fastify/helmet';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.enableCors();
  await app.register(fastifyCsrfProtection);
  await app.register(fastifyHelmet);
  await app.listen(3000);
}
bootstrap();
