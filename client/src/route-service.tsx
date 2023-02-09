import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v2";

export type Route = {
  route_id: number;
};

class RouteService {
  /**
   * Get task with given id.
   */
  get(id: number) {
    return axios.get<Route>("/routes/" + id).then((response) => response.data);
  }

  getAll() {
    return axios.get<Route[]>("/routes").then((response) => response.data);
  }
}

const routeService = new RouteService();
export default routeService;
