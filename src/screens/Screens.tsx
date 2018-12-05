import * as React from "react";
import { Route } from "react-router-dom";
// import { connect } from "react-redux";
import Loadable from "react-loadable";

import styled from "../theme/styled-components";
import Loading from "../components/Holder/Holder";
import TopBar from "../components/TopBar/TopBar";
import Navigation from "../components/Navigation/Navigation";
import Footer from "../components/Footer/Footer";

const Div = styled.div`
  margin: 0;
  padding: 0;
  background-color: ${props => props.theme.siteBackgroundColor};
`;

// Home
const Home = Loadable({
  loader: () => import("./home/Home"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Add Sauce
const SauceAdd = Loadable({
  loader: () => import("./sauce/screens/SauceAdd/SauceAdd"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// All Sauces
const Sauces = Loadable({
  loader: () => import("./sauces/Sauces"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Add Review
const ReviewAdd = Loadable({
  loader: () => import("./reviews/screens/ReviewAdd/ReviewAdd"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

const Screens = (
  <Div>
    <TopBar />
    <Navigation />
    {/* {flashMessageVisible && <FlashMessage />} */}
    <Route exact path="/" component={Home} />
    <Route exact path="/sauce/add" component={SauceAdd} />
    <Route path="/review/add" component={ReviewAdd} />
    <Route path="/sauces" component={Sauces} />
    {/*
    <Route exact path="/sauce/edit/:id" component={SauceEdit} />
    <Route exact path="/sauce/single/:slug" component={SauceSingle} /> */}
    {/* <Route exact path="/tags" component={Tags} />
    <Route exact path="/tags/:tag" component={Tags} /> */}
    {/* <Route exact path="/register" component={Register} />
    <Route exact path="/account" component={Account} /> */}
    {/* <Route exact path="/account/reset/:token" component={ResetPassword} /> */}
    {/* <Route exact path="/login" component={Login} /> */}
    <Footer />
  </Div>
);

export default Screens;
