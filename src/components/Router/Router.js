import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

//pull in other components for SPA
import Header from "../Header/Header.js";
import Holder from "../Holder/Holder.js";

class Router extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="container">

          <Header />
          <Switch>
            <Route exact path="/" component={Holder} />
            <Route
              render={function() {
                return <p> Page not found. Sorry! </p>;
              }}
            />
          </Switch>

        </div>
      </BrowserRouter>
    );
  }
}

module.exports = Router;
