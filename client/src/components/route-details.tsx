import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
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
            <h1 style={{ textAlign: "center", marginBottom: "3%" }}>Route</h1>
            <Card>
              <Row style={{ marginBottom: "1%", marginLeft: "1%" }}>
                <Col style={{ fontWeight: "bold" }}>
                  <h4>Stops</h4>
                </Col>
                <Col style={{ fontWeight: "bold" }}>
                  <h4>Continent</h4>
                </Col>
                <Col style={{ fontWeight: "bold" }}>
                  <h4>Estimated Price</h4>
                </Col>
                <Col style={{ fontWeight: "bold" }}>
                  <h4>Duration</h4>
                </Col>
                <Col style={{ fontWeight: "bold" }}>
                  <h4>Order Number</h4>
                </Col>
              </Row>
              {this.routes.map((route) => (
                <Row
                  key={route.travel_point_id}
                  style={{ marginBottom: "1%", marginLeft: "1%" }}
                >
                  <Col>{route.destination}</Col>
                  <Col>{route.continent}</Col>
                  <Col>{route.estimated_price}</Col>
                  <Col>{route.duration}</Col>
                  <Col>{route.order_number}</Col>
                </Row>
              ))}
            </Card>
            <Button
              onClick={() => this.editRoute()}
              style={{
                marginTop: "2%",
                backgroundColor: "#498eb9",
                width: "15%",
                marginLeft: "85%",
              }}
            >
              Edit route
            </Button>
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
  editRoute() {
    history.push("/editRoute/" + 1);
  }
}
