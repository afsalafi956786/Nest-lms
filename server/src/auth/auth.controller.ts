import {
  Body,
  Controller,
  Post,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/registerUser.dto';
import { AuthGuard } from './auth.guard';
import { UserService } from 'src/user/user.service';
import type { AuthedRequest } from 'src/common.types';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterDto): Promise<{
    token: string;
    success: boolean;
    message: string;
    statusCode: number;
  }> {
    return await this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  async login(@Body() registerUserDto: RegisterDto) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async getProfile(@Request() req: AuthedRequest) {
    const userId = req.user.userId;

    const user = await this.userService.getUserById(userId);
    console.log(user, 'user');
    return user;
  }
}
