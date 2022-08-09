import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}
  async login(authDto: AuthDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: authDto.email,
      },
    });
    if (!user) throw new ForbiddenException('Wrong username and password');
    const validpassword = await argon.verify(user.password, authDto.password);
    if (validpassword) {
      return this.signToken(user.id, user.email);
    } else {
      throw new ForbiddenException('Wrong username and password');
    }
  }

  async signToken(userId: string, email: string) {
    const payload = {
      sub: userId,
      email,
    };
    const secretKey = this.config.get('SECRET_KEY');
    const token = await this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: secretKey,
    });
    return { access_token: token };
  }
}
