import React, { Component } from "react";

import LoginForm from '../LoginForm/LoginForm.js'

class Login extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="inner">
            <LoginForm logUserIn={this.props.logUserIn} createFlashMessage={this.props.createFlashMessage}/>
        </div>
    )
  }
}

module.exports = Login;
