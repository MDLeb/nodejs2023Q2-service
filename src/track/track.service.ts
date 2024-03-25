import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from '../prisma/prisma.service';
import { Track } from './entities/track.entity';

@Injectable()
export class TrackService {
  constructor(private prismaDb: PrismaService) {}

  async create(createTrackDto: CreateTrackDto) {
    return await this.prismaDb.track.create({ data: createTrackDto as Track });
  }

  async findAll() {
    return await this.prismaDb.track.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.prismaDb.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return track;
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.prismaDb.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }

    return await this.prismaDb.track.update({
      where: { id: id },
      data: updateTrackDto,
    });
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const track = await this.prismaDb.track.findUnique({ where: { id: id } });
    if (!track) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return await this.prismaDb.track.delete({
      where: { id: id },
      include: { Favorites: true },
    });
  }
}
