import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import { HashRouter, Route } from "react-router-dom";
import { RouteDetails, RouteList } from "./route-components";
import { Card, Nav, Navbar, Container } from "react-bootstrap";

class Menu extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">
            {" "}
            <img src="./IMG_0112.JPG" alt="BackTrack" />{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/routes">Explore</Nav.Link>
              <Nav.Link href="#link">My Travels</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
}

/*class Home extends Component {
  render() {
    return <Card>Hei</Card>;
  }
}*/

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/routes" component={RouteList} />
      <Route exact path="/routes/:route_id" component={RouteDetails} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
