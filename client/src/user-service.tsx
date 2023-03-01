import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000/api/v2";

export type User = {
  profile_name: string;
  profile_password: string;
  first_name: string;
  last_name: string;
  email: string;
};

class UserService {
  createUser(
    profile_name: string,
    profile_password: string,
    first_name: string,
    last_name: string,
    email: string
  ) {
    return axios
      .post("/profile/register", {
        profile_name: profile_name,
        profile_password: profile_password,
        first_name: first_name,
        last_name: last_name,
        email: email,
      })
      .then((response) => response.data);
  }
}

const userService = new UserService();
export default userService;
