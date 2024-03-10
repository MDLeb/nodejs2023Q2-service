import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import dbManager from 'src/_db/dbManager';
import { IAlbumData } from 'src/_db/Albums';

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
    return dbManager.getAlbumById(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    let albumData: IAlbumData = {
      name: updateAlbumDto.name ?? null,
      artistId: updateAlbumDto.artistId ?? null,
      year: updateAlbumDto.year ?? null,
    };
    return dbManager.updateAlbum(id, albumData);
  }

  remove(id: string) {
    return dbManager.deleteAlbum(id);
  }
}
