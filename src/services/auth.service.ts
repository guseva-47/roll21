import { IUserLocalStorage } from "./types";
import api from "@/backend-api";

class AuthService {
  async checkAccessTokenAndGetAuthHeader(): Promise<{ Authorization: string }> {
    // Достать пользователя из local storage. Если токена у него нет, то вернуть ошибку, нужна авторизация
    // @ts-ignore
    const user = this._getUserFromLocalStorage();
    if (!user || !user.access_token)
      throw new Error("User or access token not found in locall storage");

    // Проверить, что access_token истек, если еще не истек, то вернуть хедер (пользователь авторизован)
    // @ts-ignore
    const accessTokenExp = this._parseTokenData(user.access_token).exp;
    if (!this._isAccessTokenExpired(accessTokenExp))
      return this._getAuthHeader(user.access_token);

    // Послать запрос на получение нового токена через рефреш токен (из куки). Если вернулась ошибка, рефреш токен не валиден, вернуть ошибку
    const res = await this._postRefreshToken(user.access_token).catch((err) => {
      throw new Error("Update refresh_token failed");
    });

    // Полученный токен сохраняем юзеру в local_storage
    user.access_token = res.headers.authorization; // todo ????
    this._saveUserInLocalStorage(user);

    return this._getAuthHeader(user.access_token);
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

  _parseTokenData(accessToken: string) {
    let payload = "";
    let tokenData = {};

    try {
      payload = accessToken.split(".")[1];
      tokenData = JSON.parse(atob(payload));
    } catch (error) {
      throw new Error(error);
    }

    return tokenData;
  }

  _isAccessTokenExpired(accessTokenExpDate: number) {
    accessTokenExpDate = accessTokenExpDate - 10;
    const nowTime = Math.floor(new Date().getTime() / 1000);

    return accessTokenExpDate <= nowTime;
  }
}

export default new AuthService();
