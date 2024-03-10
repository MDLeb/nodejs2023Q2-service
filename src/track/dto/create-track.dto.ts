import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateTrackDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    artistId: string;

    @IsNotEmpty()
    @IsString()
    albumId: string;

    @IsNotEmpty()
    @IsNumber()
    duration: number;
}
