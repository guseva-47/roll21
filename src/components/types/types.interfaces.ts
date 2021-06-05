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
  secureMode: NoteSecureMode
}

export interface ITableData {
  name: string;
  aboutInfo?: string;
  gameSystem?: string;
  owner?: string;
  _id?: string;
}

export interface IUser {
  _id: string;
  email: string;
  subscribers?: IUser[];
  subscriptions?: IUser[];
  subscrReqsToMe?: IUser[];
  subscrReqsFromMe?: IUser[];
}

export enum NoteSecureMode {
    author_only = 'author_only',
    all = 'all'
}

export interface INewMapParam {
    title: string,
    widthCount: number,
    heightCount: number,
}

export interface IMessage {
    text: string,
    authorId: string,
    date: Date,
}

