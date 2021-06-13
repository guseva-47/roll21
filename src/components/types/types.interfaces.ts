export enum NoteMode {
    VIEW,
    EDIT,
    CREATE,
}

export interface INote {
    _id: string;
    title: string;
    text: string;
    author: string;
    tabletop: string;
    date: Date;
    secureMode: NoteSecureMode;
}

export interface ITableData {
    _id?: string;
    name: string;
    aboutInfo?: string;
    owner?: string;
    players?: Array<IPlayer>;
}

export interface IPlayer {
    user: string;
}

export interface IUser {
    _id: string;
    email: string;
    subscribers?: string[];
    subscriptions?: string[];
    subscrReqsToMe?: string[];
    subscrReqsFromMe?: string[];
}

export enum NoteSecureMode {
    author_only = 'author_only',
    all = 'all',
}

export interface INewMapParam {
    title: string;
    widthCount: number;
    heightCount: number;
}

export interface IMessage {
    _id: string;
    text: string;
    author: string;
    tabletop: string;
    date: Date;
}
