import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParsedUser, User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

const saltRounds = +process.env.CRYPT_SALT;
@Injectable()
export class UserService {
  constructor(private prismaDb: PrismaService) {}

  private _parseUser(user: any) {
    return new ParsedUser(user);
  }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(
      createUserDto.password,
      saltRounds,
    );
    const user = await this.prismaDb.user.create({
      data: createUserDto as User,
    });
    return this._parseUser(user);
  }

  async findAll() {
    const users = await this.prismaDb.user.findMany();
    return users.map((user) => this._parseUser(user));
  }

  async findOne(id: string) {
    // throw new Error('TEST UNEXPECTED ERROR');
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return this._parseUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    const checkPassword = await bcrypt.compare(
      updateUserDto.oldPassword,
      user.password,
    );
    if (!checkPassword) {
      throw new HttpException('Unknown record', HttpStatus.FORBIDDEN);
    }

    const newUser = await this.prismaDb.user.update({
      where: { id: id },
      data: {
        password: await bcrypt.hash(updateUserDto.newPassword, saltRounds),
        version: { increment: 1 },
      },
    });

    return this._parseUser(newUser);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({ where: { id: id } });
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return await this.prismaDb.user.delete({ where: { id: id } });
  }

  async getByLogin(login: string) {
    const user = await this.prismaDb.user.findFirst({
      where: { login: login },
    });
    if (!user) {
      throw new HttpException('Unknown user', HttpStatus.NOT_FOUND);
    }
    return user;
  }
}
