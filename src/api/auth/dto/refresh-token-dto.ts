import { IsOptional, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsOptional()
  @IsString({ message: 'Refresh token matn formatida bo‘lishi kerak' })
  refreshToken?: string;

  @IsOptional()
  @IsString({ message: 'Access token matn formatida bo‘lishi kerak' })
  accessToken?: string;
}
