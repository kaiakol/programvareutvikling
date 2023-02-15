import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type Route = {
  route_id: number;
};

class RouteService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return new Promise<Route | undefined>((resolve, reject) => {
      pool.query(
        "SELECT * FROM XXX WHERE id = ?",
        [id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Route);
        }
      );
    });
  }

  /**
   * Get all tasks.
   */
  getAll() {
    return new Promise<Route[]>((resolve, reject) => {
      pool.query("SELECT * FROM Tasks", (error, results: RowDataPacket[]) => {
        if (error) return reject(error);

        resolve(results as Route[]);
      });
    });
  }
}
const routeService = new RouteService();
export default routeService;
