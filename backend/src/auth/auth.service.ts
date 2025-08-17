// src/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  BadRequestException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { RegisterDto } from './dto/register-dto';
import { LoginDto } from './dto/login-dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new BadRequestException('User with this email already exists.');
    }
    const user = await this.usersService.create(registerDto);
    return { message: 'User registered successfully!' };
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const isPasswordMatching = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isPasswordMatching) {
      throw new UnauthorizedException('Invalid credentials.');
    }

    const tokens = this.generateTokens(user.id, user.email);
    await this.usersService.update(user.id, {
      refreshToken: tokens.refreshToken,
    });

    return tokens;
  }

  generateTokens(userId: string, email: string) {
    const payload = { sub: userId, email: email };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET,
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    };
  }

  async refreshTokens(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);
    if (!user || user.refreshToken !== refreshToken) {
      throw new UnauthorizedException('Access Denied');
    }

    const tokens = this.generateTokens(user.id, user.email);
    await this.usersService.update(user.id, {
      refreshToken: tokens.refreshToken,
    });
    return tokens;
  }
}