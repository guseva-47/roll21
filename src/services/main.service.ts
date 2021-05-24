import api from "@/backend-api";
import authService from "./auth.service";

class MainService {
  access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVmYjE2NGU1YjMwNGU2NDY0NDFjZTJkYSIsImVtYWlsIjoiIiwiaWF0IjoxNjIxODQ2MzE3LCJleHAiOjE2MjE4ODIzMTd9.GznHyqTuHNq7Yoidm49FA03zbwISiJLlVpsIaMFbiSY"
  refresh_token = "k7ub7o0t5mld4bbh57se";
  userId = "5fb164e5b304e646441ce2da";

  ping(): Promise<any> {
    return api.get("/ping");
  }
  ok() {
    return api.get("/ok", { headers: authService._getAuthHeader(this.access_token) });
  }
  fake() {
    console.log("fake");
    return api
      .get("/auth/fake")
      .then((res) => {
        console.log("responce fake");
        console.log(res.headers);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  login() {
    localStorage.setItem(
      "user",
      JSON.stringify({
        access_token: this.access_token,
      })
    );
    localStorage.setItem(
      "userId",
      JSON.stringify({
        userId: this.userId
      })
    )
    const d = new Date();
    d.setTime(d.getTime() + 1 * 24 * 60 * 60 * 1000);
    const expires = "expires=" + d.toUTCString();
    document.cookie =
      "refresh_token=" + this.refresh_token + ";" + expires + ";path=/";
  }
  getUserId() {
    
  }
}

export default new MainService();
