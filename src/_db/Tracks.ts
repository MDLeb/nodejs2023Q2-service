import * as uuid from 'uuid';

interface ITrack {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
}

export interface ITrackData {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}

export class Track implements ITrack {
  id: string;
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;

  constructor(trackdata: ITrackData) {
    this.id = uuid.v4();
    this.name = trackdata.name;
    this.artistId = trackdata.artistId;
    this.albumId = trackdata.albumId;
    this.duration = trackdata.duration;
  }
  update(trackdata: Partial<ITrackData>) {
    const { name, artistId, albumId, duration } = trackdata;
    name && (this.name = name);
    artistId && (this.artistId = artistId);
    albumId && (this.albumId = albumId);
    duration && (this.duration = duration);
  }
}

class dbTracks {
  #dbTracks: Map<string, Track> = new Map();

  getAllTracks(): Track[] {
    return Array.from(this.#dbTracks.values());
  }
  addTrack(trackdata: ITrackData): Track {
    const track: Track = new Track(trackdata);
    this.#dbTracks.set(track.id, track);
    return track;
  }
  updateTrackById(id: string, trackdata: Partial<ITrack>): Track | null {
    const trackDb = this.#dbTracks.get(id);
    if (!trackDb) return null;
    trackDb.update(trackdata);
    this.#dbTracks.set(id, trackDb); //??
    return trackDb;
  }
  deleteTrackById(id: string): dbTracks {
    this.#dbTracks.delete(id);
    return this;
  }
  getTrackById(id: string): Track | null {
    return this.#dbTracks.get(id) ?? null;
  }
  getTracksByArtistId(id: string): Track[] {
    return Array.from(this.#dbTracks.values()).filter((i) => i.artistId === id);
  }
  getTracksByAlbumId(id: string): Track[] {
    return Array.from(this.#dbTracks.values()).filter((i) => i.albumId === id);
  }

  deleteArtistRelations(artistId: string) {
    Array.from(this.#dbTracks.values())
      .filter((i) => i.artistId === artistId)
      .forEach((j) => {
        j.artistId = null;
      });
  }

  deleteAlbumRelations(albumId: string) {
    Array.from(this.#dbTracks.values())
      .filter((i) => i.albumId === albumId)
      .forEach((j) => {
        j.albumId = null;
      });
  }
}

export default new dbTracks();
