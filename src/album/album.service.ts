import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from '../prisma/prisma.service';
import { Album } from './entities/album.entity';

@Injectable()
export class AlbumService {
  constructor(private prismaDb: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    return await this.prismaDb.album.create({ data: createAlbumDto as Album });
  }

  async findAll() {
    return await this.prismaDb.album.findMany();
  }

  async findOne(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.prismaDb.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return album;
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.prismaDb.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }
    return await this.prismaDb.album.update({
      where: { id },
      data: updateAlbumDto,
    });
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }
    const album = await this.prismaDb.album.findUnique({
      where: { id: id },
    });
    if (!album) {
      throw new HttpException('Unknown record', HttpStatus.NOT_FOUND);
    }

    await this.prismaDb.album.delete({
      where: { id },
      include: { Favorites: true },
    });
  }
}
