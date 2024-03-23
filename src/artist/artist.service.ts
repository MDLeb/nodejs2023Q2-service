import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from '../prisma/prisma.service'
import { Artist } from './entities/artist.entity';

@Injectable()
export class ArtistService {

  constructor(private prismaDb: PrismaService) { }

  async create(createArtistDto: CreateArtistDto) {
    return await this.prismaDb.artist.create({ data: createArtistDto as Artist});
  }

  async findAll() {
    return await this.prismaDb.artist.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prismaDb.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return artist;
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prismaDb.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return await this.prismaDb.artist.update({ where: { id: id }, data: updateArtistDto });
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const artist = await this.prismaDb.artist.findUnique({ where: { id: id } });
    if (!artist) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    await this.prismaDb.artist.delete({ where: { id: id } });
  }
}
