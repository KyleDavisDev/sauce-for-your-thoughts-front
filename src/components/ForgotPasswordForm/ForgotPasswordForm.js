import React, { Component } from "react";
import axios from "axios";

import Checker from "../../helper/Checker/Checker.js";
import Auth from "../../helper/Auth/Auth.js"

class ForgotPasswordForm extends Component {
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
        <label htmlFor="forgotEmail"> Email: </label>
        <input
          type="email"
          name="forgotEmail"
          id="forgotEmail"
          onChange={this.handleEmailChange}
        />
        <button type="submit" className="button">
          SEND A RESET ->
        </button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    if (this.state.email.length === 0) return;

    axios({
      method: "post",
      url: "http://localhost:7777/account/forgot",
      data: {
        email: this.state.email
      }
    })
      .then(response => {

        //will be object if successful else we will send fake success
        if (Checker.isObject(response.data)) {
          
          this.props.createFlashMessage({
            isVisible: true,
            type: "success",
            text: response.data.resetURL
          });
        } else {
          //set success flash
          this.props.createFlashMessage({
            isVisible: true,
            type: "success",
            text: response.data
          });
        }

        this.setState({email: ""})
      })
      .catch(error => {
        console.log(error);
        //set error flash message
        this.props.createFlashMessage({
          isVisible: true,
          type: "error",
          text: "Oops! Try again please."
        });
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
}

module.exports = ForgotPasswordForm;
