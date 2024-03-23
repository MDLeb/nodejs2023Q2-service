import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { ParsedUser, User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(private prismaDb: PrismaService) { }

  private _parseUser(user: any) {
    return new ParsedUser(user);
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.prismaDb.user.create({ data: createUserDto as User });;
    return this._parseUser(user);
  }

  async findAll() {
    let users = await this.prismaDb.user.findMany();
    return users.map(user => this._parseUser(user));
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({ where: { id: id } })
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return this._parseUser(user);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({ where: { id: id } })
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Unknown record', HttpStatus.FORBIDDEN);
    }

    const newUser = await this.prismaDb.user.update({
      where: { id: id },
      data: { password: updateUserDto.newPassword, version: { increment: 1 } }
    });

    return this._parseUser(newUser);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({ where: { id: id } })
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return await this.prismaDb.user.delete({ where: { id: id } });
  }
}
