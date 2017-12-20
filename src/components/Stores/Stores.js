import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { getStores } from "../../actions/stores";

import StoreCard from "../StoreCard/StoreCard.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [],
      user: {
        id: ""
      }
    };
  }

  //make sure user is allowed to be here
  componentWillMount() {}

  componentDidMount() {
    axios
      .all([this.getStores()])
      .then(axios.spread(stores => {}))
      .catch(error => {
        console.log("hello");
        console.log(error);
      });
  }

  render() {
    const stores = this.props.stores || [];
    return (
      <div className="inner">
        <h2>Stores</h2>
        <div className="stores">
          {/* {stores.length > 0 &&
            stores.map(store => {
              return (
                <StoreCard
                  displayEditIcon={
                    this.state.userID === store.author ? true : false
                  }
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
    return this.props.getStores(range).then(res => console.log(res));
  };

  getUserID = () => {
    return axios;
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
    id: PropTypes.bool.isRequired
  }),
  getStores: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    stores: state.stores,
    user: {
      id: !!state.user.token
    }
  };
};

const mapDispatchToProps = {
  getStores
};

export default connect(mapStateToProps, mapDispatchToProps)(Stores);
