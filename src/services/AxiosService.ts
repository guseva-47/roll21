import api from "@/backend-api";
import authHeader from "./auth-header";

class AxiosService {
  ping(): Promise<any> {
    return api.get("/ping");
  }
  ok() {
    return api.get("/ok", { headers: authHeader() });
  }
  fake() {
    console.log('fake')
    return api.get('/auth/fake')
    .then((res) => {
        console.log('responce fake')
        console.log(res.headers);
    })
    .catch(err => {
        console.log(err)
    })
  }
  refreshToken() {
    const ch = {
        'Set-Cookie': document.cookie
    }
    return api
      .get("/auth/refresh-token", { headers: {...ch, ...authHeader()} })
      .then((res) => {
        console.log(res.headers);
      });
  }
  login() {
    localStorage.setItem(
      "user",
      JSON.stringify({
        accessToken:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjE2NGU1YjMwNGU2NDY0NDFjZTJkYSIsImVtYWlsIjoiIiwiaWF0IjoxNjIxNTk2ODk0LCJleHAiOjE2MjE2MzI4OTR9.hOtDoH8gsuTMtk608N1qlACSY97lIv0oUdxRShnqWKU",
      })
    );
    const d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie =
      "refresh_token=" + "vgmczzglcncofm4ipjzb" + ";" + expires + ";path=/";
  }
}

export default new AxiosService();
