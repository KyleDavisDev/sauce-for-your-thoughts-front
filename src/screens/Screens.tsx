import * as React from "react";
import { Route } from "react-router-dom";
// import { connect } from "react-redux";
import * as Loadable from "react-loadable";

import Loading from "../components/Holder/Holder";
// import Home from "./home/Home";
// Home
const Home = Loadable({
  loader: () => import("./home/Home"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});
const Screens = (
  <div className="container">
    {/* <Header /> */}
    {/* {flashMessageVisible && <FlashMessage />} */}
    <Route exact path="/" component={Home} />
    {/* <Route
      exact
      path="/sauces(/?page=:page&limit=:limit)?"
      component={Sauces}
    />
    <Route exact path="/sauce/add" component={SauceAdd} />
    <Route exact path="/sauce/edit/:id" component={SauceEdit} />
    <Route exact path="/sauce/single/:slug" component={SauceSingle} /> */}
    {/* <Route exact path="/tags" component={Tags} />
    <Route exact path="/tags/:tag" component={Tags} /> */}
    {/* <Route exact path="/review/add/:slug" component={ReviewAdd} />
    <Route exact path="/register" component={Register} />
    <Route exact path="/account" component={Account} /> */}
    {/* <Route exact path="/account/reset/:token" component={ResetPassword} /> */}
    {/* <Route exact path="/login" component={Login} /> */}
  </div>
);

export default Screens;
