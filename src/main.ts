import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { dataSource } from './database';
import * as fs from 'fs';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  let httpsOptions = {};

  if (process.env.ENVIRONMENT === 'prod') {
    console.log('Using prod certs');
    httpsOptions = {
      key: fs.readFileSync(process.env.SELF_SIGNED_KEY_PATH),
      cert: fs.readFileSync(process.env.SELF_SIGNED_CRT_PATH),
    };
  } else {
    console.log('Using dev certs');
  }
  const app = await NestFactory.create(AppModule, { cors: true, httpsOptions });

  await dataSource.initialize();
  await dataSource.runMigrations();

  await app.listen(process.env.PORT);
}
bootstrap();
