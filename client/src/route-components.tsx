import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route } from "./route-service";
import { createHashHistory } from "history";
import { Card, Row, Col, Container } from "react-bootstrap";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders route list.
 */
export class RouteList extends Component {
  routes: Route[] = [];

  render() {
    const sortedRoutes = this.routes.sort((a, b) => a.route_id - b.route_id);
    // Render each group on a separate row
    return (
      <>
        <Container>
          <Card.Title>Routes</Card.Title>

          {sortedRoutes.map((route) => (
            <Row key={route.route_id}>
              <Col>
                <NavLink to={"/routes/" + route.route_id}>
                  {route.destination}, {route.route_id}
                </NavLink>
              </Col>
            </Row>
          ))}
        </Container>
      </>
    );
  }

  mounted() {
    routeService
      .getAll()
      //@ts-ignore
      .then((routes) => (this.routes = routes))
      .catch((error: { message: string }) =>
        alert("Error getting route: " + error.message)
      );
  }
}

export class RouteDetails extends Component<{
  match: { params: { route_id: number } };
}> {
  routes: Route[] = [];

  render() {
    return (
      <>
        <Container>
          <Card>
            {this.routes.map((route) => (
              <Row key={route.travel_point_id}>
                <Col>{route.destination}</Col>
                <Col>{route.continent}</Col>
                <Col>{route.estimated_price}</Col>
                <Col>{route.duration}</Col>
              </Row>
            ))}
          </Card>
        </Container>
      </>
    );
  }
  mounted() {
    routeService
      .get(this.props.match.params.route_id)
      //@ts-ignore
      .then((routes) => (this.routes = routes))
      .catch((error) => alert(error.response.data));
  }
}
