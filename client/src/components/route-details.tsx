import React from "react";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService, { Route_travel_point, Route } from "../route-service";

const history = createHashHistory();

export class RouteDetails extends Component<{
  match: { params: { route_id: number } };
}> {
  //   routes: RouteWithAllInformation[] = [];

  //   render() {
  //     return (
  //       <>
  //         <Container
  //           style={{
  //             position: "absolute",
  //             marginLeft: "10%",
  //             marginRight: "10%",
  //             height: "100%",
  //             width: "80%",
  //             backgroundColor: "#53aca8",
  //           }}
  //         >
  //           <Container>
  //             <h1 style={{ textAlign: "center", marginBottom: "30px" }}>Route</h1>
  //             <Card>
  //               <Row style={{ marginBottom: "20px" }}>
  //                 <Col style={{ fontWeight: "bold" }}>Stops</Col>
  //                 <Col style={{ fontWeight: "bold" }}>Continent</Col>
  //                 <Col style={{ fontWeight: "bold" }}>Estimated Price</Col>
  //                 <Col style={{ fontWeight: "bold" }}>Duration</Col>
  //                 <Col style={{ fontWeight: "bold" }}>Order Number</Col>
  //               </Row>
  //               {this.routes.map((route) => (
  //                 <Row
  //                   key={route.travel_point_id}
  //                   style={{ marginBottom: "20px" }}
  //                 >
  //                   <Col>{route.destination}</Col>
  //                   <Col>{route.continent}</Col>
  //                   <Col>{route.estimated_price}</Col>
  //                   <Col>{route.duration}</Col>
  //                   <Col>{route.order_number}</Col>
  //                 </Row>
  //               ))}
  //             </Card>
  //           </Container>
  //         </Container>
  //       </>
  //     );
  //   }

  route: Route = {
    route_id: 0,
    route_name: "",
    duration: "",
    estimated_price: "",
    description: "",
  };
  route_travel_points: Route_travel_point[] = [];

  render() {
    return (
      <>
        <Card style={{ width: "80%", marginLeft: "10%" }}>
          <Row>
            <Col style={{ marginLeft: "20px" }}>
              <h2>Destinations</h2>

              {this.route_travel_points.map((route_travel_point) => (
                <Row key={route_travel_point.route_id}>
                  {route_travel_point.order_number}{" "}
                  {route_travel_point.destination}
                </Row>
              ))}
            </Col>
            <Col>
              <h2>Route Information</h2>
              <Row>{this.route.description}</Row>
              <Row>{this.route.estimated_price}</Row>
              <Row>{this.route.duration}</Row>
            </Col>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    routeService
      .getRoute(this.props.match.params.route_id)
      //@ts-ignore
      .then((route) => ((this.route = route), console.log(route)))
      .catch((error) => alert(error.response.data));

    routeService
      .getRouteTravelPoints(this.props.match.params.route_id)
      .then((route_travel_points) => {
        this.route_travel_points = route_travel_points;
        //Her sorteres travelpointsene i kronologisk rekkefølge basert på
        //order_number slik at dette printes riktig når disse mappes
        this.route_travel_points.sort(
          (a, b) => a.order_number - b.order_number
        );
      })
      .catch((error) => alert(error.response.data));
  }
  editRoute() {
    history.push("/editRoute/" + 1);
  }
}
