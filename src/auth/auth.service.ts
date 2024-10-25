import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // Generate password hash
    const hash = await argon.hash(dto.password);

    // Save user
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash: hash,
      },
      // TODO: Change this logic
      select: {
        id: true,
        email: true,
      },
    });

    // Return saved user
    return user;
  }

  signin() {
    return { msg: 'User signed in successfully' };
  }
}
