import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";

import routeService, {
  Route_travel_point,
  Route,
  Rating,
} from "../route-service";

const history = createHashHistory();

export class RouteDetails extends Component<{
  match: { params: { route_id: number } };
}> {
  route: Route = {
    route_id: 0,
    route_name: "",
    duration: "",
    estimated_price: "",
    description: "",
  };

  route_travel_points: Route_travel_point[] = [];

  rating: Rating = {
    rating_id: 0,
    value: 0,
    description: "",
    user_profile_id: 0,
    route_id: 0,
    travel_point_id: 0,
  };

  render() {
    return (
      <>
        <Card style={{ width: "80%", marginLeft: "10%" }}>
          <Row>
            <Col style={{ marginLeft: "20px" }}>
              <h2>Destinations</h2>

              {this.route_travel_points.map((route_travel_point) => (
                <Row key={route_travel_point.route_id}>
                  {route_travel_point.order_number}{" "}
                  {route_travel_point.destination}
                </Row>
              ))}
            </Col>
            <Col>
              <h2>Route Information</h2>
              <Row>{this.route.description}</Row>
              <Row>{this.route.estimated_price}</Row>
              <Row>{this.route.duration}</Row>
            </Col>
            <Col>
              <h2>Rating</h2>
              <Row>
                {parseFloat(this.rating["AVG(rating.value)"]).toFixed(2)}
              </Row>
            </Col>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    routeService
      .getRoute(this.props.match.params.route_id)
      //@ts-ignore
      .then((route) => ((this.route = route), console.log(route)))
      .catch((error) => alert(error.response.data));

    routeService
      .getRouteTravelPoints(this.props.match.params.route_id)
      .then((route_travel_points) => {
        this.route_travel_points = route_travel_points;
        //Her sorteres travelpointsene i kronologisk rekkefølge basert på
        //order_number slik at dette printes riktig når disse mappes
        this.route_travel_points.sort(
          (a, b) => a.order_number - b.order_number
        );
      })
      .catch((error) => alert(error.response.data));
    routeService
      .getRating(this.props.match.params.route_id)
      .then((rating) => ((this.rating = rating), console.log(rating)))
      .catch((error) => alert(error.response.data));
  }
}
