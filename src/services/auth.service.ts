import { IAccessToken, IUserLocalStorage } from "./types";
import api from "@/backend-api";

class AuthService {
  async checkAccessTokenAndGetAuthHeader(): Promise<{ Authorization: string }> {
    console.log("проверить авторизованность и вернуть хеадер");
    // Достать пользователя из local storage. Если токена у него нет, то вернуть ошибку, нужна авторизация
    const user = this._getUserFromLocalStorage();
    if (!user || !user.access_token)
      throw new Error("User or access token not found in locall storage");

    console.log("jwt токен найден");
    // Проверить, что access_token истек, если еще не истек, то вернуть хедер (пользователь авторизован)
    const accessTokenExp = this._parseTokenData(user.access_token).exp;
    if (!this._isAccessTokenExpired(accessTokenExp))
      return this._getAuthHeader(user.access_token);

    console.log("jwt истек");

    // Послать запрос на получение нового токена через рефреш токен (из куки). Если вернулась ошибка, рефреш токен не валиден, вернуть ошибку
    const access_token = await this._postRefreshToken(user.access_token).catch((err) => {
      throw new Error("Update refresh_token failed");
    });

    console.log("новый jwt получен после рефреша ", access_token);

    // Полученный токен сохраняем юзеру в local_storage
    user.access_token = access_token;
    this._saveUserInLocalStorage(user);

    return this._getAuthHeader(user.access_token);
  }

  async getAuthorizedUserId(): Promise<string | null> {
    console.log("id авторизованного пользователя");
    // Достать пользователя из local storage. Если токена у него нет, то вернуть null, нужна авторизация
    const user = this._getUserFromLocalStorage();
    if (!user || !user.access_token) return null;
    console.log("jwt токен найден");

    // Проверить, что access_token истек, если еще не истек, то id пользователя
    const accessTokenExp = this._parseTokenData(user.access_token).exp;
    if (!this._isAccessTokenExpired(accessTokenExp))
      return this._parseTokenData(user.access_token).id;
    console.log("access_token истек");

    // Послать запрос на получение нового токена через рефреш токен (из куки). Если вернулась ошибка, рефреш токен не валиден, вернуть ошибку
    const access_token = await this._postRefreshToken(user.access_token).catch((err) => {
      console.log(err);
      return null;
    });
    
    if (access_token == null) return null;

    // Полученный токен сохраняем юзеру в local_storage
    user.access_token = access_token
    console.log(`новый access_token получен `, user.access_token)
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
      Cookie: document.cookie,
    };
    return api.post("/auth/refresh-token", {
      headers: { ...ch, ...this._getAuthHeader(userAccessToken) }
    }).then(res => {
      const access_token = res.data.Authorization;
      console.log('refresh OK ', access_token)
      return access_token;
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
