import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AccountForm from "./AccountForm";
import { flashError, flashClose } from "../../redux/actions/flash";
import { getInfo, updateUser } from "../../redux/actions/users";

class Account extends Component {
  static propTypes = {
    user: PropTypes.shape({
      email: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      token: PropTypes.string.isRequired
    }).isRequired,
    history: PropTypes.shape({ push: PropTypes.func.isRequired }).isRequired,
    getInfo: PropTypes.func.isRequired,
    updateUser: PropTypes.func.isRequired,
    flashError: PropTypes.func.isRequired,
    flashClose: PropTypes.func.isRequired
  };

  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  componentDidMount() {
    const { token } = this.props.user;
    if (!token) return;
    this.getUserInfo(token);
  }

  render() {
    // check if state exists at all first
    const { name, email } = this.props.user;
    return (
      <div className="inner">
        <AccountForm name={name} email={email} onSubmit={this.onSubmit} />
      </div>
    );
  }

  onSubmit = e => {
    // close flash
    this.props.flashClose();

    // construct API object
    const data = {
      user: { token: this.props.user.token, name: e.name, email: e.email }
    };
    this.props.updateUser(data).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };

  /** @description fires action dispatch to get user information
   *  @param {String} token - unique user identifier
   *  @fires users#getInfo - get specific user information
   *  @return {NULL}
   */
  getUserInfo = token => {
    const data = { user: { token } };

    this.props.getInfo(data).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}

// TODO figure out if setting values here is anti-pattern
function mapStateToProps(state) {
  return {
    user: {
      email: state.users.self.email || "",
      name: state.users.self.name || "",
      token: state.users.self.token || ""
    }
  };
}

const mapDispatchToProps = {
  getInfo,
  updateUser,
  flashError,
  flashClose
};
// export default Account;
export default connect(mapStateToProps, mapDispatchToProps)(Account);
