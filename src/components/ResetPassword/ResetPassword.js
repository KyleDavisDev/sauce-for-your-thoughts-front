import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Checker from "../../Helper/Checker/Checker.js";
import { connect } from "react-redux";

class ResetPasswordForm extends Component {
  render() {
    return (
      <form className="form" onSubmit={this.props.handleSubmit}>
        <h2>Reset Password</h2>

        <label htmlFor="password"> Password: </label>
        <input
          type="password"
          id="password"
          name="password"
          value={this.props.password}
          onChange={this.props.handlePasswordChange}
          required
        />

        <label htmlFor="confirmPassword"> Confirm Password: </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={this.props.confirmPassword}
          onChange={this.props.handleConfirmPasswordChange}
          required
        />

        <button type="submit" className="button">
          Save ->
        </button>
      </form>
    );
  }
}

ResetPasswordForm.propTypes = {
  password: PropTypes.string,
  confirmPassword: PropTypes.string,
  handleSubmit: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleConfirmPasswordChange: PropTypes.func.isRequired
};

class ResetPassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      password: "",
      confirmPassword: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleConfirmPasswordChange = this.handleConfirmPasswordChange.bind(
      this
    );
  }

  componentWillMount() {
    if (!this.props.user.token) this.props.history.push("/login");
  }

  componentDidMount() {
    if (!this.props.user.token) return;
    const token = this.props.token;
    this.resetUserPassword(token);
  }

  render() {
    return (
      <div className="inner">
        <ResetPasswordForm
          password={this.state.password}
          confirmPassword={this.state.confirmPassword}
          handleSubmit={this.handleSubmit}
          handlePasswordChange={this.handlePasswordChange}
          handleConfirmPasswordChange={this.handleConfirmPasswordChange}
        />
      </div>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    const { password, confirmPassword } = this.state;

    //basic client-side check.
    //No reason to post to server if we can stop user right here.
    if (password !== confirmPassword) {
      this.props.createFlashMessage({
        type: "error",
        text: "Your passwords do not match!"
      });
    } else {
      axios({
        method: "post",
        url: "http://localhost:7777/account/reset",
        data: {
          token: this.props.token,
          password,
          confirmPassword
        }
      })
        .then(response => {
          if (Checker.isObject(response.data) && response.data.isGood) {
            //set token
            this.props.logUserIn(response.data.token);

            //create flash
            this.props.createFlashMessage({
              type: "success",
              text: response.data.msg
            });

            //at this point, we will be redirect via Router.js
            return;
          } else {
            this.props.createFlashMessage({
              type: "error",
              text: response.data.msg
            });
          }
        })
        .catch(err => console.log(err));
    }
  }

  resetUserPassword(token) {
    axios({
      method: "post",
      url: "http://localhost:7777/account/validateResetToken/",
      data: { token }
    })
      .then(response => {
        if (Checker.isObject(response.data)) {
          if (response.data.isGood) {
            this.props.createFlashMessage({
              type: "caution",
              text: response.data.msg
            });
          } else {
            this.props.createFlashMessage({
              type: "error",
              text: response.data.msg
            });
          }
        } else {
          this.props.createFlashMessage({
            type: "error",
            text: "Not sure what happened here.... Try again."
          });
        }
      })
      .catch(err => {
        this.props.createFlashMessage({
          type: "error",
          text: "Not sure what happened here.... Try again."
        });
      });
  }

  handlePasswordChange(e) {
    this.setState({ password: e.target.value });
  }

  handleConfirmPasswordChange(e) {
    this.setState({ confirmPassword: e.target.value });
  }
}

ResetPassword.propTypes = {
  user: {
    token: PropTypes.string
  },
  logUserIn: PropTypes.func.isRequired,
  token: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  user: {
    token: state.user.token;
  }
};

module.exports = connect(mapStateToProps, {})(ResetPassword);
