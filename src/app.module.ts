import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';

import { AppService } from './app.service';
import { ServiceInfoModule } from './modules/service-info/service-info.module';
import Database from './database';
import { UsersModule } from './modules/users/users.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ErrorLogsModule } from './middlewares/error-logs/error-logs.module';
import { ErrorLoggingMiddleware } from './middlewares/error-logs/error-logs';

@Module({
  imports: [
    ConfigModule.forRoot(),
    Database.build(),
    ServiceInfoModule,
    UsersModule,
    MulterModule.register({
      storage: diskStorage({
        destination: '../uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, 'signature-' + uniqueSuffix + '.png');
        },
      }),
    }),
    ErrorLogsModule,
  ],
  controllers: [AppController],
  providers: [AppService, ErrorLoggingMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ErrorLoggingMiddleware).forRoutes('*');
  }
}
