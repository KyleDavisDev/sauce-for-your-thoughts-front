import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { flashError, flashClose } from "../../actions/flash";
import { register } from "../../actions/auth";

import Form from "./Form";
import TextInput from "../TextInput/TextInput.js";

const Register = ({ register, flashError, flashClose, history }) => {
  return (
    <div className="inner">
      <Form onSubmit={handleSubmit} />
    </div>
  );

  function handleSubmit(data) {
    flashClose();
    register(data)
      .then(() => history.push("/stores"))
      .catch(err => {
        flashError({ text: err.response.data.msg });
      });
  }
};

Register.propType = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  register: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired,
  flashClose: PropTypes.func.isRequired
};

const mapDispatchToProps = { register, flashError, flashClose };

export default connect(null, mapDispatchToProps)(Register);
