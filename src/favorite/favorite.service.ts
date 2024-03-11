import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import dbManager from 'src/_db/dbManager';
import { favTypes } from 'src/_db/Favorites';
import { isUUID } from '../utils/isUUID';

@Injectable()
export class FavoriteService {
  create(id: string, type: favTypes) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    if (!dbManager.isItemUniq(id)) {
      return 'Record is already in favorites';
    }
    switch (type as any) {
      case 0: //Album
        if (!dbManager.albumExists(id)) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      case 1: //Artist
        if (!dbManager.artistExists(id)) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      case 2: //Track
        if (!dbManager.trackExists(id)) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        break;
      default:
        break;
    }
    dbManager.addFav(id, type);
    return 'Record succefully added to the favorites';
  }

  findAll() {
    return dbManager.getAllFavs();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const item = dbManager.getFavById(id);
    if (item === null) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return item;
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const result = dbManager.deleteFavoriteById(id);

    if (!result) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return;
  }
}
