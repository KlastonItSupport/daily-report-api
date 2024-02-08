import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceInfoEntity } from './entities/service_info.entity';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { ServiceInfoController } from './service-info.controller';
import { ServiceInfoService } from './service-info.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ServiceInfoEntity]),
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
  providers: [ServiceInfoService],
})
export class ServiceInfoModule {}
