import { IsString, IsEmail, MinLength, MaxLength, IsEnum, IsOptional } from 'class-validator';
import { UserRoles } from 'src/common';

export class CreateAuthDto {
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(32)
  password: string;

  @IsEnum(UserRoles)
  @IsOptional()
  role:UserRoles
}
