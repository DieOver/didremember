import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { ERoles } from '../interfaces/user.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<ERoles[]>('roles', context.getHandler());
    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    const bearerToken = request?.headers?.authorization?.replace('Bearer ','');
    if (!bearerToken) return true;
    const user = this.jwtService.verify(bearerToken);
    return this.matchRoles(roles, user.roles);
  }

  matchRoles(bRoles: ERoles[], myRoles: ERoles[]): boolean {
    let canPass = false;
    for (const bRole of bRoles) {
      for (const myRole of myRoles) {
        if (bRole == myRole) {
          canPass = true;
          break;
        }
      }
    }
    return canPass;
  }
}
