import { IsBoolean, IsEmail, IsString } from 'class-validator';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Profile } from '../profiles/entity/profile.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column()
  firstName: string;

  @IsString()
  @Column()
  lastName: string;

  @IsEmail()
  @Column()
  username: string;

  @IsString()
  @Column()
  password: string;

  @IsBoolean()
  @Column({ default: true })
  isActive: boolean;

  @IsBoolean()
  @Column({ default: false })
  vip: boolean;

  @IsBoolean()
  @Column({ default: false })
  admin: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => Profile, (profile) => profile.user)
  profile: Profile;
}
