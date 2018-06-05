import React, { Component } from "react";
import PropTypes from "prop-types";
import Validator from "validator";

import TextInput from "../../../../components/TextInput/TextInput";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        email: "1@gmail.com",
        password: "1"
      },
      errors: {
        email: "",
        password: ""
      }
    };
  }

  render() {
    const { email, password } = this.state.data;
    return (
      <form className="form" onSubmit={this.handleSubmit}>
        <h2>Login</h2>
        <TextInput
          id="email"
          name="Email"
          title="Email"
          onChange={this.handleEmailChange}
          type="email"
          value={email}
          required={true}
        />
        {this.state.errors.email && (
          <p className="form-error">{this.state.errors.email}</p>
        )}
        <TextInput
          id="password"
          title="Password"
          name="Password"
          onChange={this.handlePasswordChange}
          type="password"
          value={password}
          required={true}
        />
        {this.state.errors.password && (
          <p className="form-error">{this.state.errors.password}</p>
        )}
        <button type="submit" className="button button--submit">
          LOG IN ->
        </button>
      </form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();

    const errors = this.validate(this.state.data);
    this.setState({ errors });

    if (errors.email.length === 0 && errors.password.length === 0) {
      this.props.submit(this.state.data);
    }
  };

  handleEmailChange = e => {
    this.setState({ data: { ...this.state.data, email: e.target.value } });
  };

  handlePasswordChange = e => {
    this.setState({ data: { ...this.state.data, password: e.target.value } });
  };

  validate = data => {
    const errors = {};
    errors.email = !Validator.isEmail(data.email) ? "Invalid email" : "";
    errors.password = !data.password ? "Cannot be empty" : "";
    return errors;
  };
}

Form.propTypes = {
  submit: PropTypes.func.isRequired
};

export default Form;
