import * as uuid from 'uuid';

interface IAlbum {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null; // refers to Album
}

export interface IAlbumData {
  name: string;
  year: number;
  artistId: string | null;
}

export class Album implements IAlbum {
  id: string;
  name: string;
  year: number;
  artistId: string | null;

  constructor(albumdata: IAlbumData) {
    this.id = uuid.v4();
    this.name = albumdata.name;
    this.year = albumdata.year;
    this.artistId = albumdata.artistId;
  }
  update(albumdata: Partial<IAlbumData>) {
    const { name, year, artistId } = albumdata;
    name && (this.name = name);
    year && (this.year = year);
    artistId && (this.artistId = artistId);
  }
}

class dbAlbums {
  #dbAlbums: Map<string, Album> = new Map();
  getAllTracks(): Album[] {
    return Array.from(this.#dbAlbums.values());
  }
  addAlbum(albumdata: IAlbumData): Album {
    const album: Album = new Album(albumdata);
    this.#dbAlbums.set(album.id, album);
    return album;
  }
  updateAlbumById(id: string, albumdata: Partial<IAlbumData>): Album | null {
    const albumDb = this.#dbAlbums.get(id);
    if (!albumDb) return null;
    albumDb.update(albumdata);
    this.#dbAlbums.set(id, albumDb);
    return albumDb;
  }
  deleteAlbumById(id: string): dbAlbums {
    this.#dbAlbums.delete(id);
    return this;
  }
  getAlbumById(id: string): Album | null {
    return this.#dbAlbums.get(id) ?? null;
  }
  deleteArtistRelations(artistId: string) {
    Array.from(this.#dbAlbums.values())
      .filter((i) => i.artistId === artistId)
      .forEach((j) => {
        j.artistId = null;
      });
  }
}

export default new dbAlbums();
