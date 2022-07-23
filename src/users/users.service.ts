import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}
  // Create User
  async createUser(dto: CreateUserDto): Promise<User | any> {
    const exist = await this.getUser2(dto.username);
    if (!exist) {
      const { password, ...rest } = dto;
      const hash = await bcrypt.hash(password, 12);
      const user = { ...rest, password: hash };
      const newUser = this.usersRepository.create(user);
      const result = await this.usersRepository.save(newUser);
      return new UserResponseDto(result);
    } else {
      throw new BadRequestException('Username Already Exist');
    }
  }
  // Get User
  async getUser(id: number): Promise<User | any> {
    const result = await this.usersRepository.findOne({
      where: { id: id },
    });
    return new UserResponseDto(result);
  }
  // Get User By Email
  async getUser2(username: string): Promise<any> {
    const result = await this.usersRepository.findOne({
      where: { username: username },
    });
    if (result !== null || typeof result !== 'undefined') {
      return result;
    } else {
      return false;
    }
  }
  // Update User
  async updateUser(id: number, dto: UpdateUserDto) {
    const result = await this.usersRepository
      .createQueryBuilder()
      .update(User)
      .set({ firstName: dto.firstName, lastName: dto.lastName })
      .where('id = :id', { id: id })
      .execute();
    if (result.affected == 1) {
      return 'User Updated Successfully';
    } else {
      throw new BadRequestException('Something Went Wrong');
    }
  }
}
