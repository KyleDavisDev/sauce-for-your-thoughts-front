import React, { Component } from "react";
import axios from "axios";

import Checker from "../../helper/Checker/Checker.js";

const TextInput = props => {
  return (
    <div>
      <label htmlFor={props.name}> {props.name}: </label>
      <input
        type={props.type}
        id={props.name}
        name={props.name}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  );
};

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

          <TextInput
            name="Name"
            onChange={this.handleNameChange}
            value={this.state.name}
            type="text"
          />

          <TextInput
            name="Email Address"
            onChange={this.handleEmailChange}
            value={this.state.email}
            type="email"
          />

          <TextInput
            name="Password"
            onChange={this.handlePasswordChange}
            value={this.state.password}
            type="password"
          />

          <TextInput
            name="Confirm Password"
            onChange={this.handleConfirmPasswordChange}
            value={this.state.confirmPassword}
            type="password"
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
    this.props.closeFlashMessage();

    const data = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword
    };

    axios({
      method: "post",
      url: "http://localhost:7777/register",
      data
    })
      .then(response => {
        if (Checker.isObject(response.data)) {
          //use function defined in Router.js to log in user - this will cause
          //Router.js to update state and force render() thus updating the navigation component
          this.props.logUserIn(response.data.token);

          // use prop from Router.js to create flash message
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
          const text  = response.data.map(err => {
            return err.msg;
          })
          this.props.createFlashMessage({
            type: "error",
            text
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
