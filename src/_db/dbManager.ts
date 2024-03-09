import dbAlbums, { Album, IAlbumData } from "./Albums";
import dbArtists, { Artist, IArtistData } from "./Artists";
import dbFavorites from "./Favorites";
import dbTracks, { ITrackData, Track } from "./Tracks";
import dbUsers, { IUserData, User } from "./Users";

class dbManager {
    #dbUsers = dbUsers;
    #dbArtists = dbArtists;
    #dbAlbums = dbAlbums;
    #dbTracks = dbTracks;
    #dbFavorites = dbFavorites;

    //USERS
    getAllUsers(): User[] {
        return this.#dbUsers.getAllUsers();
    }
    getUserById(id: string): User | null {
        return this.#dbUsers.getUserById(id);
    }
    addUser(userdata: IUserData): User | null {
        return this.#dbUsers.addUser(userdata);
    }
    updateUser(id: string, userdata: Partial<IUserData>): User | null {
        return this.#dbUsers.changeUser(id, userdata);
    }
    deleteUser(id: string): void {
        this.#dbUsers.deleteUserById(id);
    }

    //Tracks 
    getAllTracks(): Track[] {
        return this.#dbTracks.getAllTracks()
    }
    getTrackById(id: string): Track | null {
        return this.#dbTracks.getTrackById(id)
    }
    addTrack(trackdata: ITrackData): Track {
        return this.#dbTracks.addTrack(trackdata)
    }
    updateTrack(id: string, trackdata: Partial<ITrackData>): Track | null {
        return this.#dbTracks.updateTrackById(id, trackdata)
    }
    deleteTrack(id: string): void {
        this.#dbTracks.deleteTrackById(id)
    }

    //Artists
    getAllArtists(): Artist[] {
        return this.#dbArtists.getAllArtists()
    }
    getArtistById(id: string): Artist | null {
        return this.#dbArtists.getArtistById(id)
    }
    addArtist(artistdata: IArtistData): Artist {
        return this.#dbArtists.addArtist(artistdata)
    }
    updateArtist(id: string, artistdata: Partial<IArtistData>): Artist | null {
        return this.#dbArtists.updateArtistById(id, artistdata)
    }
    deleteArtist(id: string): void {
        this.#dbArtists.deleteArtistById(id)
    }

    //Albums
    getAllAlbums(): Album[] {
        return this.#dbAlbums.getAllTracks()
    }
    getAlbumById(id: string): Album | null {
        return this.#dbAlbums.getAlbumById(id)
    }
    addAlbum(albumdata: IAlbumData): Album {
        return this.#dbAlbums.addAlbum(albumdata)
    }
    updateAlbum(id: string, albumdata: Partial<IAlbumData>): Album | null {
        return this.#dbAlbums.updateAlbumById(id, albumdata)
    }
    deleteAlbum(id: string) {
        this.#dbAlbums.deleteAlbumById(id);
    }

    //Favorites
    getAllFavs(): any[] {
        return []
    }
}
export default new dbManager();