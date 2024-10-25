import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import {
  INVALID_CREDENTIALS,
  UNKNOWN_ERROR,
  USER_EMAIL_ALREADY_EXISTS,
} from 'src/constants';

@Injectable()
export class AuthService {
  constructor(private readonly prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    // Generate password hash
    const hash = await argon.hash(dto.password);

    try {
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
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(USER_EMAIL_ALREADY_EXISTS);
        } else {
          throw new ForbiddenException(UNKNOWN_ERROR);
        }
      }
      throw new Error(UNKNOWN_ERROR + ' while creating user');
    }
  }

  async signin(dto: AuthDto) {
    // find user by email
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });

    // if user not exist, throw error
    if (!user) {
      throw new ForbiddenException(INVALID_CREDENTIALS);
    }

    // compare password hash
    const isMatch = await argon.verify(user.hash, dto.password);
    if (!isMatch) {
      throw new ForbiddenException(INVALID_CREDENTIALS);
    }

    // return user info
    // TODO: Change this logic
    delete user.hash;
    return user;
  }
}
