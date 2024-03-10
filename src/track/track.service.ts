import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { ITrackData } from 'src/_db/Tracks';
import dbManager from 'src/_db/dbManager';
import { isUUID } from '../utils/isUUID';

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
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.trackExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    return dbManager.getTrackById(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.trackExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    let trackData: ITrackData = {
      name: updateTrackDto.name ?? null,
      artistId: updateTrackDto.artistId ?? null,
      albumId: updateTrackDto.albumId ?? null,
      duration: updateTrackDto.duration ?? null,
    };
    return dbManager.updateTrack(id, trackData)
  }

  remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST)
    }
    if (!dbManager.trackExists(id)) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND)
    }
    return dbManager.deleteTrack(id);
  }
}
