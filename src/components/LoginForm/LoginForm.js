import React, { Component } from "react";
import axios from "axios";

import Auth from "../Auth/Auth.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:7777/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        //if response.token exists then we know user was able to log in fully
        if (response.data.token) {
          this.props.logUserIn(response.data.token)

          //set flash message here

        } else {
          console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
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
          onChange={e => this.setState({ email: e.target.value })}
          required
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          required
        />
        <button type="submit" className="button">
          Save ->
        </button>
      </form>
    );
  }
}

module.exports = LoginForm;
