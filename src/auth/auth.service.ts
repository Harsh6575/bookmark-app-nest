import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  signup() {
    return { msg: 'User signed up successfully' };
  }

  signin() {
    return { msg: 'User signed in successfully' };
  }
}
