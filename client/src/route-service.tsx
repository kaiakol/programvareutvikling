import axios from "axios";

axios.defaults.baseURL = "http://localhost:3000/api/v2";

// export type RouteWithAllInformation = {
//   route_id: number;
//   duration: string;
//   destination: string;
//   time_published: Date;
//   continent: string;
//   order_number: number;
//   estimated_price: number;
//   user_profile_id: number;
//   travel_point_id: number;
// };

export type Route = {
  route_id: number;
  route_name: string;
  duration: string;
  estimated_price: string;
  description: string;
  // destination: string;
  //time_published: Date;
};

// export type TravelPoint = {
//   travel_point_id: number;
//   destination: string;
//   continent: string;
// };

export type Route_travel_point = {
  route_id: number;
  travel_point_id: number;
  order_number: number;
  destination: string;
  continent: string;
  // user_profile_id: number;
};

export type Rating = {
  rating_id: number;
  value: number;
  description: string;
  user_profile_id: number;
  route_id: number;
  travel_point_id: number;
};

// export type RouteTravelPoint = {
//   route_id: number;
//   travel_point_id: number;
//   order_number: number;
//   duration: number;
//   estimated_price: number;
//   user_profile_id: number;
// };

class RouteService {
  /**
   * Get task with given id.
   */
  getRoute(route_id: number) {
    return axios
      .get<Route>("/routes/" + route_id)
      .then((response) => response.data);
  }

  getAllRoutes() {
    return axios.get<Route[]>("/routes").then((response) => response.data);
  }

  getRouteTravelPoints(route_id: number) {
    return axios
      .get<Route_travel_point[]>("/route_travel_points/" + route_id)
      .then((response) => response.data);
  }
  // createRoute(
  //   destination: string,
  //   continent: string,
  //   duration: string,
  //   estimated_price: string
  //   // order_number: number
  // ) {
  //   return axios
  //     .post("/routes/add", {
  //       destination: destination,
  //       continent: continent,
  //       duration: duration,
  //       estimated_price: estimated_price,
  //       // order_number: order_number,
  //     })
  //     .then((response) => response.data);
  // }

  createRoute(
    route_name: string,
    duration: string,
    estimated_price: string,
    description: string
  ) {
    return axios
      .post("/routes/add", {
        route_name: route_name,
        duration: duration,
        estimated_price: estimated_price,
        description: description,
      })
      .then((response) => response.data);
  }

  createTravelPoint(destination: string, continent: string) {
    return axios
      .post("/travel_points/add", {
        destination: destination,
        continent: continent,
      })
      .then((response) => response.data);
  }

  createRouteTravelPoint(
    route_id: number,
    travel_point_id: number,
    order_number: number
  ) {
    return axios
      .post("/route_travel_points/add", {
        route_id: route_id,
        travel_point_id: travel_point_id,
        order_number: order_number,
      })
      .then((response) => response.data);
  }

  getRating(route_id: number) {
    return axios
      .get<Rating>("/routes/" + route_id)
      .then((response) => response.data);
  }
}

const routeService = new RouteService();
export default routeService;
