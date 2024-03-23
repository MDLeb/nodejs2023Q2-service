import { Artist, Album, Track } from "@prisma/client";

export class Favorite {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];  
}
