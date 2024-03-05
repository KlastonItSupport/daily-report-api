import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { UsersServices } from './users.services';
import { UsersController } from './users.controller';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  controllers: [UsersController],
  providers: [UsersServices],
  imports: [
    TypeOrmModule.forFeature([User]),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.hostinger.com',
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
    JwtModule.register({
      global: true,
      secret: 'secret',
      signOptions: { expiresIn: '3600s' },
    }),
  ],
})
export class UsersModule {}
