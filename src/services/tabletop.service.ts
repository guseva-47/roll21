import api from "@/backend-api";
import { ITableData } from "@/components/types/types.interfaces";
import authService from "./auth.service";

class TabletopService {
  ping(): Promise<any> {
    return api.get("/ping");
  }
  async putTabletop(table: ITableData): Promise<ITableData> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let tableData = {} as ITableData;
    await api
      .put("tabletops/edit", table, { headers: authHeader })
      .then((res) => {
        tableData = res.data;
      })
      .catch((_) => {
        throw new Error("The table info update failed.");
      });
    return tableData;
  }

  async postTabletop(table: ITableData): Promise<ITableData> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let tableData = {} as ITableData;
    await api
      .post("tabletops", table, { headers: authHeader })
      .then((res) => {
        tableData = res.data;
      })
      .catch((_) => {
        throw new Error("The table info post failed.");
      });
    return tableData;
  }

  async deleteTabletop(tableId: string): Promise<void> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    api.delete("/tabletops/" + tableId, { headers: authHeader }).catch((_) => {
      throw new Error("The table info delete failed.");
    });
  }

  async getTabletop(tableId: string): Promise<ITableData> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let tableData = {} as ITableData;
    await api
      .get("/tabletops/" + tableId, { headers: authHeader })
      .then((res) => {
        tableData = res.data;
      })
      .catch((_) => {
        throw new Error("The table info get failed.");
      });
    return tableData;
  }

  async getAllTabletops(idSomeUser: string): Promise<ITableData[]> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let tableData: ITableData[] = [];
    await api
      .get(idSomeUser + "/tabletops", { headers: authHeader })
      .then((res) => {
        tableData = res.data;
      })
      .catch((_) => {
        throw new Error("Tables info get failed.");
      });
    return tableData;
  }

  async getFewTabletops(
    idSomeUser: string,
    count: number
  ): Promise<ITableData[]> {
    const authHeader = await authService.checkAccessTokenAndGetAuthHeader();

    let tableData: ITableData[] = [];
    await api
      .get(idSomeUser + "/tabletops", {
        headers: authHeader,
        params: { count: count },
      })
      .then((res) => {
        tableData = res.data;
      })
      .catch((_) => {
        throw new Error("Tables info get failed.");
      });
    return tableData;
  }
}

export default new TabletopService();
