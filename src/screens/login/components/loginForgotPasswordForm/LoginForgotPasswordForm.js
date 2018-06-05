import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import Auth from "../../../../utils/auth/Auth";
import Checker from "../../../../utils/checker/Checker";
import TextInput from "../../../../components/TextInput/TextInput";

class LoginForgotPasswordForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="form forgot-form">
        <h2>I forgot my password!</h2>
        <TextInput
          id="forgot_email"
          title="Email"
          name="Email"
          onChange={this.handleEmailChange}
          required={true}
          type="email"
          value={this.state.email}
        />
        <button type="submit" className="button button--submit">
          SEND A RESET ->
        </button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    // close any flash message
    this.props.closeFlashMessage();

    if (this.state.email.length === 0) return;

    axios({
      method: "post",
      url: "http://localhost:7777/account/forgot",
      data: {
        email: this.state.email
      }
    })
      .then(response => {
        // check if data is object and isGood is true
        if (Checker.isObject(response.data) && response.data.isGood) {
          this.props.createFlashMessage({
            type: "success",
            text: response.data.msg
          });
        } else {
          // something isn't working correctly if we are here
          this.props.createFlashMessage({
            type: "error",
            text: "Not sure how you did this.... But you broke it. Congrats."
          });
        }

        this.setState({ email: "" });
      })
      .catch(error => {
        console.log(error);
        // set error flash message
        this.props.createFlashMessage({
          type: "error",
          text: "Oops! Try again please."
        });
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
}

LoginForgotPasswordForm.propTypes = {};

export default LoginForgotPasswordForm;
