// src/auth/roles.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PrismaClient, Role } from '@prisma/client'; 

@Injectable()
export class RolesGuard implements CanActivate {
  private prisma: PrismaClient;

  constructor(private reflector: Reflector) {
    this.prisma = new PrismaClient();
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // اطمینان از اینکه نقش کاربر از enum Role است
    const userRole = this.prisma.user.findUnique({where: { id: user.userId }}).then(u => u.role);

    return requiredRoles.includes(userRole as Role);
  }
}