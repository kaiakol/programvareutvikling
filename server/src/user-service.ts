import pool from "./mysql-pool";
import type { RowDataPacket, ResultSetHeader } from "mysql2";
import routeService from "./route-service";

export type User = {
  user_profile_id: number;
  profile_name: string;
  profile_password: string;
  first_name: string;
  last_name: string;
  email: string;
  special_user_type: string;
};

class UserService {
  /**
   * Create new user
   */
  createUser(
    profile_name: string,
    profile_password: string,
    first_name: string,
    last_name: string,
    email: string,
    special_user_type: string
  ) {
    return new Promise<User>((resolve, reject) => {
      pool.query(
        "INSERT INTO user_profile SET profile_name=?, profile_password=?, first_name=?, last_name=?, email=?, special_user_type=NULL",
        [profile_name, profile_password, first_name, last_name, email],
        (error, results: RowDataPacket[]) => {
          if (error) return reject(error);

          resolve(results[0] as User);
        }
      );
    });
  }
}

const userService = new UserService();
export default userService;
