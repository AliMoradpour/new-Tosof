import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-jwt';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: (req: Request) => {
        // Option 1: Extract from cookies (recommended for refresh tokens)
        if (req?.cookies?.refreshToken) {
          return req.cookies.refreshToken;
        }
        
        // Option 2: Extract from body (if sent via POST request)
        if (req?.body?.refreshToken) {
          return req.body.refreshToken;
        }
        
        // Option 3: Extract from Authorization header with 'Refresh' prefix
        const authHeader = req?.headers?.authorization;
        if (authHeader && authHeader.startsWith('Refresh ')) {
          return authHeader.substring(8); // Remove 'Refresh ' prefix
        }
        
        return null;
      },
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_REFRESH_SECRET'),
      passReqToCallback: false,
    });
  }

  async validate(payload: any) {
    // Add additional validation if needed
    if (!payload.sub || !payload.email) {
      return false;
    }
    
    return { 
      userId: payload.sub, 
      email: payload.email,
    };
  }
}