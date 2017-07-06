import React, { Component } from "react";
import axios from "axios";

import FlashMessage from "../FlashMessage/FlashMessage.js";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      flashMessage: { isVisible: false, type: "", text: "", slug: "" },
      didPostWork: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
    this.createFlashMessage = this.createFlashMessage.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();

    axios({
      method: "post",
      url: "http://localhost:7777/register",
      data: {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        "confirm-password": this.state.confirmPassword
      }
    })
      .then(response => {
        console.log(response)
        if (Array.isArray(response.data)) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out
          this.createFlashMessage({
            type: "error",
            text: response.data.map(data => data.msg)
          });
          this.setState({ didPostWork: false });
        } else {
          this.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Your store was added!"
          });
          this.setState({ didPostWork: true });
        }
      })
      .catch(error => {
        this.createFlashMessage("error");
        this.setState({ didPostWork: false });
      });
  }

  handleNameChange(e) {
    this.setState({ name: e.target.value });
  }

  handleEmailChange(e) {
    this.setState({ email: e.target.value });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }

  createFlashMessage({ type, slug = "", text }) {
    this.setState({ flashMessage: { isVisible: true, type, text, slug } });
  }

  closeFlashMessage() {
    const isVisible = false;
    const type = "";
    const text = "";
    const slug = "";
    this.setState({ flashMessage: { isVisible, type, text, slug } });
  }

  render() {
    return (
      <div className="inner">
        {this.state.flashMessage.isVisible &&
          <FlashMessage
            type={this.state.flashMessage.type}
            text={this.state.flashMessage.text}
            slug={this.state.flashMessage.slug}
            closeFlashMessage={this.closeFlashMessage}
          />}
        <form className="form" onSubmit={this.handleSubmit}>
          <h2>Register</h2>

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

          <label htmlFor="password"> Password: </label>
          <input
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handlePasswordChange}
          />

          <label htmlFor="confirm-password"> Confirm Password: </label>
          <input
            type="password"
            id="confirm-password"
            value={this.state.confirmPassword}
            onChange={this.handleConfirmPasswordChange}
          />

          <button type="submit" className="button">
            Register ->
          </button>
        </form>
      </div>
    );
  }
}

module.exports = Register;
