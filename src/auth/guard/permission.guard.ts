import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import { IAuthModuleOptions } from '@nestjs/passport';
import { Observable } from 'rxjs';
import Permission from 'src/enum/permission.enum';
import { PrismaService } from 'src/prisma/prisma.service';
import { JWTAuthGuard } from './jwtAuth.guard';

const PermissionGuard = (permission: Permission): Type<CanActivate> => {
  class PermissionGuardMixin extends JWTAuthGuard {
    constructor(private prisma: PrismaService) {
      super();
    }
    async canActivate(context: ExecutionContext) {
      await super.canActivate(context);
      const request = context.switchToHttp().getRequest<any>();
      console.log(request.user);
      console.log('PermISSION GUARD', permission);
      const user = request.user;
      return user?.permission.includes(permission);
    }
  }
  return mixin(PermissionGuardMixin);
};
export default PermissionGuard;

//without extend jwt
// class PermissionGuardMixin implements CanActivate {
//     constructor(private prisma: PrismaService) {}
//     async canActivate(context: ExecutionContext) {
//       const request = context.switchToHttp().getRequest<any>();
//       console.log(request.user);
//       console.log('PermISSION GUARD', permission);
//       const user = request.user;

//       return user?.permission.includes(permission);
//     }
//   }
