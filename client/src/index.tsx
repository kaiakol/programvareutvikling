import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import { HashRouter, Route } from "react-router-dom";
import {
  NewRoute,
  NewRoute,
  RouteDetails,
  RouteList,
  RegisterUser,
  UserLogIn,
} from "./route-components";
import { Card, Nav, Navbar, Container } from "react-bootstrap";

class Menu extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#/routes">BackTrack</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#/routes">Explore</Nav.Link>
              <Nav.Link href="#link">My Travels</Nav.Link>
              <Nav.Link href="#/profile">My Profile</Nav.Link>
              <Nav.Link href="#newRoute">New route</Nav.Link>
              <Nav.Link href="#newRoute">New route</Nav.Link>
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
      <Route exact path="/profile" component={UserLogIn} />
      <Route exact path="/profile/register" component={RegisterUser} />
      <Route exact path="/newRoute" component={NewRoute} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
