import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Selection from "./Selection";
import User from "./User";
import Cashier from "./Cashier";
import Theatre from "./Theatre";

class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Selection} />
        <Route path="/user" component={User} />
        <Route path="/cashier" component={Cashier} />
        <Route path="/theatre" component={Theatre} />
      </Router>
    );
  }
}

export default App;
