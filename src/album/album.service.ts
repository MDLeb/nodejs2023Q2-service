import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import dbManager from 'src/_db/dbManager';
import { IAlbumData } from 'src/_db/Albums';
import { isUUID } from '../utils/isUUID';

@Injectable()
export class AlbumService {
  create(createAlbumDto: CreateAlbumDto) {
    let albumData: IAlbumData = {
      name: createAlbumDto.name,
      artistId: createAlbumDto.artistId,
      year: createAlbumDto.year,
    };
    return dbManager.addAlbum(albumData);
  }

  findAll() {
    return dbManager.getAllAlbums();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.albumExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    
    return dbManager.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.albumExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }

    let albumData: IAlbumData = {
      name: updateAlbumDto.name ?? null,
      artistId: updateAlbumDto.artistId ?? null,
      year: updateAlbumDto.year ?? null,
    };
    return dbManager.updateAlbum(id, albumData);
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.albumExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }

    dbManager.deleteAlbum(id);
    dbManager.deleteAlbumRelation(id);
  }
}
