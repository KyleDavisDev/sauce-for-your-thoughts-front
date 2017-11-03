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
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="inner">
        <RegisterForm onSubmit={this.handleSubmit} />
      </div>
    );
  }

  handleSubmit = data => {
    // e.preventDefault();

    this.props
      .register(data)
      .then(() => this.props.history.push("/stores"))
      .catch(err => {
        this.props.flashError({ text: err.message });
      });
  };
}

Register.propType = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { register, flashError })(Register);
