import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import dbManager from 'src/_db/dbManager';
import { IArtistData } from 'src/_db/Artists';

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
    return dbManager.getArtistById(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    let artistData: IArtistData = {
      name: updateArtistDto.name ?? null,
      grammy: updateArtistDto.grammy ?? null,
    };
    return dbManager.updateArtist(id, artistData);
  }

  remove(id: string) {
    return dbManager.deleteArtist(id);
  }
}
