import { Module } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { ProfilesController } from './profiles.controller';
import { Profile } from './entity/profile.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entity/user.entity';
import { UsersService } from '../users.service';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  providers: [ProfilesService, UsersService],
  controllers: [ProfilesController],
  exports: [ProfilesService],
})
export class ProfilesModule {}
