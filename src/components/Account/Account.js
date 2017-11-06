import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AccountForm from "./AccountForm";
import api from "../../api/api";
import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";
import { flashError } from "../../actions/flash";
import { updateUser } from "../../actions/user";

class Account extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      email: ""
    };
  }

  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    return (
      <div className="inner">
        <AccountForm
          name={this.state.name}
          email={this.state.email}
          onSubmit={this.onSubmit}
        />
      </div>
    );
  }

  getUserInfo = () => {
    const data = { token: Auth.getToken() };

    api.user
      .getInfo(data)
      .then(res => {
        this.setState({ name: res.user.name, email: res.user.email });
      })
      .catch(err => {
        this.props.flashError({ text: err.response.data.msg });
      });
  };

  onSubmit = data => {
    //add token to data so we can look up user
    data = { ...data, token: Auth.getToken() };
    this.props.updateUser(data).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}

Account.propType = {
  updateUser: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

export default connect(null, { updateUser, flashError })(Account);
