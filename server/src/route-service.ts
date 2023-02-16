import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type Route = {
  route_id: number;
  duration: string;
  //destination: string;
  time_published: Date;
};

class RouteService {
  add(duration: string, time_published: Date) {
    return new Promise<Number>((resolve, reject) => {
      pool.query(
        "INSERT INTO route SET duration=?, time_published=?",
        [duration, time_published],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);

          resolve(results.insertId);
        }
      );
    });
  }

  remove(route: Route) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "DELETE FROM Routes WHERE route_id = ?}') ",
        [route.route_id],
        (error, results: ResultSetHeader) => {
          if (error) return reject(error);
          if (results.affectedRows == 0) reject(new Error("No row deleted"));

          resolve();
        }
      );
    });
  }

  update(route: Route) {
    return new Promise<void>((resolve, reject) => {
      pool.query(
        "UPDATE route SET duration = ? WHERE route_id = ?})",
        [route.duration, route.route_id],
        (error, _results) => {
          if (error) return reject(error);
          resolve();
        }
      );
    });
  }

  /**
   * Get task with given id.
   */
  get(id: number) {
    return new Promise<Route | undefined>((resolve, reject) => {
      pool.query(
        "SELECT * FROM route_travel_point WHERE id = ?",
        [id],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Route);
        }
      );
    });
  }

  /**
   * Get all Routes.
   */
  getAll() {
    return new Promise<Route[]>((resolve, reject) => {
      pool.query(
        "SELECT * FROM route, travel_point, route_travel_point WHERE route.route_id = route_travel_point.route_id AND route_travel_point.travel_point_id = travel_point.travel_point_id",
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results as Route[]);
        }
      );
    });
  }
}
const routeService = new RouteService();
export default routeService;
