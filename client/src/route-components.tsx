import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route } from "./route-service";
import { createHashHistory } from "history";
import { Alert, Card } from "react-bootstrap";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders route list.
 */
export class RouteList extends Component {
  routes: Route[] = [];

  render() {
    return <Card>"Hei"</Card>;
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
