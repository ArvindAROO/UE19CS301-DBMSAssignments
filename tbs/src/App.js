import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Selection from "./Selection";

// import Cashier from "./Cashier";
import Theatre from "./Theatre";
import User from "./User";

import SignTheatre from "./TheatreSign"
import SignUser from "./UserSign";

import UserDash from "./UserDash";



class App extends React.Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Selection} />

        <Route path="/user" component={User} />
        <Route path="/signup/user" component={SignUser} />
        <Route path='/dashboard/user' component={UserDash}/>

        {/* <Route path="/cashier" component={Cashier} />
        <Route path="/signup/cashier" component={User} /> */}

        <Route path="/theatre" component={Theatre} />
        <Route path="/signup/theatre" component={SignTheatre} />
      </Router>
    );
  }
}

export default App;
