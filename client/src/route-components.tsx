import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route } from "./route-service";
import { createHashHistory } from "history";
import { Card, Row, Col, Form } from "react-bootstrap";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders route list.
 */
export class RouteList extends Component {
  routes: Route[] = [];

  render() {
    return (
      <>
        <Card title="Routes">
          {this.routes.map((route) => (
            <Row key={route.route_id}>
              <Col>{route.destination}</Col>
            </Row>
          ))}
        </Card>
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

/**
 * Renders a create new route form list.
 */
export class NewRoute extends Component {
  destination: string = ""; // Temp Value
  duration: string = "";
  render() {
    return (
      <>
        <Card
          title="New route"
          style={{
            textAlign: "center",
            marginTop: "3%",
            marginLeft: "30%",
            marginRight: "30%",
          }}
        >
          <Card.Title>Add a new route here</Card.Title>

          <Form>
            <Row>
              <Form.Control
                value={this.destination}
                type="text"
                placeholder="Start"
              ></Form.Control>
            </Row>
            <Row>
              <Form.Control
                value={this.destination}
                type="text"
                placeholder="Stop"
              ></Form.Control>
            </Row>
          </Form>
        </Card>
      </>
    );
  }

  //   mounted() {
  //     routeService
  //       .getAll()
  //       //@ts-ignore
  //       .then((routes) => (this.routes = routes))
  //       .catch((error: { message: string }) =>
  //         alert("Error getting tasks: " + error.message)
  //       );
  //   }
}
