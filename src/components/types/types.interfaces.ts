export enum ToolBarTabs {
  Files = 1,
  Tokens = 2,
}

export interface ITableData {
  name: string;
  aboutInfo?: string;
  gameSystem?: string;
  owner?: string;
  _id?: string;
}

export interface IUser {
    _id: string,
    email: string,
    subscribers?: IUser[],
    subscriptions?: IUser[],
    subscrReqsToMe?: IUser[],
    subscrReqsFromMe?: IUser[]
}