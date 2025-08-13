import { IsNotEmpty, IsString } from 'class-validator';

export class RefreshTokenDto {
  @IsNotEmpty({ message: 'Refresh token kiritilishi shart' })
  @IsString({ message: 'Refresh token matn formatida bo‘lishi kerak' })
  refreshToken: string;
}
