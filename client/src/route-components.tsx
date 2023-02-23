import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import routeService, { Route } from "./route-service";
import { createHashHistory } from "history";
import { Card, Row, Col, Container, Form, Button } from "react-bootstrap";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

/**
 * Renders route list.
 */
export class RouteList extends Component {
  routes: Route[] = [];

  render() {
    const sortedRoutes = this.routes.sort((a, b) => a.route_id - b.route_id);
    // Render each group on a separate row
    return (
      <>
        <Container>
          <Card.Title>Routes</Card.Title>

          {sortedRoutes.map((route) => (
            <Row key={route.route_id}>
              <Col>
                <NavLink to={"/routes/" + route.route_id}>
                  {route.destination}, {route.route_id}
                </NavLink>
              </Col>
            </Row>
          ))}
        </Container>
      </>
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
        <Container>
          <Card>
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

export class UserLogIn extends Component {
  email: string = "";
  password: string = "";

  render() {
    return (
      <Card
        style={{
          border: "none",
          padding: "15px",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/*Card forms in for log in screen */}
        <Card.Title>Log in</Card.Title>
        <Container
          style={{ width: "20rem", marginLeft: "auto", marginRight: "auto" }}
        >
          <Row>
            <Form.Control
              value={this.email}
              type="text"
              placeholder="Email"
              onChange={(event) => (this.email = event.currentTarget.value)}
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.password}
              type="password"
              placeholder="Password"
              onChange={(event) => (this.password = event.currentTarget.value)}
              // Makes it possible to log in with enter as well as with button
              onKeyUp={(event) => {
                if (event.key == "Enter") {
                  this.logIn();
                }
              }}
              style={{
                textAlign: "center",
                marginBottom: "10px",
              }}
            ></Form.Control>
          </Row>
        </Container>
        {/*Card for buttons in login screen before user is identified or registered */}
        <Container
          style={{ width: "15rem", marginLeft: "auto", marginRight: "auto" }}
        >
          <Row>
            <Button
              // variant="success"
              onClick={() => this.logIn()}
              style={{
                marginBottom: "10px",
                backgroundColor: "#53aca8",
              }}
            >
              Log in
            </Button>
          </Row>
          <Row>
            <Button
              // variant="outline-success"
              onClick={() => this.createUser()}
              style={{
                marginBottom: "10px",
                backgroundColor: "#53aca8",
              }}
            >
              No user? Create one here
            </Button>
          </Row>
          <Row>
            <Button
              onClick={() => this.clearInput()}
              style={{
                marginBottom: "10px",
                backgroundColor: "#53aca8",
              }}
            >
              Clear input
            </Button>
          </Row>
        </Container>
      </Card>
    );
  }

  logIn() {
    if (this.email.length != 0 && this.password.length != 0) {
      userService
        .logIn(this.email, this.password)
        .then((user) => {
          currentUser = user;
          loggedIn = true;
          Alert.success("Logged in as " + currentUser.email);
          history.push("/recipes/user");
        })
        .catch((error) => Alert.danger(error.response.data));
    } else {
      Alert.danger("Please fill in all the fields");
    }
  }

  clearInput() {
    this.email = "";
    this.password = "";
  }

  createUser() {
    history.push("/profile/register");
  }
}

export class RegisterUser extends Component {
  user: User = {
    user_id: 0,
    email: "",
    first_name: "",
    last_name: "",
    password: "",
  };
  confirm_password: string = "";

  render() {
    return (
      <Card
        style={{
          border: "none",
          padding: "15px",
          textAlign: "center",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        {/* Card creating forms related to creating new user */}
        <Card.Title>Create user</Card.Title>
        <Container
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "20rem",
          }}
        >
          <Row>
            <Form.Control
              value={this.user.email}
              type="text"
              placeholder="Email"
              onChange={(event) =>
                (this.user.email = event.currentTarget.value)
              }
              style={{
                marginBottom: "10px",
                textAlign: "center",
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.user.first_name}
              type="text"
              placeholder="First name"
              onChange={(event) =>
                (this.user.first_name = event.currentTarget.value)
              }
              style={{
                marginBottom: "10px",
                textAlign: "center",
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.user.last_name}
              type="text"
              placeholder="Last name"
              onChange={(event) =>
                (this.user.last_name = event.currentTarget.value)
              }
              style={{
                marginBottom: "10px",
                textAlign: "center",
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.user.password}
              type="password"
              placeholder="Password"
              onChange={(event) =>
                (this.user.password = event.currentTarget.value)
              }
              // Makes it possible to log in with enter as well as with button
              onKeyUp={(event) => {
                if (event.key == "Enter") {
                  this.createUser();
                }
              }}
              style={{
                marginBottom: "10px",
                textAlign: "center",
              }}
            ></Form.Control>
          </Row>
          <Row>
            <Form.Control
              value={this.confirm_password}
              type="password"
              placeholder="Confirm password"
              onChange={(event) =>
                (this.confirm_password = event.currentTarget.value)
              }
              onKeyUp={(event) => {
                if (event.key == "Enter") {
                  this.createUser();
                }
              }}
              style={{
                marginBottom: "10px",
                textAlign: "center",
              }}
            ></Form.Control>
          </Row>
        </Container>
        {/* Buttons for creating user and clearing input */}
        <Container
          style={{ width: "15rem", marginLeft: "auto", marginRight: "auto" }}
        >
          <Row>
            <Button
              // variant="success"
              onClick={() => this.createUser()}
              style={{
                marginBottom: "10px",
                backgroundColor: "#53aca8",
              }}
            >
              Create user
            </Button>
          </Row>
          <Row>
            <Button
              variant="outline-secondary"
              onClick={() => this.clearInput()}
              style={{
                marginBottom: "10px",
              }}
            >
              Clear input
            </Button>
          </Row>
        </Container>
      </Card>
    );
  }

  createUser() {
    userService
      .createUser(
        this.user.email,
        this.user.first_name,
        this.user.last_name,
        this.user.password,
        this.confirm_password
      )
      .then((response) => {
        if (response.length > 0) {
          Alert.danger(response);
        } else {
          Alert.success("User created, please log in");
          loggedIn = true;
          history.push("/recipes/login");
        }
      })
      .catch((error) => Alert.danger(error.response.data));
  }

  clearInput() {
    this.user = {
      user_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      password: "",
    };
    this.confirm_password = "";
  }
}
