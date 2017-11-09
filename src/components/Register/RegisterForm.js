import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Validator from "validator";

import TextInput from "../TextInput/TextInput";

class RegisterForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      errors: {}
    };
  }
  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Register</h2>

        <TextInput
          name="Name"
          onChange={this.handleNameChange}
          value={this.state.data.name}
          type="text"
        />
        {this.state.errors.name && (
          <p className="form-error">*{this.state.errors.name}</p>
        )}

        <TextInput
          name="Email Address"
          onChange={this.handleEmailChange}
          value={this.state.data.email}
          type="email"
        />
        {this.state.errors.email && (
          <p className="form-error">*{this.state.errors.email}</p>
        )}

        <TextInput
          name="Password"
          onChange={this.handlePasswordChange}
          value={this.state.data.password}
          type="password"
        />
        {this.state.errors.password && (
          <p className="form-error">*{this.state.errors.password}</p>
        )}

        <TextInput
          name="Confirm Password"
          onChange={this.handleConfirmPasswordChange}
          value={this.state.data.confirmPassword}
          type="password"
        />
        {this.state.errors.confirmPassword && (
          <p className="form-error">*{this.state.errors.confirmPassword}</p>
        )}

        <button type="submit" className="button">
          Register ->
        </button>
      </form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (
      errors.name.length === 0 &&
      errors.email.length === 0 &&
      errors.password.length === 0 &&
      errors.confirmPassword.length === 0
    ) {
      this.props.onSubmit(this.state.data);
    }
  };

  validate = data => {
    const errors = {};
    errors.name = !data.name ? "Cannot be empty" : "";
    errors.email = !Validator.isEmail(data.email) ? "Invalid email" : "";
    errors.password = !data.password ? "Cannot be empty" : "";
    errors.confirmPassword =
      !data.confirmPassword || data.confirmPassword !== data.password
        ? "Cannot be empty and must be the same as your password"
        : "";
    return errors;
  };

  handleNameChange = e => {
    this.setState({ data: { ...this.state.data, name: e.target.value } });
  };

  handleEmailChange = e => {
    this.setState({ data: { ...this.state.data, email: e.target.value } });
  };

  handlePasswordChange = e => {
    this.setState({ data: { ...this.state.data, password: e.target.value } });
  };

  handleConfirmPasswordChange = e => {
    this.setState({
      data: { ...this.state.data, confirmPassword: e.target.value }
    });
  };
}

export default RegisterForm;
