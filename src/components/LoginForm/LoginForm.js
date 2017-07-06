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

    axios({
      method: "post",
      url: "http://localhost:7777/login",
      data: {
        email: this.state.email,
        password: this.state.password
      }
    })
      .then(response => {
        console.log(response)
      })
      .catch(error => {
        console.log(error)
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
