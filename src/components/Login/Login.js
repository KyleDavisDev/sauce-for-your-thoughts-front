import React, { Component } from "react";

import LoginForm from "../LoginForm/LoginForm.js";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.js";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount(){
    //make sure user is logged out
    this.props.logUserOut();
  }
  render() {
    return (
      <div className="inner">
        <LoginForm
          logUserIn={this.props.logUserIn}
          createFlashMessage={this.props.createFlashMessage}
        />
        <ForgotPasswordForm
          logUserIn={this.props.logUserIn}
          createFlashMessage={this.props.createFlashMessage}
        />
      </div>
    );
  }
}

module.exports = Login;
