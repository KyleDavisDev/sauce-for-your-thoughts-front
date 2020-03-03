import * as React from "react";
import { Route } from "react-router-dom";
import Loadable from "react-loadable";

import styled from "../theme/styled-components";
import Loading from "../components/Holder/Holder";

const StyledDiv = styled.div`
  margin: 0;
  padding: 0;
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

// Edit Sauce
const SauceEdit = Loadable({
  loader: () => import("./sauce/screens/SauceEdit/SauceEdit"),
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
  loader: () => import("./reviews/ReviewAdd"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Edit Review
const ReviewEdit = Loadable({
  loader: () => import("./reviews/ReviewEdit"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User Register
const Register = Loadable({
  loader: () => import("./account/register/Register"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User settings
const Settings = Loadable({
  loader: () => import("./account/settings/Settings"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User settings - email update
const UpdateEmail = Loadable({
  loader: () => import("../components/UpdateEmail/UpdateEmail"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User settings - password update
const UpdatePassword = Loadable({
  loader: () => import("./account/settings/UpdatePassword/UpdatePassword"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User settings - display name update
const UpdateDisplayName = Loadable({
  loader: () => import("../components/UpdateDisplayName/UpdateDisplayName"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User settings - avatar update
const UpdateAvatar = Loadable({
  loader: () => import("./account/settings/UpdateAvatar/UpdateAvatar"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User settings - avatar update
const ConfirmEmail = Loadable({
  loader: () => import("./account/confirm/Email/ConfirmEmail"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// User Login
const Login = Loadable({
  loader: () => import("./account/login/Login"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Forgot password
const Reset = Loadable({
  loader: () => import("./reset/Reset"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Single
const SauceSpotlight = Loadable({
  loader: () => import("./sauce/screens/SauceSpotlight/SauceSpotlight"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Admin
const ApproveSubmissions = Loadable({
  loader: () => import("./admin/ApproveSubmissions/ApproveSubmissions"),
  loading: () => (
    <div>
      <Loading />
    </div>
  )
});

// Components themselves will handle who should be able to visit.
// Cannot connect to redux using react-router-dom's children method so this is best alternative
const Screens = (
  <StyledDiv>
    {/* {flashMessageVisible && <FlashMessage />} */}
    <Route exact path="/" component={Home} />
    <Route exact path="/sauce/add" component={SauceAdd} />
    <Route exact path="/sauce/edit" component={SauceEdit} />
    <Route path="/review/add" component={ReviewAdd} />
    <Route path="/review/edit" component={ReviewEdit} />
    <Route path="/sauces" component={Sauces} />
    <Route path="/account/register" component={Register} />
    <Route path="/account/login" component={Login} />
    <Route exact path="/account/settings" component={Settings} />
    <Route path="/account/settings/email" component={UpdateEmail} />
    <Route path="/account/settings/password" component={UpdatePassword} />
    <Route path="/account/settings/displayname" component={UpdateDisplayName} />
    <Route path="/account/settings/avatar" component={UpdateAvatar} />
    <Route path="/account/confirm/email/:email" component={ConfirmEmail} />
    <Route path="/reset" component={Reset} />
    <Route exact path="/sauce" component={SauceSpotlight} />
    <Route path="/admin/approvesubmissions" component={ApproveSubmissions} />

    {/* <Route exact path="/sauce/edit/:id" component={SauceEdit} />
    <Route exact path="/sauce/single/:slug" component={SauceSingle} /> */}
    {/* <Route exact path="/tags" component={Tags} />
    <Route exact path="/tags/:tag" component={Tags} /> */}
    {/* <Route exact path="/register" component={Register} />
    <Route exact path="/account" component={Account} /> */}
    {/* <Route exact path="/account/reset/:token" component={ResetPassword} /> */}
    {/* <Route exact path="/account/login" component={Login} /> */}
  </StyledDiv>
);

export default Screens;
