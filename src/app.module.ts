import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { ServiceInfoModule } from './modules/service-info/service-info.module';
import Database from './database';
import { UsersModule } from './modules/users/users.module';
import { ProfessionalModule } from './modules/professionals/professional.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Database.build(),
    ServiceInfoModule,
    UsersModule,
    ProfessionalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
