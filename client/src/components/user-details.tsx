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

const history = createHashHistory(); // Use history.push(...) to programmatically change path, for instance after successfully saving a student

//false as default
export let loggedIn: boolean = false;
export let currentUser: User = {
  user_profile_id: 0,
  email: "",
  first_name: "",
  last_name: "",
  profile_password: "",
  profile_name: "",
};

// export class UserLogIn extends Component {
//   email: string = "";
//   password: string = "";

//   render() {
//     if (!loggedIn) {
//       return (
//         <Card
//           style={{
//             border: "none",
//             padding: "15px",
//             textAlign: "center",
//             marginLeft: "auto",
//             marginRight: "auto",
//           }}
//         >
//           {/*Card forms in for log in screen */}
//           <Card.Title>Log in</Card.Title>
//           <Container
//             style={{ width: "20rem", marginLeft: "auto", marginRight: "auto" }}
//           >
//             <Row>
//               <Form.Control
//                 value={this.email}
//                 type="text"
//                 placeholder="Email"
//                 onChange={(event) => (this.email = event.currentTarget.value)}
//                 style={{
//                   textAlign: "center",
//                   marginBottom: "10px",
//                 }}
//               ></Form.Control>
//             </Row>
//             <Row>
//               <Form.Control
//                 value={this.password}
//                 type="password"
//                 placeholder="Password"
//                 onChange={(event) =>
//                   (this.password = event.currentTarget.value)
//                 }
//                 // Makes it possible to log in with enter as well as with button
//                 onKeyUp={(event) => {
//                   if (event.key == "Enter") {
//                     this.logIn();
//                   }
//                 }}
//                 style={{
//                   textAlign: "center",
//                   marginBottom: "10px",
//                 }}
//               ></Form.Control>
//             </Row>
//           </Container>
//           {/*Card for buttons in login screen before user is identified or registered */}
//           <Container
//             style={{ width: "15rem", marginLeft: "auto", marginRight: "auto" }}
//           >
//             <Row>
//               <Button
//                 // variant="success"
//                 onClick={() => this.logIn()}
//                 style={{
//                   marginBottom: "10px",
//                   backgroundColor: "#53aca8",
//                 }}
//               >
//                 Log in
//               </Button>
//             </Row>
//             <Row>
//               <Button
//                 // variant="outline-success"
//                 onClick={() => this.createUser()}
//                 style={{
//                   marginBottom: "10px",
//                   backgroundColor: "#53aca8",
//                 }}
//               >
//                 No user? Create one here
//               </Button>
//             </Row>
//             <Row>
//               <Button
//                 onClick={() => this.clearInput()}
//                 style={{
//                   marginBottom: "10px",
//                   backgroundColor: "#53aca8",
//                 }}
//               >
//                 Clear input
//               </Button>
//             </Row>
//           </Container>
//         </Card>
//       );
//     } else {
//       userService
//         .logIn(currentUser.email, currentUser.profile_password)
//         .then(
//           (user) => (
//             (currentUser = user),
//             history.push("/profile/ " + currentUser.user_profile_id)
//           )
//         )
//         .catch((error) => alert(error.message));
//       return currentUser.user_profile_id;
//     }
//   }

//   /*mounted() {
//     if (!loggedIn) {
//       history.push("/profile");
//     } else {
//       userService
//         .logIn(currentUser.email, currentUser.profile_password)
//         .then(
//           (user) => (
//             (currentUser = user),
//             history.push("/profile/ " + currentUser.user_profile_id)
//           )
//         )
//         .catch((error) => alert(error.message));
//     }
//   }
//   */

//   logIn() {
//     if (this.email.length != 0 && this.password.length != 0) {
//       userService
//         .logIn(this.email, this.password)
//         .then((user) => {
//           currentUser = user;
//           loggedIn = true;
//           alert("Logged in as " + currentUser.email);
//           history.push("/profile/" + currentUser.user_profile_id);
//         })
//         .catch((error) => alert(error.response.data));
//     } else {
//       alert("Please fill in all the fields");
//     }
//   }

//   clearInput() {
//     this.email = "";
//     this.password = "";
//   }

//   createUser() {
//     history.push("/profile/register");
//   }
// }

// export class RegisterUser extends Component {
//   user: User = {
//     user_profile_id: 0,
//     email: "",
//     first_name: "",
//     last_name: "",
//     profile_password: "",
//     profile_name: "",
//   };

//   render() {
//     return (
//       <Card
//         style={{
//           border: "none",
//           padding: "15px",
//           textAlign: "center",
//           marginLeft: "auto",
//           marginRight: "auto",
//         }}
//       >
//         {/* Card creating forms related to creating new user */}
//         <Card.Title>Create user</Card.Title>
//         <Container
//           style={{
//             marginLeft: "auto",
//             marginRight: "auto",
//             width: "20rem",
//           }}
//         >
//           <Row>
//             <Form.Control
//               value={this.user.profile_name}
//               type="text"
//               placeholder="Profile Name"
//               onChange={(event) =>
//                 (this.user.profile_name = event.currentTarget.value)
//               }
//               style={{
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             ></Form.Control>
//           </Row>
//           <Row>
//             <Form.Control
//               value={this.user.email}
//               type="text"
//               placeholder="Email"
//               onChange={(event) =>
//                 (this.user.email = event.currentTarget.value)
//               }
//               style={{
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             ></Form.Control>
//           </Row>
//           <Row>
//             <Form.Control
//               value={this.user.first_name}
//               type="text"
//               placeholder="First name"
//               onChange={(event) =>
//                 (this.user.first_name = event.currentTarget.value)
//               }
//               style={{
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             ></Form.Control>
//           </Row>
//           <Row>
//             <Form.Control
//               value={this.user.last_name}
//               type="text"
//               placeholder="Last name"
//               onChange={(event) =>
//                 (this.user.last_name = event.currentTarget.value)
//               }
//               style={{
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             ></Form.Control>
//           </Row>
//           <Row>
//             <Form.Control
//               value={this.user.profile_password}
//               type="password"
//               placeholder="Password"
//               onChange={(event) =>
//                 (this.user.profile_password = event.currentTarget.value)
//               }
//               // Makes it possible to log in with enter as well as with button
//               onKeyUp={(event) => {
//                 if (event.key == "Enter") {
//                   this.createUser();
//                 }
//               }}
//               style={{
//                 marginBottom: "10px",
//                 textAlign: "center",
//               }}
//             ></Form.Control>
//           </Row>
//         </Container>
//         {/* Buttons for creating user and clearing input */}
//         <Container
//           style={{ width: "15rem", marginLeft: "auto", marginRight: "auto" }}
//         >
//           <Row>
//             <Button
//               // variant="success"
//               onClick={() => this.createUser()}
//               style={{
//                 marginBottom: "10px",
//                 backgroundColor: "#53aca8",
//               }}
//             >
//               Create user
//             </Button>
//           </Row>
//           <Row>
//             <Button
//               variant="outline-secondary"
//               onClick={() => this.clearInput()}
//               style={{
//                 marginBottom: "10px",
//               }}
//             >
//               Clear input
//             </Button>
//           </Row>
//         </Container>
//       </Card>
//     );
//   }

//   createUser() {
//     userService
//       .createUser(
//         this.user.profile_name,
//         this.user.profile_password,
//         this.user.first_name,
//         this.user.last_name,
//         this.user.email
//       )
//       .then((response) => {
//         if (response.length > 0) {
//           alert(response);
//         } else {
//           alert("User created, please log in");
//           loggedIn = true;
//           history.push("/profile");
//         }
//       })
//       .catch((error) => alert(error.response.data));
//   }

//   clearInput() {
//     this.user = {
//       user_profile_id: 0,
//       email: "",
//       first_name: "",
//       last_name: "",
//       profile_password: "",
//       profile_name: "",
//     };
//   }
// }

export class UserDetails extends Component<{
  match: { params: { user_profile_id: number } };
}> {
  // likedRecipes: Recipe[] = [];
  render() {
    return (
      <>
        {console.log(currentUser.user_profile_id)}
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
              currentUser.first_name +
              " " +
              currentUser.last_name}
          </Card.Title>
          <Row style={{ fontSize: "17px" }}>
            <Card.Text>Profile name: {currentUser.profile_name}</Card.Text>
          </Row>
          <Row style={{ fontSize: "17px" }}>
            <Card.Text>
              Your name: {currentUser.first_name} {currentUser.last_name}
            </Card.Text>
          </Row>
          <Row style={{ fontSize: "17px" }}>
            <Card.Text>Your email-adress: {currentUser.email}</Card.Text>
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
    if (!loggedIn) {
      history.push("/register");
    } else {
      userService
        .logIn(currentUser.email, currentUser.profile_password)
        .then(
          (user) => (
            (currentUser = user),
            history.push("/profile/ " + currentUser.user_profile_id)
          )
        )
        .catch((error) => alert(error.message));
    }
  }

  logOut() {
    loggedIn = false;
    history.push("/profile");
    currentUser = {
      user_profile_id: 0,
      email: "",
      first_name: "",
      last_name: "",
      profile_password: "",
      profile_name: "",
    };
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
