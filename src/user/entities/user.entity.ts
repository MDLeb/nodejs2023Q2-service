export class User {
    login: string;
    password: string;
    newPassword?: string;
}

export class ParsedUser {
    id: string;
    login: string;
    version: number;
    createdAt: number;
    updatedAt: number;

    constructor(user: {
        id: string,
        login: string,
        password: string,
        version: number,
        createdAt: Date,
        updatedAt: Date
    }) {
        this.id = user.id;
        this.login = user.login;
        this.version = user.version;
        this.createdAt = new Date(user.createdAt).getTime();
        this.updatedAt = new Date(user.updatedAt).getTime();
    }
}

