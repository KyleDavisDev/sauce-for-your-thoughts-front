import React, { Component } from "react";
import axios from "axios";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      _id: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
  }

  componentWillMount() {
    axios({
      method: "post",
      url: "http://localhost:7777/account/get",
      data: {
        token: Auth.getToken()
      }
    })
      .then(response => {
        //user is authenticated
        this.setState({
          email: response.data.email,
          name: response.data.name,
          _id: response.data._id
        });
      })
      .catch(err => {
        //user failed to authenticate
      });
  }

  render() {
    return (
      <div className="inner">
        <form className="form" onSubmit={this.handleSubmit}>
          <h2>Settings</h2>

          <label htmlFor="name"> Name: </label>
          <input
            type="text"
            id="name"
            name="name"
            value={this.state.name}
            onChange={this.handleNameChange}
          />

          <label htmlFor="email"> Email Address: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
          />

          <button type="submit" className="button">
            Register ->
          </button>
        </form>
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:7777/account/update",
      data: {
        name: this.state.name,
        email: this.state.email,
        _id: this.state._id
      }
    })
      .then(response => {
        //success if response.data is object
        if (Checker.isObject(response.data)) {
          //use prop from Router.js to create flash message
          this.props.createFlashMessage({
            type: "success",
            text: "Your account has been updated!"
          });
        } else if (Checker.isArray(response.data)) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out

          //use prop from Router.js to create flash message
          this.props.createFlashMessage({
            type: "error",
            text: "Oops! Something didn't work. Please try again."
          });
        }
      })
      .catch(error => {
        this.props.createFlashMessage({
          type: "error",
          text: error
        });
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }
}

module.exports = Account;
