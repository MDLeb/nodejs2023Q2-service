import { Artist, Album, Track } from "@prisma/client";

export class Favorite {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];
}

export class ParsedFavorite {
    artists: Artist[];
    albums: Album[];
    tracks: Track[];

    constructor(favs: {
        id: string,
        artists: Artist[] | null,
        albums: Album[] | null,
        tracks: Track[] | null,
    }) {
        this.artists = favs.artists ?? [];
        this.albums = favs.albums ?? [];
        this.tracks = favs.tracks ?? [];
    }
}



