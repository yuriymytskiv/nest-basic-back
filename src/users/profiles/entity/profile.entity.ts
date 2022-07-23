import { IsString } from 'class-validator';
import { User } from 'src/users/entity/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

@Entity('profile')
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @Column({ default: null })
  profileImg: string;

  @IsString()
  @Column({ default: null })
  country: string;

  @IsString()
  @Column({ default: null })
  state: string;

  @IsString()
  @Column({ default: null })
  address: string;

  @IsString()
  @Column({ default: null })
  phone: string;

  @IsString()
  @Column({ default: null })
  email: string;

  @IsString()
  @Column({ default: null })
  sex: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToOne(() => User, (user) => user.profile, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  user: User;

  @Column()
  userId: number;
}
