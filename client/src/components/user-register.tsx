import React from "react";
import { Card, Container, Row, Form, Button, Alert } from "react-bootstrap";
import { createHashHistory } from "history";
import { Component } from "react-simplified";

const history = createHashHistory();

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
