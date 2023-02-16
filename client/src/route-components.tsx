import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route } from "./route-service";
import { createHashHistory } from "history";
import { Card, Row, Col, Form, Alert, Button } from "react-bootstrap";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export type addDestination = {
  name: string;
  orderNumber: number;
};
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
  newDestinations: addDestination[] = []; // Temp value
  destinationNumber: number = 1;
  newDestination: addDestination = {
    name: "",
    orderNumber: this.destinationNumber,
  };
  duration: string = "";
  render() {
    return (
      <>
        <Card style={{ display: "flex" }}>
          <Card.Title style={{ marginLeft: "auto", marginRight: "auto" }}>
            Add steps
          </Card.Title>
          <Row style={{ marginLeft: "auto", marginRight: "auto" }}>
            Input ONE travel point chronologically
          </Row>
          <Row style={{ margin: "5%", marginTop: "3%", marginBottom: "0%" }}>
            <Form.Control
              value={this.newDestination.name}
              type="text"
              placeholder="Destination"
              onChange={(event) =>
                (this.newDestination.name = event.currentTarget.value)
              }
              style={{
                textAlign: "center",
                width: "60%",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "10px",
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Button
              style={{ width: "30%", marginLeft: "20%", marginBottom: "10px" }}
              variant="light"
              onClick={() => this.addDestination()}
            >
              +
            </Button>
            <Button
              style={{ width: "30%", marginBottom: "10px" }}
              variant="light"
              onClick={() => this.undoDestination()}
            >
              &#x1F519;
            </Button>
          </Row>
          <Row style={{ margin: "5%" }}>
            {this.newDestinations.map((newDestination) => (
              <Row key={newDestination.orderNumber}>
                <Col>
                  {newDestination.orderNumber + ": " + newDestination.name}
                </Col>
              </Row>
            ))}
          </Row>
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

  addDestination() {
    if (this.newDestination.name == "") {
      <Alert variant="danger">All fields must be filled.</Alert>;
    } else {
      this.newDestinations.push(this.newDestination);
      this.destinationNumber += 1;
      this.newDestination = { name: "", orderNumber: this.destinationNumber };
    }
  }

  undoDestination() {
    this.newDestinations.pop();
    this.destinationNumber -= 1;
    this.newDestination.orderNumber = this.destinationNumber;
  }
}
