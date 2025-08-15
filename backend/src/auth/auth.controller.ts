import { 
  Controller, 
  Post, 
  UseGuards, 
  Request, 
  Body,
  UnauthorizedException 
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  @UseGuards(AuthGuard('jwt-refresh'))
  async refreshTokens(@Request() req) {
    // The user info will be available in req.user after the guard validates the token
    const { userId, email } = req.user;
    
    // Generate new tokens
    const tokens = await this.authService.generateTokens(userId, email);
    
    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
    };
  }

  // Your other auth endpoints here...
}