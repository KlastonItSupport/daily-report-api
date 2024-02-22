import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceInfoEntity } from './entities/service_info.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ServiceInfoController } from './service-info.controller';
import { ServiceInfoService } from './service-info.service';
import { PDFService } from './pdfs.service';
import { ReportEntity } from './entities/report.entity';
import { FileService } from './files.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ServiceInfoEntity, ReportEntity, User]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
        ignoreTLS: true,
      },
      defaults: {
        from: '"',
      },
    }),
  ],
  controllers: [ServiceInfoController],
  providers: [ServiceInfoService, PDFService, FileService],
})
export class ServiceInfoModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req, res, next) => {
        console.log('User-Agent:', req.headers['user-agent']);
        console.log('IP Address:', req.ip);
        next();
      })
      .forRoutes('sign'); // Especificando a rota '/sign'
  }
}
