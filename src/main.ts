import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { SwaggerModule } from '@nestjs/swagger';
import { load } from 'js-yaml';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const PORT = process.env.PORT || 4000;
const SWAGGER_API_ENDPOINT = '/docs';
const SWAGGER_YAML_FILE = 'doc/api.yaml';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  const document = load(readFileSync(resolve(SWAGGER_YAML_FILE), 'utf8'));
  SwaggerModule.setup(SWAGGER_API_ENDPOINT, app, document);
  await app.listen(PORT);
}
bootstrap();
