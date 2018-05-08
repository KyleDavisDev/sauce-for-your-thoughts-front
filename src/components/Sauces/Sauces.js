import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSauces } from "../../redux/actions/sauces";
import { flashError } from "../../redux/actions/flash";
import { getInfo, toggleSauce, getHearts } from "../../redux/actions/users";
import Card from "../Card/index.js";
import Pagination from "./Pagination";

class Sauces extends Component {
  static propTypes = {
    sauces: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    user: PropTypes.shape({
      token: PropTypes.string,
      email: PropTypes.string,
      hearts: PropTypes.arrayOf(PropTypes.string.isRequired)
    }).isRequired,
    getSauces: PropTypes.func.isRequired,
    getInfo: PropTypes.func.isRequired,
    flashError: PropTypes.func.isRequired,
    getHearts: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        pageNum: PropTypes.string
      }).isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    // page and saucePerPage will be held in local state since it will only be used here and by Pagination
    this.state = {
      page: 1,
      saucePerPage: 6
    };
  }

  componentDidMount() {
    const { token } = this.props.user;
    axios.all([this.getSauces(), this.getHearts(token)]).catch(error => {
      console.log(error);
      this.props.flashError({ text: error.response.data.msg });
    });
  }

  componentWillReceiveProps(nextProps) {
    const page = parseInt(nextProps.match.params.pageNum) || 1;
    this.setState({ page });
  }

  componentWillUnmount() {}

  render() {
    const sauces = this.props.sauces || [];
    const { page, saucePerPage } = this.state;
    return (
      <div className="inner">
        <h2>Sauces</h2>
        <div className="sauces">
          {sauces.length > 0 &&
            sauces
              .slice((page - 1) * saucePerPage, page * saucePerPage)
              .map(sauce => <Card _id={sauce} key={sauce} />)}
        </div>
        <Pagination
          total={sauces.length}
          page={page}
          saucePerPage={saucePerPage}
        />
      </div>
    );
  }

  /** @description Grabs all sauces, related reviews, and related users
   *  @returns {Promise}
   */
  getSauces = () => this.props.getSauces();

  // this will pass token to api and store email/name into redux store on success
  getUserID = () => {
    // make sure user is logged in
    if (!this.props.user.token) return;
    // check if email already passed to component to save api call
    if (this.props.user.email) return;

    const data = { user: { token: this.props.user.token } };
    return this.props.getInfo(data);
  };

  /** @description Grabs token for logged in users
   *  @param {String} token - JWT to pass to server
   *  @returns {Promise}
   */
  getHearts = (token = null) => {
    // make sure user is logged in
    if (!token) return;

    // construct API-required data
    const credentials = { user: { token } };
    return this.props
      .getHearts(credentials)
      .catch(err => console.log(err.message));
  };
}

const mapStateToProps = state => ({
  sauces: state.sauces.allIds,
  user: {
    token: state.users.self.token,
    email: state.users.email || "",
    hearts: state.users.hearts || []
  }
});

const mapDispatchToProps = {
  getSauces,
  getInfo,
  flashError,
  toggleSauce,
  getHearts
};

export default connect(mapStateToProps, mapDispatchToProps)(Sauces);
