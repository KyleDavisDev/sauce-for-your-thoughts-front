import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loadable from "react-loadable";
import Loading from "../Holder/Holder";
import Header from "../Header/Header";

const Account = Loadable({
  loader: () => System.import("../Account/Account"),
  loading: Loading
});
const Add = Loadable({
  loader: () => System.import("../Sauce/Add"),
  loading: Loading
});
const FlashMessage = Loadable({
  loader: () => System.import("../FlashMessage/FlashMessage"),
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
const Single = Loadable({
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

const App = ({ flashMessageVisible }) => (
  <div className="container">
    <Header />
    {flashMessageVisible && <FlashMessage />}
    <Route exact path="/" component={Loading} />
    <Route
      exact
      path="/sauces(/?page=:page&limit=:limit)?"
      component={Sauces}
    />
    <Route exact path="/sauce/add" component={Add} />
    <Route exact path="/sauce/single/:slug" component={Single} />
    <Route exact path="/sauce/:id/edit" component={SauceEdit} />
    <Route exact path="/tags" component={Tags} />
    <Route exact path="/tags/:tag" component={Tags} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/account/reset/:token" component={ResetPassword} />
    <Route exact path="/login" component={Login} />
  </div>
);

App.propTypes = {
  flashMessageVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  flashMessageVisible: !!state.flashMessage.isVisible
});

export default connect(mapStateToProps, {})(App);
