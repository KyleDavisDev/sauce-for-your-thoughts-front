import React, { Component } from "react";
import PropTypes from "prop-types";

import LoginForm from "../LoginForm/LoginForm.js";
import ForgotPasswordForm from "../ForgotPasswordForm/ForgotPasswordForm.js";

class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    //make sure user is logged out
    this.props.logUserOut();
  }
  render() {
    return (
      <div className="inner">
        <LoginForm
          logUserIn={this.props.logUserIn}
          createFlashMessage={this.props.createFlashMessage}
          closeFlashMessage={this.props.closeFlashMessage}
        />
        <ForgotPasswordForm
          logUserIn={this.props.logUserIn}
          createFlashMessage={this.props.createFlashMessage}
          closeFlashMessage={this.props.closeFlashMessage}
        />
      </div>
    );
  }
}

Login.propTypes = {
  logUserOut: PropTypes.func.isRequired,
  logUserIn: PropTypes.func.isRequired,
  createFlashMessage: PropTypes.func.isRequired,
  closeFlashMessage: PropTypes.func.isRequired
};

module.exports = Login;
