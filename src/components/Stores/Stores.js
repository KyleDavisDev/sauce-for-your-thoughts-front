import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStores } from "../../actions/stores";
import { getInfo } from "../../actions/user";
import { flashError } from "../../actions/flash";
import StoreCard from "../StoreCard/StoreCard.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Stores extends Component {
  componentDidMount() {
    axios.all([this.getStores(), this.getUserID()]).catch(error => {
      this.props.flashError({ text: error.response.data.msg });
    });
  }

  render() {
    const stores = this.props.stores || [];
    const _id = this.props.user._id || "";
    return (
      <div className="inner">
        <h2>Stores</h2>
        <div className="stores">
          {/* {stores.length > 0 &&
            stores.map(store => {
              return (
                <StoreCard
                  displayEditIcon={_id === store.author ? true : false}
                  ID={store._id}
                  name={store.name}
                  image={store.photo}
                  slug={store.slug}
                  description={store.description}
                  key={store.slug}
                />
              );
            })} */}
        </div>
      </div>
    );
  }

  getStores = range => {
    //check to see if stores have already been passed to component to save an api call
    if (this.props.stores) return;
    return this.props.getStores(range);
  };

  getUserID = () => {
    //check if _id already passed to component to save api call
    if (this.props._id) return;
    const data = { token: this.props.user.token };
    return this.props.getInfo(data);
  };
}

Stores.propTypes = {
  stores: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string,
      author: PropTypes.string,
      description: PropTypes.string,
      name: PropTypes.string,
      photo: PropTypes.string,
      slug: PropTypes.string
    })
  ),
  user: PropTypes.shape({
    token: PropTypes.string.isRequired,
    _id: PropTypes.string
  }),
  getStores: PropTypes.func.isRequired,
  getInfo: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    stores: state.stores,
    user: {
      token: state.user.token,
      _id: state.user._id
    }
  };
};

const mapDispatchToProps = {
  getStores,
  getInfo,
  flashError
};

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
