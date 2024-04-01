import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { favTypes } from './entities/favTypes';

@Controller('favs')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @Post('track/:id')
  addTrack(@Param('id') id: string) {
    return this.favoriteService.create(id, favTypes.Track);
  }

  @Post('album/:id')
  addAlbum(@Param('id') id: string) {
    return this.favoriteService.create(id, favTypes.Album);
  }

  @Post('artist/:id')
  addArtist(@Param('id') id: string) {
    return this.favoriteService.create(id, favTypes.Artist);
  }

  @Get()
  findAll() {
    return this.favoriteService.findAll();
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeAlbum(@Param('id') id: string) {
    return this.favoriteService.remove(id, favTypes.Album);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    return this.favoriteService.remove(id, favTypes.Artist);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeTrack(@Param('id') id: string) {
    return this.favoriteService.remove(id, favTypes.Track);
  }
}
