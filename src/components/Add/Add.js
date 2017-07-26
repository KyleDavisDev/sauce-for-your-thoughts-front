import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";

import StoreForm from "../StoreForm/StoreForm.js";
import Auth from "../../helper/Auth/Auth.js";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        name: "",
        description: "",
        tags: [""],
        location: { address: "", coordinates: ["", ""] }
      }
    };

    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Store</h2>
        <StoreForm
          onFormSubmit={this.handleFormSubmit}
          didPostWork={this.state.didPostWork}
        />
      </div>
    );
  }

  handleFormSubmit(e, store) {
    e.preventDefault();

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

    //TODO filter/sanitize user input
    axios({
      method: "post",
      url: "http://localhost:7777/api/store/add",
      data,
      options: { headers: { "Content-Type": "multipart/form-data" } }
    })
      .then(response => {
        if (response.data.errors) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out
          //create error message
          this.props.createFlashMessage({
            type: "error",
            text: response.data.errors
          });

          //making this false will keep data in the form and not reset it
          this.setState({ didPostWork: false });
        } else {
          //response.data holds the slug of the store added
          //create success message
          this.props.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Your store was added!"
          });

          //reset form
          this.setState({ didPostWork: true });
        }
      })
      .catch(error => {
        this.props.createFlashMessage({
          type: "error",
          text: "Something broke!"
        });
        this.setState({ didPostWork: false });
      });
  }
}

Add.propTypes = {
  createFlashMessage: PropTypes.func.isRequired
};

module.exports = Add;
