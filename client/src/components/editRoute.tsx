import React from "react";
import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
import { Component } from "react-simplified";
import { createHashHistory } from "history";
import routeService, { Route_travel_point, Route } from "../route-service";

const history = createHashHistory();

export class EditRoute extends Component<{
  match: { params: { route_id: number } };
}> {
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
            <Col style={{ marginLeft: "2%" }}>
              <h2 style={{ marginLeft: "-2%" }}>Destinations</h2>

              {this.route_travel_points.map((route_travel_point) => (
                <Row key={route_travel_point.route_id}>
                  {route_travel_point.order_number}.{" "}
                  <Col>
                    <Form>
                      <Form.Group
                        className="destination"
                        controlId="destination"
                      >
                        <Form.Control
                          type=""
                          placeholder={route_travel_point.destination}
                        />
                      </Form.Group>
                    </Form>
                  </Col>
                  <Col>
                    <Form.Select
                      style={{
                        width: "70%",
                        marginBottom: "2.5%",
                      }}
                      value={route_travel_point.continent}
                      onChange={(event) =>
                        (route_travel_point.continent =
                          event.currentTarget.value)
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
                </Row>
              ))}
            </Col>
            <Col>
              <h2>Route Information</h2>
              <Row>
                <Col xs lg="3">
                  <h6>Description:</h6>{" "}
                </Col>
                <Col>
                  <Form
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                    }}
                  >
                    <Form.Group
                      className="name"
                      controlId="route name"
                      style={{ marginTop: "-5%" }}
                    >
                      <Form.Control
                        type=""
                        placeholder={this.route.description}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col xs lg="3">
                  <h6>Price:</h6>
                </Col>
                <Col>
                  <Form
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                    }}
                  >
                    <Form.Group
                      className="name"
                      controlId="route name"
                      style={{ marginTop: "-5%" }}
                    >
                      <Form.Control
                        type=""
                        placeholder={this.route.estimated_price}
                      />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
              <Row>
                <Col xs lg="3">
                  <h6>Duration:</h6>
                </Col>
                <Col>
                  <Form
                    style={{
                      marginTop: "5%",
                      marginBottom: "5%",
                    }}
                  >
                    <Form.Group
                      className="name"
                      controlId="route name"
                      style={{ marginTop: "-5%" }}
                    >
                      <Form.Control type="" placeholder={this.route.duration} />
                    </Form.Group>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
        <Row>
          <Col>
            <Button
              variant="danger"
              onClick={() => this.save()}
              style={{
                marginTop: "1%",
                marginLeft: "20%",
                width: "20%",
                //backgroundColor: "#53aca8",
              }}
            >
              Delete
            </Button>
          </Col>

          <Col>
            <Button
              onClick={() => this.goBack()}
              style={{
                marginTop: "1%",
                marginLeft: "38%",
                width: "20%",
                backgroundColor: "#53aca8",
              }}
            >
              Go back
            </Button>

            <Button
              onClick={() => this.save()}
              style={{
                marginTop: "1%",
                marginLeft: "2%",
                width: "20%",
                backgroundColor: "#53aca8",
              }}
            >
              Save
            </Button>
          </Col>
        </Row>
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
  save() {
    history.push("/home/");
  }

  delete() {
    history.push("/home/");
  }

  goBack() {
    history.push("/routes/" + this.route.route_id);
  }
}

// import React from "react";
// import { Container, Card, Row, Col, Button, Form } from "react-bootstrap";
// import { Component } from "react-simplified";
// import { createHashHistory } from "history";
// import routeService, { Route } from "./route-service";

// const history = createHashHistory();

// export class EditRoute extends Component<{
//   match: { params: { route_id: number } };
// }> {
//   routes: Route[] = [];

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
//             <h1 style={{ textAlign: "center" }}>Edit route</h1>
//             <h1
//               style={{
//                 width: "30%",
//                 margin: "0 auto",
//               }}
//             >
// <Form
//   style={{
//     marginTop: "5%",
//     marginBottom: "5%",
//   }}
// >
//   <Form.Group className="name" controlId="route name">
//     <Form.Control type="" placeholder="Route name" />
//   </Form.Group>
// </Form>
//             </h1>

//             <Card>
//               <Row style={{ marginBottom: "1%", marginLeft: "1%" }}>
//                 <Col style={{ fontWeight: "bold" }}>
//                   <h4>Stops</h4>
//                 </Col>
//                 <Col style={{ fontWeight: "bold" }}>
//                   <h4>Continent</h4>
//                 </Col>
//                 <Col style={{ fontWeight: "bold" }}>
//                   <h4>Estimated Price</h4>
//                 </Col>
//                 <Col style={{ fontWeight: "bold" }}>
//                   <h4>Duration</h4>
//                 </Col>
//                 <Col style={{ fontWeight: "bold" }}>
//                   <h4>Order Number</h4>
//                 </Col>
//               </Row>
//               {this.routes.map((route) => (
//                 <Row
//                   key={route.travel_point_id}
//                   style={{ marginBottom: "1%", marginLeft: "1%" }}
//                 >
//                   <Col>
// <Form>
//   <Form.Group
//     className="destination"
//     controlId="destination"
//   >
//     <Form.Control type="" placeholder={route.destination} />
//   </Form.Group>
// </Form>
//                   </Col>
//                   <Col>
// <Form.Select
//   style={{ width: "70%", height: "47px" }}
//   value={route.continent}
//   onChange={(event) =>
//     (route.continent = event.currentTarget.value)
//   }
// >
//   <option value="Africa">Africa</option>
//   <option value="Antarctica">Antarctica</option>
//   <option value="Asia">Asia</option>
//   <option value="Australia">Australia</option>
//   <option value="Europe">Europe</option>
//   <option value="North America">North America</option>
//   <option value="South America">South America</option>
// </Form.Select>
//                   </Col>
//                   <Col>
//                     <Form style={{ width: "50%" }}>
//                       <Form.Group className="price" controlId="price">
//                         <Form.Control
//                           type=""
//                           placeholder={route.estimated_price}
//                         />
//                       </Form.Group>
//                     </Form>
//                   </Col>
//                   <Col>
//                     {" "}
//                     <Form style={{ width: "50%" }}>
//                       <Form.Group className="duration" controlId="duration">
//                         <Form.Control type="" placeholder={route.duration} />
//                       </Form.Group>
//                     </Form>
//                   </Col>
//                   <Col>{route.order_number}</Col>
//                 </Row>
//               ))}
//             </Card>
//             <Button
//               variant="danger"
//               onClick={() => this.save()}
//               style={{
//                 marginTop: "2%",
//                 // backgroundColor: "#53aca8",
//                 marginRight: "85%",
//                 width: "15%",
//               }}
//             >
//               Delete
//             </Button>
//             <Button
//               onClick={() => this.goBack()}
//               style={{
//                 marginTop: "-5%",
//                 backgroundColor: "#498eb9",
//                 marginLeft: "67%",
//                 width: "15%",
//               }}
//             >
//               Go back
//             </Button>
//             <Button
//               onClick={() => this.delete()}
//               style={{
//                 marginTop: "-9%",
//                 backgroundColor: "#498eb9",
//                 marginLeft: "85%",
//                 width: "15%",
//               }}
//             >
//               Save
//             </Button>
//           </Container>
//         </Container>
//       </>
//     );
//   }
//   mounted() {
//     routeService
//       .getRoute(this.props.match.params.route_id)
//       //@ts-ignore
//       .then((routes) => (this.routes = routes))
//       .catch((error) => alert(error.response.data));
//   }
//   save() {
//     history.push("/routes");
//   }
//   goBack() {
//     history.push("/routes");
//   }
//   delete() {
//     history.push("/routes");
//   }
// }
