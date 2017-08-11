import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from "prop-types";

import StoreCard from "../StoreCard/StoreCard.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: {},
      userID: ""
    };
  }

  componentDidMount() {
    //need this slight work around because "this" is not Stores component inside the .all scope
    const that = this;
    axios
      .all([that.getStores(), that.getUserID()])
      .then(
        axios.spread((stores, user) => {
          //we will build state
          let stateBuilder = {};
          //check to make sure object returned
          if (Checker.isObject(stores.data)) {
            //success or not
            if (stores.data.isGood) {
              stateBuilder = { stores: stores.data.stores, ...stateBuilder };

              //only if we make it here are we concerned whether or not person is logged in
              if (Checker.isObject(user.data) && user.data.isGood) {
                stateBuilder = { userID: user.data.user._id, ...stateBuilder };
              }
            } else {
              this.props.createFlashMessage({
                type: "error",
                msg: stores.data.msg
              });
            }
          } else {
            this.props.createFlashMessage({
              type: "error",
              msg: "Something is broken! Try reloading the page."
            });
          }

          this.setState(stateBuilder);
        })
      )
      .catch(error => {
        this.props.createFlashMessage({
          type: "error",
          msg: "Something is broken! Try reloading the page."
        });
      });
  }

  render() {
    return (
      <div className="inner">
        <h2>Stores</h2>
        <div className="stores">
          {this.state.stores.length > 0 &&
            this.state.stores.map(store => {
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
            })}
        </div>
      </div>
    );
  }

  getStores() {
    return axios.get("http://localhost:7777/api/stores/get");
  }

  getUserID() {
    return (
      Auth.isUserAuthenticated() &&
      axios({
        method: "post",
        url: "http://localhost:7777/account/getInfo",
        data: { token: Auth.getToken() }
      })
    );
  }
}

Stores.propTypes = {
  createFlashMessage: PropTypes.func.isRequired,
  closeFlashMessage: PropTypes.func.isRequired
};

module.exports = Stores;
