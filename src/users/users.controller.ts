import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserObj } from 'src/decorators/user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  // Create User
  // @UseGuards(ThrottlerGuard)
  // @Throttle(1, 120)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  async createUser(@Body() dto: CreateUserDto): Promise<User | any> {
    return await this.usersService.createUser(dto);
  }

  // Get User By Username
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getUser(@UserObj() userObj: any): Promise<User | any> {
    const { id } = userObj;
    return await this.usersService.getUser(id);
  }

  // Update User
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/')
  async updateUser(
    @UserObj() userObj: any,
    @Body() dto: UpdateUserDto,
  ): Promise<any> {
    const { id } = userObj;
    return await this.usersService.updateUser(id, dto);
  }
}
