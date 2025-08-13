import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'src/config';
import { TokenService } from './jwt.service';
import { AuthGuard } from './auth.guard';

@Module({  
    imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: config.JWT_ACCESS_SECRET,
        signOptions: {
          expiresIn: config.JWT_ACCESS_TIME,
        },
      }),
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory: () => ({
        secret: config.JWT_REFRESH_SECRET,
        signOptions: {
          expiresIn: config.JWT_REFRESH_TIME,
        },
      }),
    }),
  ],
  providers: [AuthGuard, TokenService],
  exports: [AuthGuard, TokenService],
})

export class GuardModule {}
