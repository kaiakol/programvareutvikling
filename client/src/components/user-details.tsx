import * as React from "react";
import { Component } from "react-simplified";
import { NavLink } from "react-router-dom";
import { createHashHistory } from "history";
import {
  Card,
  Row,
  Col,
  Form,
  Alert,
  Button,
  Stack,
  Container,
} from "react-bootstrap";
import userService, { User } from "../user-service";
import { userSession } from "./user-register";

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

export class UserDetails extends Component<{
  match: { params: { user_profile_id: number } };
}> {
  render() {
    return (
      <>
        {console.log(userSession.currentUser.user_profile_id)}
        <Card
          style={{
            // border: 'none',
            padding: "15px",
            textAlign: "center",
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          {/* Page for all relevant user info for logged in user */}
          <Card.Title>
            {"User page for " +
              userSession.currentUser.first_name +
              " " +
              userSession.currentUser.last_name}
          </Card.Title>
          <Row style={{ fontSize: "17px" }}>
            <Card.Text>
              Profile name: {userSession.currentUser.profile_name}
            </Card.Text>
          </Row>
          <Row style={{ fontSize: "17px" }}>
            <Card.Text>
              Your name: {userSession.currentUser.first_name}{" "}
              {userSession.currentUser.last_name}
            </Card.Text>
          </Row>
          <Row style={{ fontSize: "17px" }}>
            <Card.Text>
              Your email-adress: {userSession.currentUser.email}
            </Card.Text>
          </Row>
          <Row>
            <Button
              variant="outline-danger"
              onClick={() => this.logOut()}
              style={{
                width: "15rem",
                marginLeft: "auto",
                marginRight: "auto",
                marginBottom: "10px",
              }}
            >
              Log out
            </Button>
          </Row>
        </Card>
      </>
    );
  }

  mounted() {
    if (!userSession.loggedIn) {
      history.push("/register");
    } else {
      userService
        .logIn(
          userSession.currentUser.email,
          userSession.currentUser.profile_password
        )
        .then(
          (user) => (
            userSession.setCurrentUser(user),
            history.push("/profile/" + userSession.currentUser.user_profile_id)
          )
        )
        .catch((error) => alert(error.message));
    }
  }

  logOut() {
    userSession.setLoggedIn(false);
    history.push("/profile");
    userSession.setCurrentUser({
      user_profile_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      profile_password: "",
      profile_name: "",
    });
  }
  /*
  mounted() {
    if (!loggedIn) {
      history.push('/recipes/login');
    } else {
      recipeService
        .getLikedRecipes(currentUser.user_id)
        .then((recipes) => (this.likedRecipes = recipes))
        .catch((error) => Alert.danger(error.message));
    }
  }

  logOut() {
    loggedIn = false;
    history.push('/recipes');
    currentUser = { user_id: 0, email: '', first_name: '', last_name: '', password: '' };
  }
  */
}
