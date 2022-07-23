import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}
  // Signing Token
  async signToken(user: any) {
    const payload = {
      username: user.username,
      admin: user.admin,
      vip: user.vip,
      id: user.id,
    };
    return this.jwtService.sign(payload);
  }
  // Validating If User Exist
  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.getUser2(username);
    if (user && user.password) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        delete user.password;
        const token = await this.signToken(user);
        return { ...user, token: token, expires: 3600 };
      }
    }
    throw new BadRequestException('Wrong username or password');
  }
  // Password Reset
  async changePassword(id: number, oldPassword: string, newPassword: string) {
    // Grabbing User From Database
    const user = await this.usersService.getUser(id);
    // Checking If User Exist
    if (user && user.password) {
      const { password, ...rest } = user;
      // Hash Compare
      const isMatch = await bcrypt.compare(oldPassword, password);
      if (isMatch) {
        const hash = await bcrypt.hash(newPassword, 12);
        // Update Query
        const update = await this.usersRepository
          .createQueryBuilder()
          .update(User)
          .set({ password: hash })
          .where('id = :id', { id: user.id })
          .execute();
        if (update.affected == 1) {
          return 'Success';
        } else {
          throw new BadRequestException('Something went wrong');
        }
      } else {
        throw new BadRequestException('Incorrect password');
      }
    }
  }
}
