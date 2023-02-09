import ReactDOM from 'react-dom';
import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route } from 'react-router-dom';
import {  } from './route-components';

class Menu extends Component {
  render() {
    return (
      // Navbar her
    );
  }
}

class Home extends Component {
  render() {
    return // velkommen-kort her
  }
}

ReactDOM.render(
  <HashRouter>
    <div>
      <Alert />
      <Menu />
      <Route exact path="/" component={Home} />
      <Route exact path="/XXX" component={XXXList} />
      <Route exact path="/XXX/:id(\d+)" component={XXXDetails} /> {/* id must be number */}
      <Route exact path="/XXX/:id(\d+)/edit" component={XXXEdit} /> {/* id must be number */}
      <Route exact path="/XXX/new" component={XXXNew} />
    </div>
  </HashRouter>,
  document.getElementById('root')
);
