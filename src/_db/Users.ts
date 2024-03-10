import * as uuid from 'uuid'

export interface IUser {
    id: string; // uuid v4
    login: string;
    password: string;
    version: number; // integer number, increments on update
    createdAt: number; // timestamp of creation
    updatedAt: number; // timestamp of last update
}

export interface IUserData {
    login: string,
    password: string,
    newPassword?: string,

}

export class User implements IUser {
    id: string;
    login: string;
    password: string;
    version: number;
    createdAt: number;
    updatedAt: number;

    constructor(userdata: IUserData) {
        this.id = uuid.v4();
        this.login = userdata.login;
        this.password = userdata.password;
        this.version = 1;
        this.createdAt = Date.now();
        this.updatedAt = this.createdAt;
    }

    update(userdata: Partial<IUserData>) {
        if(this.password !== userdata.password) return;
        this.password = userdata.newPassword;

        this.version += 1;
        this.updatedAt = Date.now();
    }
}

class dbUsers {
    #dbUsers: Map<string, User> = new Map();

    getAllUsers(): any[] {
        return Array.from(this.#dbUsers.values());
    }
    addUser(userdata: IUserData): User {
        const user: User = new User(userdata);
        this.#dbUsers.set(user.id, user);
        return user;
    }
    deleteUserById(id: string): dbUsers {
        this.#dbUsers.delete(id);
        return this;
    }
    changeUser(id: string, userData: Partial<IUserData>): User | null {
        const userDb = this.#dbUsers.get(id);
        userDb.update(userData);
        this.#dbUsers.set(id, userDb);
        return userDb;
    }
    getUserById(id: string): User | null {
        return this.#dbUsers.get(id) ?? null;
    }
}


export default new dbUsers()