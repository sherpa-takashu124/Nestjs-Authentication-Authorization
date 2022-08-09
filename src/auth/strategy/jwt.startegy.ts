import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.get('SECRET_KEY'),
    });
  }
  async validate(payload: any) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
    });
    const permission: string[] = await this.prisma.rolesAndPermission
      .findMany({
        where: {
          roleId: user.roleId,
        },
        select: {
          roleId: false,
          permission: {
            select: {
              permission: true,
            },
          },
        },
      })
      .then((perms) => perms.map((val) => Object.values(val.permission)[0]));
    delete user.password;
    delete user.createdAt;
    return { ...user, permission: permission };
  }
}
