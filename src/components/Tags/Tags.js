import React, { Component } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

import Card from "../Store/Card.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";


//TODO: Configure API calls such that any time the user decides to change tag filter, we do not have
//post the token and see if person owns the store or not.

class Tags extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      tags: {},
      stores: {}
    };

    this.apiGetStoresAndUserID = this.apiGetStoresAndUserID.bind(this);
  }

  componentDidMount() {
    const tag = this.props.match.params.tag || "";
    this.setState({ title: tag });

    this.apiGetStoresAndUserID(tag);
  }

  componentWillReceiveProps(nextProps) {
    const tag = nextProps.match.params.tag;
    this.setState({ title: tag });

    this.apiGetStoresAndUserID(tag);
  }

  render() {
    return (
      <div className="inner">
        <h2>
          {this.state.title ? this.state.title : "Tags"}
        </h2>
        {this.state.tags.length > 0 &&
          <ul className="tags">
            {this.state.tags.map(tag => {
              return (
                <li key={tag._id} className="tag">
                  <NavLink
                    activeClassName="tag-link-active"
                    to={`/tags/${tag._id}`}
                    className="tag-link"
                  >
                    <span className="tag-text">
                      {tag._id}
                    </span>
                    <span className="tag-count">
                      {tag.count}
                    </span>
                  </NavLink>
                </li>
              );
            })}
          </ul>}
        {this.state.stores.length > 0 &&
          <div className="stores">
            {this.state.stores.map(store => {
              return (
                <Card
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
          </div>}
      </div>
    );
  }

  getStores(tag) {
    tag = tag === "" ? "all" : tag;
    return axios.get(`http://localhost:7777/api/tags/${tag}/get`);
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

  apiGetStoresAndUserID(tag) {
    //need this slight work around because "this" is not Stores component inside the .all scope
    let that = this;
    axios.all([that.getStores(tag), that.getUserID()]).then(
      axios.spread((response, user) => {
        //we will build state
        let stateBuilder = {};
        //check to make sure object returned
        if (Checker.isObject(response.data)) {
          //success or not
          if (response.data.isGood) {
            stateBuilder = {
              tags: response.data.tags,
              stores: response.data.stores,
              ...stateBuilder
            };

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
    );
  }
}

module.exports = Tags;
