import { Album } from './Albums';
import { Artist } from './Artists';
import { Track } from './Tracks';
import * as uuid from 'uuid';

export interface IFavorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
export interface IFavoritesId {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export const enum favTypes {
  'Album',
  'Artist',
  'Track',
}
interface IFavorite {
  userId: string;
  itemType: favTypes;
  itemId: string;
}

class dbFavorites {
  #dbFavorites: Map<string, IFavorite> = new Map();

  addItem(userId: string, itemId: string, itemType: favTypes): void {
    const recordId = uuid.v4();
    this.#dbFavorites.set(recordId, { userId, itemType, itemId });
  }
  isItemUniq(itemId: string): boolean {
    return !!!Array.from(this.#dbFavorites.values()).find(
      (i) => i.itemId === itemId,
    );
  }
  getFavTypeById(id: string): favTypes | null {
    const item = this.#dbFavorites.get(id);
    return item ? item.itemType : null;
  }
  getAllFavorites(): IFavoritesId {
    const data = Array.from(this.#dbFavorites.values());
    return {
      artists: data
        .filter((i) => i.itemType === favTypes.Artist)
        .map((j) => j.itemId),
      albums: data
        .filter((i) => i.itemType === favTypes.Album)
        .map((j) => j.itemId),
      tracks: data
        .filter((i) => i.itemType === favTypes.Track)
        .map((j) => j.itemId),
    };
  }
  deleteFavoriteByItemId(id: string): boolean {
    for (const [key, value] of this.#dbFavorites) {
      if (value.itemId === id) {
        return !!this.#dbFavorites.delete(key);
      }
    }
    return false;
  }
  getFavoritesByUserId(id: string): IFavoritesId {
    const data = Array.from(this.#dbFavorites.values()).filter(
      (i) => i.userId === id,
    );
    return {
      artists: data
        .filter((i) => i.itemType === favTypes.Artist)
        .map((j) => j.itemId),
      albums: data
        .filter((i) => i.itemType === favTypes.Album)
        .map((j) => j.itemId),
      tracks: data
        .filter((i) => i.itemType === favTypes.Track)
        .map((j) => j.itemId),
    };
  }
}

export default new dbFavorites();
