import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import Auth from "../../helper/Auth/Auth.js";

//pull in other components for SPA
import Account from "../Account/Account.js";
import Add from "../Add/Add.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";
import Header from "../Header/Header.js";
import Holder from "../Holder/Holder.js";
import Login from "../Login/Login.js";
import Register from "../Register/Register.js";
import ResetPassword from "../ResetPassword/ResetPassword.js";
import StoreEdit from "../Store/StoreEdit.js";
import StoreGet from "../Store/StoreGet.js";
import Stores from "../Stores/Stores.js";
import Tags from "../Tags/Tags.js";

class App extends Component {
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
      <div className="container">
        <Header
          isUserLoggedIn={this.state.isUserLoggedIn}
          handleLogout={this.logUserOut}
        />
        {/*this.state.flashMessage.isVisible && (
          <FlashMessage
            type={this.state.flashMessage.type}
            text={this.state.flashMessage.text}
            slug={this.state.flashMessage.slug}
            closeFlashMessage={this.closeFlashMessage}
          />
        )*/}

        <Route exact path="/" component={Holder} />
        <Route exact path="/add" component={Add} />
        <Route exact path="/stores" component={Stores} />
        <Route exact path="/store/:slug" component={StoreGet} />
        <Route exact path="/store/:id/edit" component={StoreEdit} />
        <Route exact path="/tags" component={Tags} />
        <Route exact path="/tags/:tag" component={Tags} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/account" component={Account} />
        <Route exact path="/account/reset/:token" component={ResetPassword} />
        <Route exact path="/login" component={Login} />
      </div>
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

  createFlashMessage({ type, slug = "", text = "", msg }) {
    //text and msg are same thing so set text to msg if text is empty
    text = text === "" ? msg : text;

    //create flash by setting state
    this.setState({ flashMessage: { isVisible: true, type, text, slug } });
  }

  //function should be called before any component creates flash
  closeFlashMessage() {
    this.setState({
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    });
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email
  };
}

export default connect(mapStateToProps)(App);
