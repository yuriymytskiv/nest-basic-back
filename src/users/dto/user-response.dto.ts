import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class UserResponseDto {
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
  @Expose()
  id: any;

  @Expose()
  username: any;

  @Expose()
  firstName: any;

  @Expose()
  lastName: any;

  @Expose()
  isActive: any;

  @Expose()
  admin: any;

  @Expose()
  created_at: any;

  @Expose()
  updated_at: any;
}
