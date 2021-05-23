import { IAccessToken, IUserLocalStorage } from "./types";
import api from "@/backend-api";

class AuthService {
  async checkAccessTokenAndGetAuthHeader(): Promise<{ Authorization: string }> {
    // Достать пользователя из local storage. Если токена у него нет, то вернуть ошибку, нужна авторизация
    const user = this._getUserFromLocalStorage();
    if (!user || !user.access_token)
      throw new Error("User or access token not found in locall storage");

    // Проверить, что access_token истек, если еще не истек, то вернуть хедер (пользователь авторизован)
    const accessTokenExp = this._parseTokenData(user.access_token).exp;
    if (!this._isAccessTokenExpired(accessTokenExp))
      return this._getAuthHeader(user.access_token);

    // Послать запрос на получение нового токена через рефреш токен (из куки). Если вернулась ошибка, рефреш токен не валиден, вернуть ошибку
    const res = await this._postRefreshToken(user.access_token).catch((err) => {
      throw new Error("Update refresh_token failed");
    });

    // Полученный токен сохраняем юзеру в local_storage
    user.access_token = res.headers.authorization; // todo ???? так работает?
    this._saveUserInLocalStorage(user);

    return this._getAuthHeader(user.access_token);
  }

  async getAuthorizedUserId(): Promise<string | null> {
    // Достать пользователя из local storage. Если токена у него нет, то вернуть ошибку, нужна авторизация
    const user = this._getUserFromLocalStorage();
    if (!user || !user.access_token) return null;

    // Проверить, что access_token истек, если еще не истек, то вернуть хедер (пользователь авторизован)
    const accessTokenExp = this._parseTokenData(user.access_token).exp;
    if (!this._isAccessTokenExpired(accessTokenExp))
      return this._parseTokenData(user.access_token).id;

    // Послать запрос на получение нового токена через рефреш токен (из куки). Если вернулась ошибка, рефреш токен не валиден, вернуть ошибку
    const res = await this._postRefreshToken(user.access_token).catch(
      (_) => null
    );
    if (res == null) return null;

    // Полученный токен сохраняем юзеру в local_storage
    user.access_token = res.headers.authorization; // todo ???? так обращение к токену работает?
    this._saveUserInLocalStorage(user);

    return this._parseTokenData(user.access_token).id;
  }

  _saveUserInLocalStorage(user: IUserLocalStorage) {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token: user.access_token,
      })
    );
  }

  _getUserFromLocalStorage(): IUserLocalStorage | null {
    // @ts-ignore
    return JSON.parse(localStorage.getItem("user")) as IUserLocalStorage;
  }
  async _postRefreshToken(userAccessToken: string) {
    const ch = {
      Cookie: document.cookie, // todo
    };
    return api.get("/auth/refresh-token", {
      headers: { ...ch, ...this._getAuthHeader(userAccessToken) },
    });
  }

  _getAuthHeader(userAccessToken: string): { Authorization: string } {
    return { Authorization: "Bearer " + userAccessToken };
  }

  _parseTokenData(accessToken: string): IAccessToken {
    let payload = "";
    let tokenData = {};

    try {
      payload = accessToken.split(".")[1];
      tokenData = JSON.parse(atob(payload));
    } catch (error) {
      throw new Error(error);
    }

    return tokenData as IAccessToken;
  }

  _isAccessTokenExpired(accessTokenExpDate: number) {
    accessTokenExpDate = accessTokenExpDate - 10;
    const nowTime = Math.floor(new Date().getTime() / 1000);

    return accessTokenExpDate <= nowTime;
  }
}

export default new AuthService();
