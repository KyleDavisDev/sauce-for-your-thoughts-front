import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import queryString from "query-string";
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
    total: PropTypes.number.isRequired,
    getSauces: PropTypes.func.isRequired,
    getInfo: PropTypes.func.isRequired,
    flashError: PropTypes.func.isRequired,
    getHearts: PropTypes.func.isRequired,
    location: PropTypes.shape({
      search: PropTypes.string.isRequired
    }).isRequired
  };

  constructor(props) {
    super(props);

    // page and limit will be held in local state since it will only be used here and by Pagination
    this.state = {
      page: 1,
      limit: 6
    };
  }

  componentDidMount() {
    const { token } = this.props.user;

    // Get limit and page from query search
    // I.E. '?page=3&limit=2' => {page: '3', limit: '2'}
    const { limit = 6, page = 1 } = queryString.parse(
      this.props.location.search
    );
    console.log("componentdidmount");

    axios
      .all([this.getSauces({ page, limit }), this.getHearts(token)])
      .catch(error => {
        console.log(error);
        this.props.flashError({ text: error.response.data.msg });
      });
  }

  componentWillReceiveProps(nextProps) {
    // Get limit and page from location search
    // I.E. '?page=3&limit=2' => {page: '3', limit: '2'}
    let { limit = 6, page = 1 } = queryString.parse(nextProps.location.search);
    limit = parseInt(limit);
    page = parseInt(page);
    console.log("willreceive", limit, page);

    // this.getSauces({ page, limit });
    this.setState({ limit, page });
  }

  shouldComponentUpdate(nextProps, nextState) {
    // Only update if:
    // 1. The page value has changed OR
    // 2. The limit value has changed OR
    // 3. The query string has been updated
    // return true;
    console.log(
      nextProps.location.search !== this.props.location.search,
      nextProps.sauces !== this.props.sauces
    );
    return (
      nextProps.location.search !== this.props.location.search ||
      nextProps.sauces !== this.props.sauces
    );
  }

  render() {
    const { sauces, total } = this.props;
    const { page, limit } = this.state;

    return (
      <div className="inner">
        <h2>Sauces</h2>
        <div className="sauces">
          {sauces.length > 0 &&
            sauces
              // .slice((page - 1) * limit, page * limit)
              .map(sauce => <Card _id={sauce} key={sauce} />)}
        </div>
        <Pagination total={total} page={page} limit={limit} />
      </div>
    );
  }

  /** @description Grabs all sauces, related reviews, and related users
   *  @param {Number|String} limit - limits the number of sauces returned
   *  @param {Number|String} page - current page the user is on.
   *  @returns {Promise}
   */
  getSauces = ({ limit, page }) => {
    // Simple guard clause
    if (!limit || !page) return;

    // Make sure we are passed number or string only
    const limitType = Object.prototype.toString.call(limit);
    const pageType = Object.prototype.toString.call(page);
    if (
      (limitType !== "[object Number]" && limitType !== "[object String]") ||
      (pageType !== "[object Number]" && pageType !== "[object String]")
    )
      return;

    // Convert string to int if needed
    const limitToProperType =
      limitType === "[object String]" ? parseInt(limit) : limit;

    // Convert string to int if needed
    const pageToProperType =
      pageType === "[object String]" ? parseInt(page) : page;

    this.props.getSauces({ limit: limitToProperType, page: pageToProperType });
  };

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
  sauces: state.sauces.allIds || [],
  user: {
    token: state.users.self.token,
    email: state.users.email || "",
    hearts: state.users.hearts || []
  },
  total: state.sauces.total || 50
});

const mapDispatchToProps = {
  getSauces,
  getInfo,
  flashError,
  toggleSauce,
  getHearts
};

export default connect(mapStateToProps, mapDispatchToProps)(Sauces);
