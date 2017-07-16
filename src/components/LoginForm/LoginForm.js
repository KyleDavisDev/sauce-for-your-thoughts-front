import React, { Component } from "react";
import axios from "axios";

import Auth from "../Auth/Auth.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    };

    this.closeFlashMessage = this.closeFlashMessage.bind(this);
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

          //use function defined in Router.js to log in user - this will cause
          //Router.js to update state and force render() thus updating the navigation component
          this.props.logUserIn(response.data.token);

          //set success flash and clear input fields
          const flashMessage = {
            isVisible: true,
            type: "success",
            text: "You are now logged in!"
          };
          this.setState({ email: "", password: "", flashMessage });
        } else {
          //set error flash message and maintain input fields
          const flashMessage = {
            isVisible: true,
            type: "error",
            text: response.data
          };
          this.setState({ flashMessage });
          // console.log(response);
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  closeFlashMessage() {
    const flashMessage = { isVisible: false, type: "", text: "", slug: "" };
    this.setState({ flashMessage });
  }

  render() {
    return (
      <div>
        {this.state.flashMessage.isVisible &&
          <FlashMessage
            type={this.state.flashMessage.type}
            text={this.state.flashMessage.text}
            closeFlashMessage={this.closeFlashMessage}
          />}
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
      </div>
    );
  }
}

module.exports = LoginForm;
