import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loadable from "react-loadable";

import Loading from "../components/Holder/Holder";
import Header from "../components/Header/Header";

// Home
const Home = Loadable({
  loader: () => System.import("./home/Home.js"),
  loading: Loading
});

// Acount
const Account = Loadable({
  loader: () => System.import("./account/Account.js"),
  loading: Loading
});
const ResetPassword = Loadable({
  loader: () =>
    System.import("./account/screens/resetPassword/ResetPassword.js"),
  loading: Loading
});

// Sauce
const SauceAdd = Loadable({
  loader: () => System.import("./sauce/screens/sauceAdd/SauceAdd"),
  loading: Loading
});
const SauceEdit = Loadable({
  loader: () => System.import("./sauce/screens/sauceEdit/SauceEdit.js"),
  loading: Loading
});
const SauceSingle = Loadable({
  loader: () => System.import("./sauce/screens/sauceSingle/SauceSingle.js"),
  loading: Loading
});

// Sauces
const Sauces = Loadable({
  loader: () => System.import("./sauces/Sauces.js"),
  loading: Loading
});

// Review
const ReviewAdd = Loadable({
  loader: () => System.import("./reviews/screens/reviewAdd/ReviewAdd.js"),
  loading: Loading
});

// Login
const Login = Loadable({
  loader: () => System.import("./login/Login"),
  loading: Loading
});

// Register
const Register = Loadable({
  loader: () => System.import("./Register/Register"),
  loading: Loading
});

// Flashmessage
const FlashMessage = Loadable({
  loader: () => System.import("../components/FlashMessage/FlashMessage"),
  loading: Loading
});

// Tags
// const Tags = Loadable({
//   loader: () => System.import("../Tags/Tags"),
//   loading: Loading
// });

const Screens = ({ flashMessageVisible }) => (
  <div className="container">
    <Header />
    {flashMessageVisible && <FlashMessage />}
    <Route exact path="/" component={Home} />
    <Route
      exact
      path="/sauces(/?page=:page&limit=:limit)?"
      component={Sauces}
    />
    <Route exact path="/sauce/add" component={SauceAdd} />
    <Route exact path="/sauce/edit/:id" component={SauceEdit} />
    <Route exact path="/sauce/single/:slug" component={SauceSingle} />
    {/* <Route exact path="/tags" component={Tags} />
    <Route exact path="/tags/:tag" component={Tags} /> */}
    <Route exact path="/review/add/:slug" component={ReviewAdd} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/account" component={Account} />
    <Route exact path="/account/reset/:token" component={ResetPassword} />
    <Route exact path="/login" component={Login} />
  </div>
);

Screens.propTypes = {
  flashMessageVisible: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  flashMessageVisible: !!state.flashMessage.isVisible
});

export default connect(mapStateToProps, {})(Screens);
