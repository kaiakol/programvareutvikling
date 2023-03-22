import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import { HashRouter, Route } from "react-router-dom";

import { Card, Nav, Navbar, Container, Button } from "react-bootstrap";
import { RouteDetails } from "./components/route-details";
import { EditRoute } from "./components/editRoute";
import { RouteList } from "./components/route-list";
import { NewRoute } from "./components/route-new";
import ToggleColorMode from "./theme";
import { useTheme } from "@mui/material/styles";
import { UserLogIn } from "./components/user-login";
import { RegisterUser } from "./components/user-register";
import { UserDetails } from "./components/user-details";

class Menu extends Component {
  render() {
    return (
      <Navbar
        expand="lg"
        style={{
          borderBottom: "2px solid #808080",
          width: "100%",
          margin: "0px",
        }}
      >
        <Container>
          <Navbar.Brand href="#home">
            <img
              src="https://tihldestorage.blob.core.windows.net/imagepng/d1aea6d8-00cb-4045-976d-054c8b82214aimg.png"
              width="100px"
              height="60px"
              className="d-inline-block align-bottom"
              alt="React Bootstrap logo"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" style={{ color: "#808080" }}>
            <Nav className="me-auto">
              {/* <Nav.Link href="#/routes">Explore</Nav.Link> */}
              {/* <Nav.Link href="#link">My Travels</Nav.Link> */}

              <Nav.Link href="#newRoute" style={{ color: "#999999" }}>
                New route
              </Nav.Link>
              <Nav.Link href="#/profile" style={{ color: "#999999" }}>
                My Profile
              </Nav.Link>
            </Nav>
            <Nav></Nav>
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
      {/* <Route exact path="/routes" component={RouteList} /> */}
      <Route exact path="/home" component={RouteList} />
      <Route exact path="/routes/:route_id" component={RouteDetails} />
      <Route exact path="/editRoute/:route_id" component={EditRoute} />
      <Route exact path="/profile" component={UserLogIn} />
      <Route exact path="/register" component={RegisterUser} />
      <Route exact path="/newRoute" component={NewRoute} />
      <Route exact path="/profile/:user_profile_id" component={UserDetails} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
