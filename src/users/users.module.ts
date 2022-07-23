import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    ProfilesModule,
  ],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
