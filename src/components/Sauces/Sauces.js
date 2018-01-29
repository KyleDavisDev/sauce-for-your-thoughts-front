import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSauces } from "../../actions/sauces";
import { getInfo } from "../../actions/user";
import { flashError } from "../../actions/flash";
import { heartSauce, unHeartSauce } from "../../actions/user";
import Card from "../Sauce/Card.js";
import Pagination from "./Pagination";

class Sauces extends Component {
  constructor(props) {
    super(props);

    //page and saucePerPage will be held in local state since it will only be used here and by Pagination
    this.state = {
      page: 1,
      saucePerPage: 6
    };
  }
  componentDidMount() {
    axios.all([this.getSauces(), this.getUserID()]).catch(error => {
      this.props.flashError({ text: error.response.data.msg });
    });
  }

  componentWillReceiveProps(nextProps) {
    const page = parseInt(nextProps.match.params.pageNum) || 1;
    this.setState({ page });
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
              .map(sauce => {
                return (
                  <Card
                    displayEditIcon={email === sauce.author ? true : false}
                    heart={sauce.heart}
                    heartSauce={this.heartSauce}
                    unHeartSauce={this.unHeartSauce}
                    ID={sauce._id}
                    name={sauce.name}
                    image={sauce.photo}
                    slug={sauce.slug}
                    description={sauce.description}
                    key={sauce.slug}
                  />
                );
              })}
        </div>
        <Pagination
          total={sauces.length}
          page={this.state.page}
          saucePerPage={this.state.saucePerPage}
        />
      </div>
    );
  }

  getSauces = () => {
    const data = { token: this.props.user.token };
    return this.props.getSauces(data);
  };

  //this will pass token to api and store email/name into redux store on success
  getUserID = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };
    return this.props.getInfo(data);
  };

  heartSauce = ID => {
    const data = { token: this.props.user.token, sauce: { _id: ID } };
    this.props.heartSauce(data).catch(err => console.log(err));
  };

  unHeartSauce = ID => {
    const data = { token: this.props.user.token, sauce: { _id: ID } };
    this.props.unHeartSauce(data).catch(err => console.log(err));
  };
}

Sauces.propTypes = {
  sauces: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      author: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      photo: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired
    })
  ),
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    email: PropTypes.string
  }),
  getSauces: PropTypes.func.isRequired,
  unHeartSauce: PropTypes.func.isRequired,
  heartSauce: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    sauces: state.sauces,
    user: {
      token: state.user.token,
      email: state.user.email
    }
  };
};

const mapDispatchToProps = {
  getSauces,
  getInfo,
  flashError,
  heartSauce,
  unHeartSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(Sauces);
