import React, { Component } from "react";
import axios from "axios";

import Auth from "../../helper/Auth/Auth.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
  }

  render() {
    return (
      <form className="form" onSubmit={this.handleSubmit.bind(this)}>
        <h2>Login</h2>
        <label htmlFor="email"> Email Address: </label>
        <input
          type="email"
          id="email"
          name="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
          required
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={this.handlePasswordChange}
          required
        />
        <button type="submit" className="button">
          LOG IN ->
        </button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();
    const email = this.state.email.trim().toLowerCase()

    axios({
      method: "post",
      url: "http://localhost:7777/login",
      data: {
        email,
        password: this.state.password
      }
    })
      .then(response => {
        //if response.token exists then we know user was able to log in fully
        if (response.data.token) {
          //use function defined in Router.js to log in user - this will cause
          //Router.js to update state and force render() thus updating the navigation component
          this.props.logUserIn(response.data.token);

          //set success flash
          this.props.createFlashMessage({
            isVisible: true,
            type: "success",
            text: "You are now logged in!"
          });
          //clear input fields
          this.setState({ email: "", password: "" });
        } else {
          //set error flash message
          this.props.createFlashMessage({
            isVisible: true,
            type: "error",
            text: response.data
          });
        }
      })
      .catch(error => {
        console.log(error);
        //set error flash message
        this.props.createFlashMessage({
          isVisible: true,
          type: "error",
          text: "Something broke. Try again!"
        });
      });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }
}

module.exports = LoginForm;
