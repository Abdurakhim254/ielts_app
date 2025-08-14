import { Controller, Get, Post, Body, Patch, Param, Delete, RawBody } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { Public } from 'src/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  authRegister(@Body() requestBody: CreateAuthDto) {
    return this.authService.authRegister(requestBody);
  }

  @Public()
  @Post('login')
  authLogin(@Body() loginauthdto:LoginAuthDto){
    return this.authService.authLogin(loginauthdto);
  }

  @Public()
  @Post('refresh')
  authRefresh(@Body()refreshtokendto:RefreshTokenDto){
    return this.authService.authRefresh(refreshtokendto);
  }

  @Public()
  @Post('decode')
  authdecode(@Body()refreshtokendto:RefreshTokenDto){
    return this.authService.authdecode(refreshtokendto);
  }
  
}
