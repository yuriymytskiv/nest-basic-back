import { Body, Controller, Post } from '@nestjs/common';
import { UserObj } from 'src/decorators/user.decorator';
import { AuthService } from './auth.service';
import { ChangePasswordDto } from './dto/change-password.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Login
  @Post('/login')
  async login(@Body() dto: LoginDto) {
    const { username, password } = dto;
    return this.authService.validateUser(username, password);
  }
  // Change Password
  @Post('/password')
  async changePassword(
    @UserObj() userObj: any,
    @Body() dto: ChangePasswordDto,
  ) {
    const { id } = userObj;
    const { oldPassword, newPassword } = dto;
    if (newPassword.length < 8) {
      return 'Password must be longer than 8 characters';
    }
    if (newPassword.length > 16) {
      return 'Password must be shorter than 16 characters';
    }
    return await this.authService.changePassword(id, oldPassword, newPassword);
  }
}
