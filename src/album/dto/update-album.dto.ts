import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  year: number;

  @IsString()
  @IsOptional()
  artistId: string | null;
}
