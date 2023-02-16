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
    // Group routes by route_id
    const groups = this.routes.reduce((groups, route) => {
      const key = route.route_id;
      if (!groups[key]) {
        groups[key] = [];
      }
      groups[key].push(route);
      return groups;
    }, {});

    // Render each group on a separate row
    return (
      <>
        <Container>
          {Object.values(groups).map((group) => (
            <Row key={group[0].route_id}>
              {group.map((route) => (
                <>
                  <Col key={route.route_id}>{route.destination}</Col>
                  <Col key={route.route_id}>{route.route_id}</Col>
                </>
              ))}
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
        alert("Error getting tasks: " + error.message)
      );
  }
}
