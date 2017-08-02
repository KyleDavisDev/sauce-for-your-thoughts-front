import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Auth from "../../helper/Auth/Auth.js";

//pull in other components for SPA
import Header from "../Header/Header.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";
import Holder from "../Holder/Holder.js";
import Add from "../Add/Add.js";
import Stores from "../Stores/Stores.js";
import StoreGet from "../Store/StoreGet.js";
import StoreEdit from "../Store/StoreEdit.js";
import Tags from "../Tags/Tags.js";
import Register from "../Register/Register.js";
import Login from "../Login/Login.js";
import Account from "../Account/Account.js";
import ResetPassword from "../ResetPassword/ResetPassword.js";

class Router extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isUserLoggedIn: Auth.isUserAuthenticated(),
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    };

    this.logUserIn = this.logUserIn.bind(this);
    this.logUserOut = this.logUserOut.bind(this);
    this.createFlashMessage = this.createFlashMessage.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  render() {
    return (
      <BrowserRouter>
        <div className="container">
          <Header
            isUserLoggedIn={this.state.isUserLoggedIn}
            handleLogout={this.logUserOut}
          />
          {this.state.flashMessage.isVisible &&
            <FlashMessage
              type={this.state.flashMessage.type}
              text={this.state.flashMessage.text}
              slug={this.state.flashMessage.slug}
              closeFlashMessage={this.closeFlashMessage}
            />}
          <Switch>
            <Route exact path="/" component={Holder} />
            <Route
              exact
              path="/add"
              render={() =>
                Auth.isUserAuthenticated()
                  ? <Add createFlashMessage={this.createFlashMessage} />
                  : <Redirect to="/login" />}
            />
            <Route exact path="/stores" component={Stores} />
            <Route exact path="/store/:slug" component={StoreGet} />
            <Route
              exact
              path="/store/:id/edit"
              render={props =>
                Auth.isUserAuthenticated()
                  ? <StoreEdit
                      id={props.match.params.id}
                      createFlashMessage={this.createFlashMessage}
                    />
                  : <Redirect to="/login" />}
            />
            <Route exact path="/tags" component={Tags} />
            <Route exact path="/tags/:tag" component={Tags} />
            <Route
              exact
              path="/register"
              render={() =>
                <Register
                  logUserIn={this.logUserIn}
                  createFlashMessage={this.createFlashMessage}
                />}
            />
            <Route
              exact
              path="/account"
              render={() =>
                Auth.isUserAuthenticated()
                  ? <Account createFlashMessage={this.createFlashMessage} />
                  : <Redirect to="/login" />}
            />

            <Route
              exact
              path="/account/reset/:token"
              render={props =>
                Auth.isUserAuthenticated()
                  ? <Redirect to="/" />
                  : <ResetPassword
                      token={props.match.params.token}
                      createFlashMessage={this.createFlashMessage}
                      logUserIn={this.logUserIn}
                    />}
            />
            <Route
              exact
              path="/login"
              render={() =>
                <Login
                  logUserOut={this.logUserOut}
                  logUserIn={this.logUserIn}
                  createFlashMessage={this.createFlashMessage}
                />}
            />
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

  logUserIn(token) {
    Auth.authenticateUser(token);
    this.setState({ isUserLoggedIn: Auth.isUserAuthenticated() });
  }

  logUserOut() {
    Auth.deauthenticateUser();
    this.setState({ isUserLoggedIn: Auth.isUserAuthenticated() });
  }

  createFlashMessage({ type, slug = "", text }) {
    //TODO Resolve issue with being able to set state only once here
    //Maybe this isn't problem but something else is...?

    //if flash message is visible, close it
    if (this.state.flashMessage.isVisible) {
      this.closeFlashMessage();
    }

    //create flash by setting state
    this.setState({ flashMessage: { isVisible: true, type, text, slug } });
  }

  closeFlashMessage() {
    this.setState({
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    });
  }
}

module.exports = Router;
