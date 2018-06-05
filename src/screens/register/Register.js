import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import RegisterForm from "./components/registerForm/RegisterForm";

import { flashError, flashClose } from "../../redux/actions/flash";
import { register } from "../../redux/actions/auth";

class Register extends Component {
  static propType = {
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    register: PropTypes.func.isRequired,
    flashError: PropTypes.func.isRequired,
    flashClose: PropTypes.func.isRequired
  };
  render() {
    return (
      <div className="inner">
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    );
  }

  handleSubmit = e => {
    const data = {
      user: {
        email: e.email,
        name: e.name,
        password: e.password,
        confirmPassword: e.confirmPassword
      }
    };
    this.props.flashClose();
    this.props
      .register(data)
      .then(() => this.props.history.push("/sauces"))
      .catch(err => {
        console.log(err);
        console.log(err.response);
        this.props.flashError({ text: err.response.data.msg });
      });
  };
}

const mapDispatchToProps = { register, flashError, flashClose };

export default connect(null, mapDispatchToProps)(Register);
