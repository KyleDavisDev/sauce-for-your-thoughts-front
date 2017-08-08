import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import StoreForm from "../StoreForm/StoreForm.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker";

class StoreEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        name: "",
        description: "",
        tags: [""],
        location: { address: "", coordinates: ["", ""] },
        photo: ""
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.getStoreInfo = this.getStoreInfo.bind(this);
  }

  componentDidMount() {
    this.getStoreInfo();
  }

  render() {
    return (
      <div className="inner">
        <h2>
          Edit {this.state.store.name || "Store"}
        </h2>
        {Object.keys(this.state.store).length > 0 &&
          <StoreForm
            onFormSubmit={this.handleFormSubmit}
            storeName={this.state.store.name}
            storeDescription={this.state.store.description}
            storePhoto={this.state.store.photo}
            tags={this.state.store.tags}
            storeAddress={this.state.store.location.address}
            storeLongitude={this.state.store.location.coordinates[0]}
            storeLatitude={this.state.store.location.coordinates[1]}
          />}
      </div>
    );
  }

  getStoreInfo() {
    //TODO sanity checks to be sure the ID passed is legit
    const storeID = this.props.id;

    axios({
      method: "post",
      url: "http://localhost:7777/api/store/id/get",
      data: {
        storeID,
        token: Auth.getToken()
      }
    })
      .then(response => {
        //only need to check if response is object once
        //then see if isGood is true or false and go from there.
        if (Checker.isObject(response)) {
          if (response.data.isGood) {
            this.setState({ store: response.data.store });
          } else if (!response.data.isGood) {
            this.props.createFlashMessage({
              type: "caution",
              msg: response.data.msg
            });
          }
        } else {
          this.props.createFlashMessage({
            type: "error",
            msg: "Something goof'd up. Try reloading the page."
          });
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  handleFormSubmit(e, store) {
    e.preventDefault();

    const storeID = this.props.id;

    //make tags an array of checked tags
    const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);
    //round location to 6 decimal places and convert to string
    const coordinates = [
      parseFloat(store.location.storeLongitude).toFixed(7) || "",
      parseFloat(store.location.storeLatitude).toFixed(7) || ""
    ];

    const data = new FormData();
    data.append("name", store.storeName);
    data.append("description", store.storeDescription);
    data.append("image", store.storePhoto);
    data.append("address", store.location.storeAddress);
    data.append("coordinates", coordinates);
    data.append("tags", tags);
    data.append("token", Auth.getToken());
    data.append("storeID", storeID);

    //TODO filter/sanitize user input
    axios({
      method: "post",
      url: `http://localhost:7777/api/store/id/edit`,
      data,
      options: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.data.errors) {
          this.props.createFlashMessage({
            type: "error",
            text: response.data.errors
          });
        } else {
          this.setState({ store: response.data });
          this.props.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Your store was updated!"
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.props.createFlashMessage({
          type: "error",
          text: "Try again."
        });
      });
  }
}

StoreEdit.propTypes = {
  createFlashMessage: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

module.exports = StoreEdit;
