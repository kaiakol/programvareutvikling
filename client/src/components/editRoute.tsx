import React from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService, { RouteWithAllInformation } from "./route-service";

const history = createHashHistory();

export class EditRoute extends Component<{
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
            <h1 style={{ textAlign: "center" }}>Edit route</h1>
            <h1
              style={{
                width: "30%",
                margin: "0 auto",
              }}
            >
              <Form
                style={{
                  marginTop: "5%",
                  marginBottom: "5%",
                }}
              >
                <Form.Group className="name" controlId="route name">
                  <Form.Control type="" placeholder="Route name" />
                </Form.Group>
              </Form>
            </h1>

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
                  <Col>
                    <Form>
                      <Form.Group
                        className="destination"
                        controlId="destination"
                      >
                        <Form.Control type="" placeholder={route.destination} />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <Form.Select
                      style={{ width: "70%", height: "47px" }}
                      value={route.continent}
                      onChange={(event) =>
                        (route.continent = event.currentTarget.value)
                      }
                    >
                      <option value="Africa">Africa</option>
                      <option value="Antarctica">Antarctica</option>
                      <option value="Asia">Asia</option>
                      <option value="Australia">Australia</option>
                      <option value="Europe">Europe</option>
                      <option value="North America">North America</option>
                      <option value="South America">South America</option>
                    </Form.Select>
                  </Col>
                  <Col>
                    <Form style={{ width: "50%" }}>
                      <Form.Group className="price" controlId="price">
                        <Form.Control
                          type=""
                          placeholder={route.estimated_price}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    {" "}
                    <Form style={{ width: "50%" }}>
                      <Form.Group className="duration" controlId="duration">
                        <Form.Control type="" placeholder={route.duration} />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>{route.order_number}</Col>
                </Row>
              ))}
            </Card>
            <Button
              variant="danger"
              onClick={() => this.save()}
              style={{
                marginTop: "2%",
                // backgroundColor: "#53aca8",
                marginRight: "85%",
                width: "15%",
              }}
            >
              Delete
            </Button>
            <Button
              onClick={() => this.goBack()}
              style={{
                marginTop: "-5%",
                backgroundColor: "#498eb9",
                marginLeft: "67%",
                width: "15%",
              }}
            >
              Go back
            </Button>
            <Button
              onClick={() => this.delete()}
              style={{
                marginTop: "-9%",
                backgroundColor: "#498eb9",
                marginLeft: "85%",
                width: "15%",
              }}
            >
              Save
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
  save() {
    history.push("/routes");
  }
  goBack() {
    history.push("/routes");
  }
  delete() {
    history.push("/routes");
  }
}
