import { Album } from "./Albums";
import { Artist } from "./Artists";
import { Track } from "./Tracks";
import * as uuid from 'uuid'

interface IFavorites {
    artists: string[];
    albums: string[];
    tracks: string[];
}

const enum favTypes {
    'Album', 'Artist', 'Track',
}
interface IFavorite {
    userId: string;
    itemType: favTypes;
    itemId: string;
}

class dbFavorites {
    #dbFavorites: Map<string, IFavorite> = new Map();

    addItem(userId: string, item: Album | Artist | Track): dbFavorites {
        const recordId = uuid.v4();
        let itemType;
        switch (item as any) {
            case item instanceof Album:
                itemType = favTypes.Album;
                break;
            case item instanceof Artist:
                itemType = favTypes.Artist;
                break;
            case item instanceof Track:
                itemType = favTypes.Track;
                break;
            default:
                itemType = favTypes.Track;
                break;

        }
        this.#dbFavorites.set(recordId, { userId, itemType, itemId: item.id })
        return this;
    }
    getFavoritesByUserId(id: string): IFavorites {
        const data = Array
            .from(this.#dbFavorites.values())
            .filter(i => i.userId === id);
        return {
            artists: data.filter(i => i.itemType === favTypes.Artist).map(j => j.itemId),
            albums: data.filter(i => i.itemType === favTypes.Album).map(j => j.itemId),
            tracks: data.filter(i => i.itemType === favTypes.Track).map(j => j.itemId),
        }
    }

}


export default new dbFavorites()
