import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entity/user.entity';
import { UsersService } from '../users.service';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Profile } from './entity/profile.entity';

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profilesRepository: Repository<Profile>,
    private usersService: UsersService,
  ) {}

  // Create Profile
  async createProfile(id: number, dto: UpdateProfileDto): Promise<any> {
    const user = await this.usersService.getUser(id);
    const newProfile = this.profilesRepository.create(dto);
    newProfile.user = user;
    const result = await this.profilesRepository.save(newProfile);
    if (result) {
      return 'Profile Created Successfully';
    } else {
      throw new BadRequestException('Something Went Wrong');
    }
  }
  // Update Profile
  async updateProfile(id: number, dto: UpdateProfileDto): Promise<any> {
    const profile = await this.getProfile(id);
    const profileId = profile.id;
    const result = await this.profilesRepository.update(profileId, dto);
    if (result.affected == 1) {
      return 'Profile Updated Successfully';
    } else {
      throw new BadRequestException('Something Went Wrong');
    }
  }
  // Get Profile
  async getProfile(id: number): Promise<Profile | any> {
    const profile = await this.profilesRepository.findOne({
      where: { userId: id },
    });
    if (profile) {
      return profile;
    } else {
      throw new BadRequestException('No Profile Exist');
    }
  }
}
