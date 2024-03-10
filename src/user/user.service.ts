import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import dbManager from 'src/_db/dbManager';
import { IUserData } from 'src/_db/Users';
import { isUUID } from '../utils/isUUID';

@Injectable()
export class UserService {
  create(createUserDto: CreateUserDto) {
    let userData: IUserData = {
      login: createUserDto.login,
      password: createUserDto.password
    };
    return dbManager.addUser(userData);
  }

  findAll() {
    return dbManager.getAllUsers();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.userExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    return dbManager.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.userExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    if (!dbManager.checkPassword(id, updateUserDto.oldPassword)) {
      throw new HttpException('Unknown record', HttpStatus.FORBIDDEN)
    }
    let userData: Partial<IUserData> = {
      password: updateUserDto.oldPassword,
      newPassword: updateUserDto.newPassword
    };
    return dbManager.updateUser(id, userData);
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.userExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    return dbManager.deleteUser(id);
  }
}
