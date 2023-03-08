import React from "react";
import { Container, Card, Row, Col } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import { BsArrowRight } from "react-icons/bs";
import routeService, {
  Route,
  RouteWithAllInformation,
  Route_travel_point,
} from "../route-service";

const history = createHashHistory();

export class RouteList extends Component {
  routes: Route[] = [];
  route_travel_points: Route_travel_point[] = [];

  render() {
    return (
      <>
        {/* {console.log(this.route_travel_points)} */}
        <Container>
          <Col lg>
            <Row xs={1} md={2} className="g-2">
              {this.routes.map((route) => (
                <NavLink
                  to={"/routes/" + route.route_id}
                  style={{
                    color: "#9FC1C0",
                  }}
                >
                  <Col>
                    <Card
                      style={{
                        width: "100%",
                        margin: "1%",
                        textAlign: "center",
                        borderLeft: "none",
                        borderRight: "none",
                        borderTop: "none",
                        borderRadius: "none",
                        height: "100%",
                      }}
                    >
                      <Card.Body>
                        <Card.Img
                          variant="top"
                          src="https://freepngimg.com/save/168111-travel-icon-free-png-hq/3206x3494"
                          style={{ width: "40%" }}
                        />
                        <Card.Title style={{ color: "rgb(82, 130, 101)" }}>
                          {route.route_name}
                        </Card.Title>
                        <Row>
                          {this.route_travel_points
                            .filter((rtp) => rtp.route_id === route.route_id)
                            .map((rtp) => (
                              <Col key={rtp.route_id}>
                                {rtp.destination} <BsArrowRight />
                              </Col>
                            ))}
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </NavLink>
              ))}
            </Row>
            ;
          </Col>
        </Container>
      </>
    );
  }

  mounted() {
    routeService
      .getAllRoutes()
      .then((routes) => {
        this.routes = routes;
        const routeTravelPointsPromise = routes.map((route) =>
          routeService.getRouteTravelPoints(route.route_id)
        );
        return Promise.all(routeTravelPointsPromise);
      })
      .then((routeTravelPoints) => {
        //Denne slår sammen alle individuelle arrayer av routeTravelPoints inn til én
        //stor, sammenslått array over alle travelpoints som vi etterfølgende er i stand til å filtere baser på
        //route_id og deretter mappe
        this.route_travel_points = routeTravelPoints.flat();
      })
      .catch((error: { message: string }) =>
        alert("Error getting route: " + error.message)
      );
  }
}
