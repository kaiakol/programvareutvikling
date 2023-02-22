import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v2";

export type Route = {
  route_id: number;
  destination: string;
  duration: string;
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

  createRoute(
    destination: string,
    continent: string,
    duration: string,
    estimated_price: string
    // order_number: number
  ) {
    return axios
      .post("/routes/add", {
        destination: destination,
        continent: continent,
        duration: duration,
        estimated_price: estimated_price,
        // order_number: order_number,
      })
      .then((response) => response.data);
  }
}

const routeService = new RouteService();
export default routeService;
