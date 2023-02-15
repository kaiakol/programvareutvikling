import ReactDOM from "react-dom";
import * as React from "react";
import { Component } from "react-simplified";
import { HashRouter, Route } from "react-router-dom";
import { RouteList } from "./route-components";
import { Card } from "react-bootstrap";

class Menu extends Component {
  render() {
    return <Card>Velkommen</Card>;
  }
}

class Home extends Component {
  render() {
    return <Card>Hei</Card>;
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Route exact path="/routes" component={RouteList} />
    </div>
  </HashRouter>,
  document.getElementById("root")
);
