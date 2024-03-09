import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import dbManager from 'src/_db/dbManager';
import { IUserData } from 'src/_db/Users';

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
    return dbManager.getUserById(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    let userData: Partial<IUserData> = {
      password: updateUserDto.oldPassword,
      newPassword: updateUserDto.newPassword
    };
    return dbManager.updateUser(id, userData);
  }

  remove(id: string) {
    return dbManager.deleteUser(id);
  }
}
