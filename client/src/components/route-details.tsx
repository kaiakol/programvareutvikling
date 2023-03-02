import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService, { RouteWithAllInformation } from "./route-service";

const history = createHashHistory();

export class RouteDetails extends Component<{
  match: { params: { route_id: number } };
}> {
  routes: RouteWithAllInformation[] = [];

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
              <Row style={{ marginBottom: "20px" }}>
                <Col style={{ fontWeight: "bold" }}>Stops</Col>
                <Col style={{ fontWeight: "bold" }}>Continent</Col>
                <Col style={{ fontWeight: "bold" }}>Estimated Price</Col>
                <Col style={{ fontWeight: "bold" }}>Duration</Col>
                <Col style={{ fontWeight: "bold" }}>Order Number</Col>
              </Row>
              {this.routes.map((route) => (
                <Row
                  key={route.travel_point_id}
                  style={{ marginBottom: "20px" }}
                >
                  <Col>{route.destination}</Col>
                  <Col>{route.continent}</Col>
                  <Col>{route.estimated_price}</Col>
                  <Col>{route.duration}</Col>
                  <Col>{route.order_number}</Col>
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
      .getRoute(this.props.match.params.route_id)
      //@ts-ignore
      .then((routes) => (this.routes = routes))
      .catch((error) => alert(error.response.data));
  }
}
