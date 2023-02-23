import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";

export type Route = {
  route_id: number;
  duration: string;
  destination: string;
  //time_published: Date;
};

export type travel_point = {
  travel_point_id: string;
  destination: string;
  continent: string;
};

export type route_travel_point = {
  route_id: number;
  travel_point_id: string;
  order_number: number;
  // user_profile_id: number;
};

class RouteService {
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

  createRoute(duration: string, estimated_price: string) {
    return new Promise<Route>((resolve, reject) => {
      pool.query(
        "INSERT INTO route SET duration=?, estimated_price=?",
        [duration, estimated_price],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as Route);
        }
      );
    });
  }

  createTravelPoint(
    travel_point_id: number,
    destination: string,
    continent: string
  ) {
    return new Promise<travel_point>((resolve, reject) => {
      pool.query(
        "INSERT INTO travel_point SET travel_point_id=?, destination=?, continent=?",
        [travel_point_id, destination, continent],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as travel_point);
        }
      );
    });
  }

  createRouteTravelPoint(
    route_id: number,
    travel_point_id: number,
    order_number: number
  ) {
    return new Promise<route_travel_point>((resolve, reject) => {
      pool.query(
        "INSERT INTO route_travel_point SET route_id=?, travel_point_id=?, order_number=?",
        [route_id, travel_point_id, order_number],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as route_travel_point);
        }
      );
    });
  }

  // createRoute(
  //   destination: string,
  //   continent: string,
  //   duration: number,
  //   estimated_price: number
  //   // order_number: number
  // ): Promise<void> {
  //   return new Promise<void>((resolve, reject) => {
  //     pool.getConnection((err, connection) => {
  //       if (err) {
  //         reject(err);
  //         return;
  //       }
  //       connection.beginTransaction((err) => {
  //         if (err) {
  //           connection.release();
  //           reject(err);
  //           return;
  //         }
  //         connection.query(
  //           "INSERT INTO travel_point (destination, continent) VALUES (?, ?)",
  //           [destination, continent],
  //           (err, result) => {
  //             if (err) {
  //               connection.rollback(() => {
  //                 connection.release();
  //                 reject(err);
  //               });
  //               return;
  //             }
  //             const travel_point_id = result.insertId;
  //             connection.query(
  //               "INSERT INTO route (duration, estimated_price) VALUES (?, ?)",
  //               [duration, estimated_price],
  //               (err, result) => {
  //                 if (err) {
  //                   connection.rollback(() => {
  //                     connection.release();
  //                     reject(err);
  //                   });
  //                   return;
  //                 }
  //                 const route_id = result.insertId;
  //                 connection.query(
  //                   "INSERT INTO route_travel_point (route_id, travel_point_id) VALUES (?, ?)",
  //                   [
  //                     route_id,
  //                     travel_point_id,

  //                     // order_number
  //                   ],
  //                   (err, result) => {
  //                     if (err) {
  //                       connection.rollback(() => {
  //                         connection.release();
  //                         reject(err);
  //                       });
  //                       return;
  //                     }
  //                     connection.commit((err) => {
  //                       if (err) {
  //                         connection.rollback(() => {
  //                           connection.release();
  //                           reject(err);
  //                         });
  //                         return;
  //                       }
  //                       connection.release();
  //                       resolve();
  //                     });
  //                   }
  //                 );
  //               }
  //             );
  //           }
  //         );
  //       });
  //     });
  //   });
  // }
}
const routeService = new RouteService();
export default routeService;
