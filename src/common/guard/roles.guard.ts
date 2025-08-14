import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
  } from '@nestjs/common';
import { UserRoles } from '../enum';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const req = context.switchToHttp().getRequest();
      console.log(req.user);
      if (!req.user?.role && ( req.user?.role !== UserRoles.ADMIN || req.user?.role==UserRoles.USER)) {
        throw new ForbiddenException('Forbidden user');
      } else {
        return true;
      }
    }
  }
  