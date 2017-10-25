import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Auth from "../../helper/Auth/Auth.js";
import TextInput from "../TextInput/TextInput.js";
import Checker from "../../helper/Checker/Checker.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        <h2>Login</h2>
        <TextInput
          id="email"
          name="Email Adress"
          onChange={this.handleEmailChange}
          required={true}
          type="email"
          value={this.state.email}
        />
        <TextInput
          id="password"
          name="Password"
          onChange={this.handlePasswordChange}
          required={true}
          type="password"
          value={this.state.password}
        />
        <button type="submit" className="button">
          LOG IN ->
        </button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    //close any flash message that may be visible
    this.props.closeFlashMessage();

    const email = this.state.email.trim().toLowerCase();
    const data = { email, password: this.state.password };
    axios({
      method: "post",
      url: "http://localhost:7777/login",
      data
    })
      .then(response => {
        //if response.token exists then we know user was able to log in fully
        if (Checker.isObject(response.data) && response.data.isGood) {
          //use function defined in Router.js to log in user - this will cause
          //Router.js to update state and force render() thus updating the navigation component
          this.props.logUserIn(response.data.token);

          //set success flash
          this.props.createFlashMessage({
            type: "success",
            text: "You are now logged in!"
          });
          //clear input fields
          this.clearInput();
        } else {
          //set error flash message
          this.props.createFlashMessage({
            type: "error",
            text: response.data.msg || "Please try again"
          });

          //clear input fields
          this.clearInput();
        }
      })
      .catch(error => {
        console.log(error);
        //set error flash message
        this.props.createFlashMessage({
          isVisible: true,
          type: "error",
          text: "Something broke. Try again!"
        });
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  clearInput() {
    this.setState({ email: "", password: "" })
  }
}

LoginForm.propTypes = {
  logUserIn: PropTypes.func.isRequired,
  createFlashMessage: PropTypes.func.isRequired,
  closeFlashMessage: PropTypes.func.isRequired
};

module.exports = LoginForm;
