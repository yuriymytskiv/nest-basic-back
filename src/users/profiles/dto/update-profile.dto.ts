import { IsOptional, IsString } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  profileImg: string;

  @IsString()
  @IsOptional()
  country: string;

  @IsString()
  @IsOptional()
  state: string;

  @IsString()
  @IsOptional()
  address: string;

  @IsString()
  @IsOptional()
  phone: string;

  @IsString()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  sex: string;
}
