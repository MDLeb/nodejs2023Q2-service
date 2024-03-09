import * as uuid from 'uuid'

interface IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;
}

export interface IArtistData {
    name: string;
    grammy: boolean;
}

export class Artist implements IArtist {
    id: string; // uuid v4
    name: string;
    grammy: boolean;

    constructor(artistdata: IArtistData) {
        this.id = uuid.v4();
        this.name = artistdata.name;
        this.grammy = artistdata.grammy;
    }
    update(artistdata: Partial<IArtistData>) {
        const {name, grammy} = artistdata;
        name && (this.name = name);
        grammy && (this.grammy = grammy)
    }
}

class dbArtists {
    #dbArtists: Map<string, Artist> = new Map();

    getAllArtists(): Artist[] {
        return Array.from(this.#dbArtists.values());
    }
    addArtist(artistdata: IArtistData): Artist {
        const artist: Artist = new Artist(artistdata);
        this.#dbArtists.set(artist.id, artist);
        return artist;
    }
    deleteArtistById(id: string): dbArtists {
        this.#dbArtists.delete(id);
        return this;
    }
    getArtistById(id: string): Artist | null {
        return this.#dbArtists.get(id) ?? null;
    }
    updateArtistById(id: string, artistdata: Partial<IArtistData>): Artist | null {
        const artistDb = this.#dbArtists.get(id);
        if(!artistDb) return null;
        artistDb.update(artistdata);
        this.#dbArtists.set(id, artistDb);//??
        return artistDb;
    }
}


export default new dbArtists()