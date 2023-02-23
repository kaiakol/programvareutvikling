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
  continent: string;
};
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

/**
 * Renders a create new route form list.
 */
export class NewRoute extends Component {
  newDestinations: addDestination[] = []; // Temp value
  destinationNumber: number = 1;
  newDestination: addDestination = {
    name: "",
    orderNumber: this.destinationNumber,
    continent: "",
  };
  duration: string = "";
  estimatedCost: string = "";
  render() {
    return (
      <>
        <Card>
          <Row>
            <Col style={{ marginLeft: "auto", marginRight: "auto" }}>
              {/* <Card */}
              {/* style=
          {{
            display: "flex",
            width: "40%",
            float: "left",
            marginLeft: "7%",
            marginTop: "30px",
          }} */}
              {/* > */}
              <Card.Title
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                }}
              >
                Add steps
              </Card.Title>
              <Row>
                <p
                  style={{
                    marginLeft: "auto",
                    marginRight: "auto",
                    textAlign: "center",
                  }}
                >
                  Input ONE destination and continent chronologically
                </p>
              </Row>
              <Row
                style={{
                  margin: "5%",
                  marginTop: "3%",
                  marginBottom: "0%",
                }}
              >
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
                <Form.Select
                  style={{ width: "30%", height: "47px" }}
                  value={this.newDestination.continent}
                  onChange={(event) =>
                    (this.newDestination.continent = event.currentTarget.value)
                  }
                >
                  <option>Continent:</option>
                  <option value="Africa">Africa</option>
                  <option value="Antarctica">Antarctica</option>
                  <option value="Asia">Asia</option>
                  <option value="Australia">Australia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                </Form.Select>
              </Row>
              <Row>
                <Button
                  style={{
                    width: "30%",
                    marginLeft: "20%",
                    marginBottom: "10px",
                  }}
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
                      {newDestination.orderNumber +
                        ": " +
                        newDestination.name +
                        " - " +
                        newDestination.continent}
                    </Col>
                  </Row>
                ))}
              </Row>
            </Col>
            {/* </Card> */}
            {/* <Card */}
            {/* style=
            {{
              width: "40%",
              display: "flex",
              float: "right",
              marginRight: "7%",
              marginTop: "30px",
            }} */}
            {/* > */}
            <Col>
              <Card.Title
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  textAlign: "center",
                }}
              >
                Add info about route
              </Card.Title>
              <Row
                style={{
                  margin: "5%",
                  marginTop: "3%",
                  marginBottom: "0%",
                }}
              >
                <Form.Control
                  value={this.duration}
                  type="text"
                  onChange={(event) =>
                    (this.duration = event.currentTarget.value)
                  }
                  style={{
                    marginLeft: "auto",
                    width: "60%",
                    marginRight: "auto",
                    marginBottom: "10px",
                  }}
                  placeholder="Duration (in hours?)"
                ></Form.Control>
              </Row>
              <Row
                style={{
                  margin: "5%",
                  marginTop: "3%",
                  marginBottom: "0%",
                }}
              >
                <Form.Control
                  value={this.estimatedCost}
                  onChange={(event) =>
                    (this.estimatedCost = event.currentTarget.value)
                  }
                  type="text"
                  style={{
                    marginLeft: "auto",
                    width: "60%",
                    marginRight: "auto",
                    marginBottom: "10px",
                  }}
                  placeholder="Estimated cost"
                ></Form.Control>
              </Row>
              <Row
                style={{
                  margin: "5%",
                  marginTop: "3%",
                  marginBottom: "0%",
                }}
              ></Row>
              {/* </Card> */}
            </Col>
          </Row>
        </Card>
        <Row>
          <Button
            onClick={() => this.createRoute()}
            style={{
              width: "30%",
              marginBottom: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              marginTop: "30px",
            }}
            variant="light"
          >
            Create Route
          </Button>
        </Row>
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
    if (this.newDestination.name == "" || this.newDestination.continent == "") {
      alert("All fields must be filled");
    } else {
      this.newDestinations.push(this.newDestination);
      this.destinationNumber += 1;
      this.newDestination = {
        name: "",
        orderNumber: this.destinationNumber,
        continent: "",
      };
    }
  }

  undoDestination() {
    this.newDestinations.pop();
    this.destinationNumber -= 1;
    this.newDestination.orderNumber = this.destinationNumber;
  }

  createRoute() {
    if (
      this.duration == "" ||
      this.estimatedCost == "" ||
      this.newDestinations.length == 0
    ) {
      alert("All fields must be filled");
    } else {
      routeService.createRoute(
        this.newDestination.name,
        this.newDestination.continent,
        this.duration,
        this.estimatedCost
        // this.newDestination.orderNumber
      );
    }
  }
}
