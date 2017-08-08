import React, { Component } from "react";
import axios from "axios";

import Checker from "../../helper/Checker/Checker.js";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  render() {
    return (
      <div className="inner">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2>Register</h2>

          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />

          <label htmlFor="email"> Email Address: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />

          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <label htmlFor="confirm-password"> Confirm Password: </label>
          <input
            type="password"
            id="confirm-password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />

          <button type="submit" className="button">
            Register ->
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:7777/register",
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        "confirm-password": this.state.confirmPassword
      }
    })
      .then(response => {
        if (Checker.isObject(response.data)) {
          //use function defined in Router.js to log in user - this will cause
          //Router.js to update state and force render() thus updating the navigation component
          this.props.logUserIn(response.data.token);

          //use prop from Router.js to create flash message
          this.props.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Thank you for registering! You are now logged in."
          });

          //reset form data
          this.setState({
            name: "",
            email: "",
            password: "",
            confirmPassword: ""
          });
        } else if (Checker.isArray(response.data)) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out

          //use prop from Router.js to create flash message
          this.props.createFlashMessage({
            type: "error",
            text: "something messed up"
          });
        }
      })
      .catch(error => {
        this.props.createFlashMessage({
          type: "error",
          text: error
        });
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }
}

module.exports = Register;
