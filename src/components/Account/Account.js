import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AccountForm from "./AccountForm";
import api from "../../api/api";
import { flashError, flashClose } from "../../actions/flash";
import { getInfo, updateUser } from "../../actions/user";

class Account extends Component {
  componentDidMount() {
    this.getUserInfo();
  }

  render() {
    //check if state exists at all first
    const { name = "", email = "" } = this.props.user;
    return (
      <div className="inner">
        <AccountForm name={name} email={email} onSubmit={this.onSubmit} />
      </div>
    );
  }

  getUserInfo = () => {
    const data = { token: this.props.user.token };

    this.props
      .getInfo(data)
      .then(res => {
        //do something here...?
      })
      .catch(err => {
        this.props.flashError({ text: err.response.data.msg });
      });
  };

  onSubmit = data => {
    //close flash
    this.props.flashClose();

    //add token to data so we can look up user
    data = { ...data, token: this.props.user.token };
    this.props.updateUser(data).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}

Account.propType = {
  getInfo: PropTypes.func.isRequired,
  updateUser: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired,
  flashClose: PropTypes.func.isRequired,
  history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired
};

function mapStateToProps(state) {
  return {
    user: {
      email: state.user.email,
      name: state.user.name,
      token: state.user.token
    }
  };
}

const mapDispatchToProps = {
  getInfo,
  updateUser,
  flashError,
  flashClose
};

export default connect(mapStateToProps, mapDispatchToProps)(Account);
