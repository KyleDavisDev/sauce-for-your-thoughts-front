import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Auth from "../../helper/Auth/Auth.js";

//pull in other components for SPA
import Account from "../Account/Account.js";
import Add from "../Add/Add.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";
import Header from "../Header/Header.js";
import Holder from "../Holder/Holder.js";
import Login from "../Login/Login.js";
import Map from "../Map/Map.js";
import Register from "../Register/Register.js";
import ResetPassword from "../ResetPassword/ResetPassword.js";
import StoreEdit from "../Store/Edit.js";
import StoreGet from "../Store/Single.js";
import Sauces from "../Sauces/Sauces.js";
import Tags from "../Tags/Tags.js";

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
      <Route path="/map" component={Map} />
      <Route
        exact
        path="/sauces"
        render={() =>
          isAuthenticated ? <Sauces /> : <Redirect to="/login" push />
        }
      />
      <Route exact path="/store/:slug" component={StoreGet} />
      <Route
        exact
        path="/store/:id/edit"
        render={e =>
          isAuthenticated ? (
            <StoreEdit
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
