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
import userService, { User } from "./user-service";
import { loggedIn } from "./user-components";

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
  routes: RouteWithAllInformation[] = [];

  render() {
    const sortedRoutes = this.routes.sort((a, b) => a.route_id - b.route_id);
    // Render each group on a separate row
    const groupedRoutes = this.routes.reduce(
      (
        acc: { [key: number]: RouteWithAllInformation[] },
        curr: RouteWithAllInformation
      ) => {
        if (acc[curr.route_id]) {
          acc[curr.route_id].push(curr);
        } else {
          acc[curr.route_id] = [curr];
        }
        return acc;
      },
      {}
    );
    return (
      <>
        <Container
          style={{
            position: "absolute",
            marginLeft: "10%",
            marginRight: "10%",
            height: "100%",
            width: "80%",
            backgroundColor: "#53aca8",
          }}
        >
          <Container>
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>
              Explore
            </h1>
            {Object.keys(groupedRoutes).map((routeId) => {
              const routes = groupedRoutes[routeId];
              return (
                <Card key={routeId} style={{ marginBottom: "20px" }}>
                  <NavLink
                    to={"/routes/" + routeId}
                    style={{ textDecoration: "none" }}
                  >
                    <Card.Title
                      style={{ textAlign: "center", color: "#53ACA8" }}
                    >
                      Route
                    </Card.Title>
                  </NavLink>
                  <Row style={{ backgroundColor: "" }}>
                    {/* <Col style={{ textAlign: "center" }}>Destinations:</Col> */}
                    <Col style={{ textAlign: "center" }}>
                      {routes.map((route, index) => (
                        <span key={index}>
                          {route.destination}
                          {index === routes.length - 1 ? "" : ", "}
                        </span>
                      ))}
                    </Col>
                  </Row>
                </Card>
              );
            })}
          </Container>
        </Container>
      </>

      // <Container>
      //   <Card.Title>Routes</Card.Title>
      //   <Stack direction="horizontal" gap={3}>
      //     {sortedRoutes.map((route) => (
      //       <Row key={route.route_id}>
      //         <Col>
      //           <Card>
      //             <Col>
      //               <NavLink to={"/routes/" + route.route_id}>
      //                 {route.destination}, {route.route_id}
      //               </NavLink>
      //             </Col>
      //           </Card>
      //         </Col>
      //       </Row>
      //     ))}
      //   </Stack>
      // </Container>
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
  routes: RouteWithAllInformation[] = [];

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
                <Col>{route.order_number}</Col>
              </Row>
            ))}
          </Card>
        </Container>
      </>
    );
  }
  mounted() {
    routeService
      .getRoute(this.props.match.params.route_id)
      //@ts-ignore
      .then((routes) => (this.routes = routes))
      .catch((error) => alert(error.response.data));
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
  timepublished: Date = new Date();
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

  // createRoute() {
  //   if (
  //     this.duration == "" ||
  //     this.estimatedCost == "" ||
  //     this.newDestinations.length == 0
  //   ) {
  //     alert("All fields must be filled");
  //   } else {
  //     routeService
  //       .createRoute(
  //         this.duration,
  //         this.estimatedCost
  //         // (this.timepublished.getFullYear,
  //         // this.timepublished.getMonth(),
  //         // this.timepublished.getDay())
  //         // this.newDestination.orderNumber
  //       )
  //       .then((route_id) => {
  //         this.newDestination.map((order_number: number) => {
  //           routeService.createRouteTravelPoint(route_id, order_number);
  //         });
  //       });

  //     this.newDestinations
  //       .map((newDestination) => {
  //         routeService.createTravelPoint(
  //           newDestination.name,
  //           newDestination.continent
  //         );
  //       })
  //       .then((results) => {});
  //   }
  // }

  createRoute() {
    if (
      this.duration == "" ||
      this.estimatedCost == "" ||
      this.newDestinations.length == 0
    ) {
      alert("All fields must be filled");
    } else {
      const createRoutePromise = routeService.createRoute(
        this.duration,
        this.estimatedCost
      );

      const createTravelPointsPromises = this.newDestinations.map(
        (newDestination) => {
          return routeService.createTravelPoint(
            newDestination.name,
            newDestination.continent
          );
        }
      );

      Promise.all([createRoutePromise, ...createTravelPointsPromises])
        .then(([route_id, ...travelPointIds]) => {
          console.log(route_id["route_id"]);
          console.log(route_id.value);
          const createRouteTravelPointPromises = this.newDestinations.map(
            (newDestination, index) => {
              const order_number = newDestination.orderNumber;
              const travel_point_id = travelPointIds[index]["travel_point_id"];
              return routeService.createRouteTravelPoint(
                route_id["route_id"],
                travel_point_id,
                order_number
              );
            }
          );
          return Promise.all(createRouteTravelPointPromises);
        })
        .then((route_id) => {
          // history.push("/routes/" + Number(route_id));
          alert("The route was created");
          history.push("/routes");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }
}
