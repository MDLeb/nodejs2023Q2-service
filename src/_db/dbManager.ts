import dbAlbums, { Album, IAlbumData } from "./Albums";
import dbArtists, { Artist, IArtistData } from "./Artists";
import dbFavorites, { IFavorites, favTypes } from "./Favorites";
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
    userExists(userId: string): Boolean {
        return !!this.#dbUsers.getUserById(userId);
    }
    checkPassword(userId: string, oldPassword: string): Boolean {
        return oldPassword === this.#dbUsers.getUserById(userId)?.password;
    }
    getUserById(id: string): User | null {
        const user = JSON.parse(JSON.stringify(this.#dbUsers.getUserById(id)));
        delete user.password;
        return user;
    }
    addUser(userdata: IUserData): User | null {
        const user = JSON.parse(JSON.stringify(this.#dbUsers.addUser(userdata)));
        delete user.password;
        return user;
    }
    updateUser(id: string, userdata: Partial<IUserData>): User | null {
        const user = JSON.parse(JSON.stringify(this.#dbUsers.changeUser(id, userdata)));
        delete user.password;
        return user;
    }
    deleteUser(id: string): void {
        this.#dbUsers.deleteUserById(id);
    }

    //Tracks 
    getAllTracks(): Track[] {
        return this.#dbTracks.getAllTracks()
    }
    trackExists(trackId: string): Boolean {
        return !!this.#dbTracks.getTrackById(trackId);
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
    deleteTrackRelation(trackId: string) {
        this.#dbFavorites.deleteFavoriteByItemId(trackId)
    }

    //Artists
    getAllArtists(): Artist[] {
        return this.#dbArtists.getAllArtists()
    }
    artistExists(atristId: string): Boolean {
        return !!this.#dbArtists.getArtistById(atristId);
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
    deleteArtistRelation(artistId: string) {
        this.#dbAlbums.deleteArtistRelations(artistId);
        this.#dbTracks.deleteArtistRelations(artistId);
        this.#dbFavorites.deleteFavoriteByItemId(artistId)
    }

    //Albums
    getAllAlbums(): Album[] {
        return this.#dbAlbums.getAllTracks()
    }
    albumExists(albumId: string): Boolean {
        return !!this.#dbAlbums.getAlbumById(albumId);
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
    deleteAlbumRelation(albumId: string) {
        this.#dbTracks.deleteAlbumRelations(albumId);
        this.#dbFavorites.deleteFavoriteByItemId(albumId)
    }

    //Favorites
    addFav(itemId: string, itemType: favTypes): void {
        return this.#dbFavorites.addItem('', itemId, itemType);
    }
    getAllFavs(): IFavorites {
        const res = this.#dbFavorites.getAllFavorites();

        return {
            artists: res.artists.map(j => this.#dbArtists.getArtistById(j)).filter(i => i !== null),
            albums: res.albums.map(j => this.#dbAlbums.getAlbumById(j)).filter(i => i !== null),
            tracks: res.tracks.map(j => this.#dbTracks.getTrackById(j)).filter(i => i !== null),
        }
    }
    getFavById(id: string): Album | Artist | Track | null {
        const type = this.#dbFavorites.getFavTypeById(id);
        if (type === null) return null;
        switch (type as any) {
            case type === favTypes.Album:
                return this.#dbAlbums.getAlbumById(id);
            case type === favTypes.Artist:
                return this.#dbArtists.getArtistById(id);
            case type === favTypes.Track:
                return this.#dbTracks.getTrackById(id);
            default: break;
        }
    }
    deleteFavoriteById(id: string): Boolean {
        return this.#dbFavorites.deleteFavoriteByItemId(id);
    }
}
export default new dbManager();