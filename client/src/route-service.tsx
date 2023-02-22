import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v2";

export type Route = {
  route_id: number;
  destination: string;
  duration: string;
  time_published: Date;
  continent: string;
  order_number: number;
  estimated_price: number;
  user_profile_id: number;
  travel_point_id: number;
};

/*export type TravelPoint = {
  travel_point_id: number;
  destination: string;
  continent: string;
};

export type RouteTravelPoint = {
  route_id: number;
  travel_point_id: number;
  order_number: number;
  duration: number;
  estimated_price: number;
  user_profile_id: number;
};*/

class RouteService {
  /**
   * Get task with given id.
   */
  get(route_id: number) {
    return axios
      .get<Route>("/routes/" + route_id)
      .then((response) => response.data);
  }

  getAll() {
    return axios.get<Route[]>("/routes").then((response) => response.data);
  }
}

const routeService = new RouteService();
export default routeService;
