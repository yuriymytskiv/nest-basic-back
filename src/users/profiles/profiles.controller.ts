import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { UserObj } from 'src/decorators/user.decorator';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entity/profile.entity';
import { ProfilesService } from './profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profilesService: ProfilesService) {}
  // Create Profile
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/')
  async createProfile(
    @UserObj() userObj: any,
    @Body() dto: CreateProfileDto,
  ): Promise<any> {
    const { id } = userObj;
    return await this.profilesService.createProfile(id, dto);
  }
  // Update Profile
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put('/')
  async updateProfile(@UserObj() userObj: any, @Body() dto: UpdateProfileDto) {
    const { id } = userObj;
    return await this.profilesService.updateProfile(id, dto);
  }
  // Get Profile
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/')
  async getProfile(@UserObj() userObj: any): Promise<Profile | any> {
    const { id } = userObj;
    return this.profilesService.getProfile(id);
  }
}
