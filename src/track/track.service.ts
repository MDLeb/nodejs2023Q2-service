import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackData } from 'src/_db/Tracks';
import dbManager from 'src/_db/dbManager';

@Injectable()
export class TrackService {
  create(createTrackDto: CreateTrackDto) {
    let trackData: ITrackData = {
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };
    return dbManager.addTrack(trackData);
  }

  findAll() {
    return dbManager.getAllTracks();
  }

  findOne(id: string) {
    return dbManager.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    let trackData: ITrackData = {
      name: updateTrackDto.name ?? null,
      artistId: updateTrackDto.artistId ?? null,
      albumId: updateTrackDto.albumId ?? null,
      duration: updateTrackDto.duration ?? null,
    };
    return dbManager.updateTrack(id, updateTrackDto)
  }

  remove(id: string) {
    return dbManager.deleteTrack(id);
  }
}
