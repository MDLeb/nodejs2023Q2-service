import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import dbManager from 'src/_db/dbManager';
import { IUserData } from 'src/_db/Users';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {

  constructor(private prismaDb: PrismaService) { }

  async create(createUserDto: CreateUserDto) {
    
    return await this.prismaDb.user.create({data: createUserDto as User});
  }

  async findAll() {
    return await this.prismaDb.user.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({where: {id: id}})
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({where: {id: id}})
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    if (user.password !== updateUserDto.oldPassword) {
      throw new HttpException('Unknown record', HttpStatus.FORBIDDEN);
    }
    const userData: Partial<IUserData> = {
      password: updateUserDto.oldPassword,
      newPassword: updateUserDto.newPassword,
    };
    return await this.prismaDb.user.update({where: {id: id}, data: updateUserDto});
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const user = await this.prismaDb.user.findUnique({where: {id: id}})
    if (!user) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return await this.prismaDb.user.delete({where: {id: id}});
  }
}
