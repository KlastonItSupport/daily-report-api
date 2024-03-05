import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import {
  ChangePasswordDto,
  CreateUserDto,
  ForgotPasswordDto,
  SignInDto,
} from './dtos/dtos';
import { AppError } from 'src/errors/app-error';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class UsersServices {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  async createUser(userData: CreateUserDto): Promise<any> {
    const hasUserWithThisEmail = await this.usersRepository.findOne({
      where: { email: userData.email },
    });
    if (hasUserWithThisEmail) {
      throw new AppError('An account with this email already exists', 409);
    }
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    delete userData.password;

    const user = await this.usersRepository.create({
      ...userData,
      passwordHash: hashedPassword,
    });

    await this.usersRepository.save(user);

    return user;
  }

  async signIn(signInData: SignInDto): Promise<any> {
    const user = await this.usersRepository.findOne({
      where: { email: signInData.email },
    });

    if (!user) {
      throw new AppError('An user with this email dont exist', 404);
    }
    const passwordMatchesHash = await bcrypt.compare(
      signInData.password,
      user.passwordHash,
    );

    if (!passwordMatchesHash) {
      throw new AppError('Password incorrect', 400);
    }

    this.usersRepository.save(user);

    return {
      accessToken: await this.jwtService.signAsync(
        {
          ...signInData,
          id: user.id,
        },
        {
          expiresIn: process.env.JWT_EXPIRES_SECRET_TOKEN,
          secret: process.env.JWT_SECRET_TOKEN,
        },
      ),
      id: user.id,
      email: user.email,
      name: user.name,
      permission: user.permission,
    };
  }

  async forgotPassword(data: ForgotPasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { email: data.email },
    });

    if (!user) {
      throw new AppError('An user with this email dont exist', 404);
    }
    const accessToken = this.jwtService.sign(
      {
        email: user.email,
        id: user.id,
      },
      { expiresIn: '900s', secret: process.env.JWT_SECRET_TOKEN },
    );

    const linkToSign = `${process.env.FRONT_LINK}/recover/password/${user.id}/${accessToken}`;
    const response = await this.mailerService.sendMail({
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Daily report - Recuperar senha',
      html: `<p> Olá ${user.name}, segue o link para troca de senha. Este link expira em 15 minutos</p>
      <br/>
      <a href=${linkToSign} >Clique aqui para trocar sua senha</a>
      `,
    });

    return response;
  }

  async changePassword(data: ChangePasswordDto) {
    const user = await this.usersRepository.findOne({
      where: { id: data.id },
    });

    if (!user) {
      throw new AppError('An user with this email dont exist', 404);
    }
    try {
      this.jwtService.verify(data.token, {
        secret: process.env.JWT_SECRET_TOKEN,
      });

      const hashedPassword = await bcrypt.hash(data.newPassword, 10);
      user.passwordHash = hashedPassword;
      await this.usersRepository.save(user);

      return { status: 200, message: 'Password changed successfully' };
    } catch (_) {
      throw new AppError('Token invalid or expired', 404);
    }
  }
}
