import { Body, Controller, Post } from '@nestjs/common';
import { UsersServices } from './users.services';
import { CreateUserDto } from './dtos/create-user-request';
import { User } from './entities/user.entity';
import {
  SignInDto,
  SignInResponse,
  ForgotPasswordDto,
  ChangePasswordDto,
} from './dtos/dtos';

@Controller('users')
export class UsersController {
  constructor(private readonly usersServices: UsersServices) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return await this.usersServices.createUser(data);
  }

  @Post('/signIn')
  async signIn(@Body() data: SignInDto): Promise<SignInResponse> {
    return await this.usersServices.signIn(data);
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() data: ForgotPasswordDto) {
    return this.usersServices.forgotPassword(data);
  }

  @Post('/change/password')
  async changePassword(@Body() data: ChangePasswordDto) {
    return this.usersServices.changePassword(data);
  }
}
