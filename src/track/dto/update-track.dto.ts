import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
    @IsNotEmpty()
    @IsOptional()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    artistId: string;

    @IsNotEmpty()
    @IsOptional()
    @IsString()
    albumId: string;

    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    duration: number;
}
