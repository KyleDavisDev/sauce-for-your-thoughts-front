import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { flashClose } from "../../actions/flash";

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
      flashMessage: { isVisible: false, type: null, text: null, slug: null }
    };
  }

  render() {
    const { isVisible, type, text, slug } = this.props.flashMessage;
    return (
      <div className="container">
        <Header
          isUserLoggedIn={this.state.isUserLoggedIn}
          handleLogout={this.logUserOut}
        />
        {isVisible && (
          <FlashMessage
            type={type}
            text={text}
            slug={slug}
            closeFlashMessage={this.closeFlashMessage}
          />
        )}

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

  //function should be called before any component creates flash
  closeFlashMessage = () => {
    this.props.flashClose();
  };
}

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.email,
    flashMessage: state.flashMessage
  };
}

export default connect(mapStateToProps, { flashClose })(App);
