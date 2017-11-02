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

    // axios({
    //   method: "post",
    //   url: "http://localhost:7777/register",
    //   data
    // })
    //   .then(response => {
    //     if (Checker.isObject(response.data)) {
    //       //use function defined in Router.js to log in user - this will cause
    //       //Router.js to update state and force render() thus updating the navigation component
    //       this.props.logUserIn(response.data.token);

    //       // use prop from Router.js to create flash message
    //       this.props.createFlashMessage({
    //         type: "success",
    //         slug: response.data.slug,
    //         text: "Thank you for registering! You are now logged in."
    //       });

    //       //reset form data
    //       this.setState({
    //         name: "",
    //         email: "",
    //         password: "",
    //         confirmPassword: ""
    //       });
    //     } else if (Checker.isArray(response.data)) {
    //       //we will be here if user didn't use all inputs correctly or didn't fill something out
    //       //use prop from Router.js to create flash message
    //       const text = response.data.map(err => {
    //         return err.msg;
    //       });
    //       this.props.createFlashMessage({
    //         type: "error",
    //         text
    //       });
    //     }
    //   })
    //   .catch(error => {
    //     this.props.createFlashMessage({
    //       type: "error",
    //       text: error
    //     });
    //   });
  };
}

Register.propType = {
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
  register: PropTypes.func.isRequired
};

export default connect(null, { register, flashError })(Register);
