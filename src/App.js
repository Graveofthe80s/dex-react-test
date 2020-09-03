import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthRoute from "./AuthRoute";
import Login from "./pages/Login";
import List from "./pages/List";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <AuthRoute exact path="/foods" component={List} />
          <AuthRoute exact path="/people" component={List} />
          <AuthRoute exact path="/places" component={List} />
        </Switch>
      </Router>
    );
  }
}

export default App;
