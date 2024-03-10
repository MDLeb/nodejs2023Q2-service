import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import dbManager from 'src/_db/dbManager';
import { IArtistData } from 'src/_db/Artists';
import { isUUID } from '../utils/isUUID';

@Injectable()
export class ArtistService {
  create(createArtistDto: CreateArtistDto) {
    let artistData: IArtistData = {
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };
    return dbManager.addArtist(artistData);
  }

  findAll() {
    return dbManager.getAllArtists();
  }

  findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.artistExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    return dbManager.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.artistExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    let artistData: IArtistData = {
      name: updateArtistDto.name ?? null,
      grammy: updateArtistDto.grammy ?? null,
    };
    return dbManager.updateArtist(id, artistData);
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.artistExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    dbManager.deleteArtist(id);
    dbManager.deleteArtistRelation(id);
  }
}
