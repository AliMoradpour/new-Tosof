// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    // For Access Token
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'your-access-secret-key',
      signOptions: { expiresIn: '15m' },
    }),
    // For Refresh Token
    JwtModule.register({
      secret: process.env.JWT_REFRESH_SECRET || 'your-refresh-secret-key',
      signOptions: { expiresIn: '7d' }, // 7 days expiration
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}