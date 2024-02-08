import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import Database from './database';

@Module({
  imports: [ConfigModule.forRoot(), Database.build()],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
