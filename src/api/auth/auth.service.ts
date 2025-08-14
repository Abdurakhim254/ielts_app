import { BadRequestException, ConflictException, Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth-dto';
import { RefreshTokenDto } from './dto/refresh-token-dto';
import { Users, UsersRepository } from 'src/core';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptService } from 'src/infrastructure';
import { TokenService } from 'src/common';

@Injectable()
export class AuthService {

  constructor(
    @InjectRepository(Users) private questionRepository:UsersRepository,
    private readonly hashService: BcryptService,
    private readonly tokenservice:TokenService
  ){}

  async authRegister(createAuthDto: CreateAuthDto) {

    const oldUser=await this.questionRepository.findOne({where:{email:createAuthDto.email}})
    if(oldUser){
      throw new ConflictException('User already exists');
    }

    const hashed_password=await this.hashService.encrypt(createAuthDto.password);

    const user=this.questionRepository.create({...createAuthDto,password:hashed_password});
    await this.questionRepository.save(user);

    return {
      message:'User Created Successfully',
      user
    }
   
  }

  async authLogin(loginauthdto:LoginAuthDto) {
    const user=await this.questionRepository.findOne({where:{email:loginauthdto.email}});
    
    if(!user){
      throw new BadRequestException('Username or password invalid');
    }

    const isPasswordValid=await this.hashService.compare(loginauthdto.password,user.password);

    if(!isPasswordValid){
      throw new BadRequestException('Username or password invalid');
    }
    const payload={
      email:user.email,
      role:user.role
    }
    const accessToken=this.tokenservice.createAccessToken(payload);
    const refreshToken= this.tokenservice.createRefreshToken(payload);
    return {
      message:"Login Successfully",
      accessToken,
      refreshToken
    };
  }

  async authRefresh(refreshtokendto:RefreshTokenDto) {
    const {email,role}=await this.tokenservice.verifyRefreshToken(refreshtokendto.refreshToken);
  
    const payload={
      email,
      role
    }
    
    const accessToken=this.tokenservice.createAccessToken(payload);
    const refreshToken= this.tokenservice.createRefreshToken(payload);

    return {
      accessToken,
      refreshToken
    };
  }

  async authdecode(refreshtokendto:RefreshTokenDto) {
    const {email,role}=await this.tokenservice.verifyAccessToken(refreshtokendto.accessToken);
  
    const payload={
      email,
      role
    }
    return payload;
  }
  
}
