import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getSauces } from "../../actions/sauces";
import { getInfo } from "../../actions/user";
import { flashError } from "../../actions/flash";
import Card from "../Sauce/Card.js";

import Auth from "../../helper/Auth/Auth.js";

class Sauces extends Component {
  componentDidMount() {
    axios.all([this.getSauces(), this.getUserID()]).catch(error => {
      this.props.flashError({ text: error.response.data.msg });
    });
  }

  render() {
    const sauces = this.props.sauces || [];
    const email = this.props.user.email || "";
    return (
      <div className="inner">
        <h2>Sauces</h2>
        <div className="sauces">
          {sauces.length > 0 &&
            sauces.map(sauce => {
              return (
                <Card
                  displayEditIcon={email === sauce.author ? true : false}
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
      </div>
    );
  }

  getSauces = range => {
    return this.props.getSauces(range);
  };

  getUserID = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };
    return this.props.getInfo(data);
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
  flashError
};

export default connect(mapStateToProps, mapDispatchToProps)(Sauces);
