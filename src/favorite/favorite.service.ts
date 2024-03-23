import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { favTypes } from 'src/_db/Favorites';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from '../prisma/prisma.service'
import { Favorite } from './entities/favorite.entity';
import { Album } from 'src/_db/Albums';

@Injectable()
export class FavoriteService {

  constructor(private prismaDb: PrismaService) { }

  async create(id: string, type: favTypes) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    if (!await this.prismaDb.favorites.findUnique({ where: { id: id } })) {
      return 'Record is already in favorites';
    }
    switch (type as any) {
      case 0: //Album
        const album = await this.prismaDb.favorites.findMany({
          select: {albums: true}, where: {id: id},
        });
        console.log(album);
        
        if (album) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      case 1: //Artist
      const artist = await this.prismaDb.favorites.findMany({
        select: {artists: true}, where: {id: id},
      });
      console.log(artist);
        if (artist) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      case 2: //Track
      const track = await this.prismaDb.favorites.findMany({
        select: {tracks: true}, where: {id: id},
      });
      console.log(artist);
        if (track) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      default:
        break;
    }
    // await this.prismaDb.favorites.({ data: {} });
    return 'Record succefully added to the favorites';
  }

  async findAll() {
    // return await this.prismaDb.favorites.findMany();
  }

  async findOne(id: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    // }
    // const item = await this.prismaDb.favorites.findUnique({ where: { id: id } });
    // if (item === null) {
    //   throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    // }
    // return item;
  }

  async remove(id: string) {
    // if (!isUUID(id)) {
    //   throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    // }
    // const result = await this.prismaDb.favorites.delete({ where: { id: id } });

    // if (!result) {
    //   throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    // }
    // return;
  }
}
