import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { flashError } from "../../actions/flash";
import { register } from "../../actions/auth";

import RegisterForm from "./RegisterForm";
import Checker from "../../helper/Checker/Checker.js";
import TextInput from "../TextInput/TextInput.js";

class Register extends Component {
  render() {
    return (
      <div className="inner">
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    );
  }
  handleSubmit = data => {
    this.props
      .register(data)
      .then(() => this.props.history.push("/stores"))
      .catch(err => {
        this.props.flashError({ text: err.response.data.msg });
      });
  };
}

Register.propType = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  register: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

export default connect(null, { register, flashError })(Register);
