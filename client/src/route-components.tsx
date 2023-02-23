import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route } from "./route-service";
import { createHashHistory } from "history";
import { Card, Row, Col, Container, Stack } from "react-bootstrap";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders route list.
 */
export class RouteList extends Component {
  routes: Route[] = [];

  render() {
    const sortedRoutes = this.routes.sort((a, b) => a.route_id - b.route_id);
    // Render each group on a separate row
    const groupedRoutes = this.routes.reduce(
      (acc: { [key: number]: Route[] }, curr: Route) => {
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
  routes: Route[] = [];

  render() {
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
            <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Route</h1>
            <Card>
              <Row>
                <Col style={{ fontWeight: "bold" }}>Stops</Col>
                <Col style={{ fontWeight: "bold" }}>Continent</Col>
                <Col style={{ fontWeight: "bold" }}>Estimated Price</Col>
                <Col style={{ fontWeight: "bold" }}>Duration</Col>
              </Row>
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
