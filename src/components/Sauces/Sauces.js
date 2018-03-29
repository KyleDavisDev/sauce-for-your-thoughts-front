import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import hashmapPropType from "hashmap-prop-type";
import { connect } from "react-redux";
import { getSauces, cleanUpSauces } from "../../redux/actions/sauces";
import { flashError } from "../../redux/actions/flash";
import { getInfo, toggleSauce, getHearts } from "../../redux/actions/user";
import Card from "../Card/Card.js";
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
    cleanUpSauces: PropTypes.func.isRequired,
    toggleSauce: PropTypes.func.isRequired,
    getInfo: PropTypes.func.isRequired,
    flashError: PropTypes.func.isRequired,
    getHearts: PropTypes.func.isRequired
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
    axios
      .all([this.getSauces() /* this.getUserID(), this.getHearts() */])
      .catch(error => {
        console.log(error);
        // this.props.flashError({ text: error.response.data.msg });
      });
  }

  componentWillReceiveProps(nextProps) {
    const page = parseInt(nextProps.match.params.pageNum) || 1;
    this.setState({ page });
  }

  componentWillUnmount() {
    this.props.cleanUpSauces();
  }

  render() {
    const sauces = this.props.sauces || [];
    const email = this.props.user.email || "";
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

  renderCards = ({ sauce, email }) => {
    const hearts = this.props.user.hearts || [];
    const displayHeartIcon = !!this.props.user.token;
    return (
      <Card
        displayEditIcon={email === sauce.author}
        displayHeartIcon={displayHeartIcon}
        heart={hearts.includes(sauce._id)}
        toggleSauce={this.toggleSauce}
        ID={sauce._id}
        name={sauce.name}
        image={sauce.photo}
        slug={sauce.slug}
        description={sauce.description}
        key={sauce.slug}
      />
    );
  };

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

  getHearts = () => {
    // make sure user is logged in
    if (!this.props.user.token) return;

    const credentials = { user: { token: this.props.user.token } };
    return this.props.getHearts(credentials);
  };

  toggleSauce = ID => {
    const data = { user: { token: this.props.user.token }, sauce: { _id: ID } };
    this.props
      .toggleSauce(data)
      .catch(err => this.props.flashError({ text: err.response }));
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
  cleanUpSauces,
  getInfo,
  flashError,
  toggleSauce,
  getHearts
};

export default connect(mapStateToProps, mapDispatchToProps)(Sauces);
