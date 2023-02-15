import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type Route = {
  route_id: number;
  duration: string;
  destination: string;
  time_published: Date;
};

class RouteService {

  add(route_id: number, duration: number, time_published: Date){
    pool.query(
      "INSERT INTO Routes(DestinationName, Title, Area) VALUES('${route_id}, ${duration}, ${time_published},') ",
      [route_id],
      [duration],
      [time_published],
    )
  }
  
  remove(route_id: number,){
    pool.query(
      "DELETE FROM Routes WHERE route_id = ?}') ",
      [route_id]
    )
  }

  update(route_id: number, duration: number, time_published: Date){
    pool.query(
      "UPDATE route SET duration = '' WHERE route_id = ?})"
      [route_id],
    )
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
