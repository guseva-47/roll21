import api from "@/backend-api";

class AxiosService {
  ping(): Promise<any> {
    return api.get("/ping");
  }
}

export default new AxiosService();
