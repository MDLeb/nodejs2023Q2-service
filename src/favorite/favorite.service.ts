import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { favTypes } from 'src/_db/Favorites';
import { isUUID } from '../utils/isUUID';
import { PrismaService } from '../prisma/prisma.service'
import { Favorite, ParsedFavorite } from './entities/favorite.entity';

@Injectable()
export class FavoriteService {

  private temp_id: string;

  constructor(private prismaDb: PrismaService) { }

  private _parseFavs(fav: any) {
    return new ParsedFavorite(fav)
  }

  private async _createRecord() {
    const record = await this.prismaDb.favorites.create({
      data: {}
    });
    this.temp_id = record.id;
  }

  async create(id: string, type: favTypes) {
    if (!isUUID(id)) {
      throw new HttpException('Wrong id', HttpStatus.BAD_REQUEST);
    }

    if (!this.temp_id) await this._createRecord();

    // if (!await this.prismaDb.favorites.findUnique({ where: { id: this.temp_id } })) {
    //   return 'Record is already in favorites';
    // }
    switch (type as any) {
      case 0: //Album
        const album = await this.prismaDb.album.findUnique({ where: { id: id } })
        if (!album) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        // const albumInFavs = await this.prismaDb.favorites.findUnique({
        //   where: {id: this.temp_id},
        //   // select: { albums: true },
        // });

        await this.prismaDb.favorites.update({
          where: { id: this.temp_id }, data: {
            albums: {
              set: album
            }
          }
        })
        break;
      case 1: //Artist
        const artist = await this.prismaDb.artist.findUnique({ where: { id: id } })
        if (!artist) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        await this.prismaDb.favorites.update({
          where: { id: this.temp_id }, data: {
            artists: {
              set: artist
            }
          }
        })
        break;
      case 2: //Track
        const track = await this.prismaDb.track.findUnique({ where: { id: id } })
        if (!track) {
          throw new HttpException(
            'Unknown record',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        }
        await this.prismaDb.favorites.update({
          where: { id: this.temp_id }, data: {
            tracks: {
              set: track
            }
          }
        })
        break;
      default:
        break;
    }
    // await this.prismaDb.favorites.({ data: {} });
    return 'Record succefully added to the favorites';
  }

  async findAll() {
    if (!this.temp_id) await this._createRecord();
    const fav = await this.prismaDb.favorites.findUnique({
      where: { id: this.temp_id }, include: {
        albums: true,
        artists: true,
        tracks: true
      }
    });
    return this._parseFavs(fav);
  }

  async remove(id: string, type: favTypes) {
    if (!this.temp_id) await this._createRecord();

    switch (type as any) {
      case 0: //Albums
        await this.prismaDb.favorites.update({
          where: { id: this.temp_id },
          data: {
            albums: {
              disconnect: { id: id }
            }
          }
        });
        break;
      case 1: //Artists
        await this.prismaDb.favorites.update({
          where: { id: this.temp_id },
          data: {
            artists: {
              disconnect: { id: id }
            }
          }
        });
        break;
      case 2: //Tracks
        await this.prismaDb.favorites.update({
          where: { id: this.temp_id },
          data: {
            tracks: {
              disconnect: { id: id }
            }
          }
        });
        break;
    }
  }
}
