import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import {Role} from '../enums/role.enum'
import {ROLES_KEY} from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector: Reflector) {
    console.log('estoy roles guard constructor')
  }

  canActivate(context: ExecutionContext): boolean {
    console.log('estoy roles guard')
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    console.log('user', user)
    console.log('requiredRoles', requiredRoles)
    return requiredRoles.some((role) => user.roles?.includes(role));
  }
}
