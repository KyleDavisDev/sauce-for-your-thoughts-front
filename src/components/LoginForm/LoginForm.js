import React, { Component } from "react";
import axios from "axios";

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
    console.log(this.state);
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
        />
        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
        />
        <button type="submit" className="button">
          Save ->
        </button>
      </form>
    );
  }
}

module.exports = LoginForm;
