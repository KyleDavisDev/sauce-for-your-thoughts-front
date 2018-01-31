import React, { Component } from "react";
import { BrowserRouter, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import Loading from "../Holder/Holder";

import Auth from "../../Helper/Auth/Auth";

//pull in other components for SPA
const Account = Loadable({
  loader: () => System.import("../Account/Account"),
  loading: Loading
});
const Add = Loadable({
  loader: () => System.import("../Add/Add"),
  loading: Loading
});
const FlashMessage = Loadable({
  loader: () => System.import("../FlashMessage/FlashMessage"),
  loading: Loading
});
const Header = Loadable({
  loader: () => System.import("../Header/Header"),
  loading: Loading
});
const Login = Loadable({
  loader: () => System.import("../Login/Login"),
  loading: Loading
});
const Register = Loadable({
  loader: () => System.import("../Register/Register"),
  loading: Loading
});
const ResetPassword = Loadable({
  loader: () => System.import("../ResetPassword/ResetPassword"),
  loading: Loading
});
const SauceEdit = Loadable({
  loader: () => System.import("../Sauce/Edit"),
  loading: Loading
});
const SauceGet = Loadable({
  loader: () => System.import("../Sauce/Single"),
  loading: Loading
});
const Sauces = Loadable({
  loader: () => System.import("../Sauces/Sauces"),
  loading: Loading
});
const Tags = Loadable({
  loader: () => System.import("../Tags/Tags"),
  loading: Loading
});

const App = ({ isAuthenticated, flashMessage }) => {
  const { isVisible } = flashMessage;
  return (
    <div className="container">
      <Header />
      {isVisible && <FlashMessage />}

      <Route exact path="/" component={Loading} />
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
        path="/sauces/:page?/:pageNum?"
        render={e =>
          isAuthenticated ? (
            <Sauces history={e.history} match={e.match} />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
      <Route exact path="/sauce/:slug" component={SauceGet} />
      <Route
        exact
        path="/sauce/:id/edit"
        render={e =>
          isAuthenticated ? (
            <SauceEdit history={e.history} match={e.match} />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
      <Route
        exact
        path="/tags"
        render={e =>
          isAuthenticated ? (
            <Tags match={e.match} />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
      <Route
        exact
        path="/tags/:tag"
        render={e =>
          isAuthenticated ? (
            <Tags match={e.match} />
          ) : (
            <Redirect to="/login" push />
          )
        }
      />
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
