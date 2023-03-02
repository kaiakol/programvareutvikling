import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route, RouteWithAllInformation } from "./route-service";
import { createHashHistory } from "history";
import {
  Card,
  Row,
  Col,
  Form,
  Alert,
  Button,
  Stack,
  Container,
} from "react-bootstrap";

const history = createHashHistory();

export class EditRoute extends Component {
  // routes: RouteWithAllInformation[] = [];
  render() {
    return (
      <>
        <Card.Text> Hei </Card.Text>
      </>
    );
  }
  mounted() {
    // routeService
    //   .getAll()
    //   //@ts-ignore
    //   .then((routes) => (this.routes = routes))
    //   .catch((error: { message: string }) =>
    //     alert("Error getting route: " + error.message)
    //   );
  }
}
