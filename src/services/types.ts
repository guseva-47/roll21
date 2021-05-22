export interface IUserLocalStorage {
  access_token: string;
}

export interface IAccessToken {
  id: string;
  exp: number;
  iat: number;
}
