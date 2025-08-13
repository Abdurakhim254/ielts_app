import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail({}, { message: 'Email noto‘g‘ri formatda' })
  @IsNotEmpty({ message: 'Email kiritilishi shart' })
  email: string;

  @IsNotEmpty({ message: 'Parol kiritilishi shart' })
  @MinLength(6, { message: 'Parol kamida 6 belgidan iborat bo‘lishi kerak' })
  password: string;
}
