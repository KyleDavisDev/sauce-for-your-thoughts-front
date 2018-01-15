import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Auth from "../../Helper/Auth/Auth";

//pull in other components for SPA
import Account from "../Account/Account";
import Add from "../Add/Add";
import FlashMessage from "../FlashMessage/FlashMessage";
import Header from "../Header/Header";
import Holder from "../Holder/Holder";
import Login from "../Login/Login";
import Register from "../Register/Register";
import ResetPassword from "../ResetPassword/ResetPassword";
import SauceEdit from "../Sauce/Edit";
import SauceGet from "../Sauce/Single";
import Sauces from "../Sauces/Sauces";
import Tags from "../Tags/Tags";

const App = ({ isAuthenticated, flashMessage }) => {
  const { isVisible } = flashMessage;
  return (
    <div className="container">
      <Header />
      {isVisible && <FlashMessage />}

      <Route exact path="/" component={Holder} />
      <Route
        exact
        path="/add"
        render={e =>
          isAuthenticated ? (
            <Add history={e.history} />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
      <Route
        exact
        path="/sauces"
        render={() =>
          isAuthenticated ? <Sauces /> : <Redirect to="/login" push />
        }
      />
      <Route exact path="/sauce/:slug" component={SauceGet} />
      <Route
        exact
        path="/sauce/:id/edit"
        render={e =>
          isAuthenticated ? (
            <SauceEdit
              history={e.history}
              history={e.history}
              match={e.match}
            />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
      <Route exact path="/tags" component={Tags} />
      <Route exact path="/tags/:tag" component={Tags} />
      <Route exact path="/register" component={Register} />
      <Route
        exact
        path="/account"
        render={e =>
          isAuthenticated ? (
            <Account history={e.history} />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
      <Route exact path="/account/reset/:token" component={ResetPassword} />
      <Route exact path="/login" component={Login} />
    </div>
  );
};

App.PropTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  flashMessage: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token,
    flashMessage: { isVisible: state.flashMessage.isVisible }
  };
}

export default connect(mapStateToProps)(App);
