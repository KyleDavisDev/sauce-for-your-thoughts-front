import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import AddForm from "./AddForm.js";
import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Add extends Component {
  componentDidMount() {
    if (!this.props.isAuthenticated) {
      this.props.history.push("/login");
    }
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Store</h2>
        <AddForm />
      </div>
    );
  }

  handleFormSubmit = (e, store) => {
    console.log(store);
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
        if (Checker.isObject(response.data) && response.data.isGood) {
          this.props.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: response.data.msg
          });
        } else if (Checker.isObject(response.data) && !response.data.isGood) {
          this.props.createFlashMessage({
            type: "error",
            text: response.data.msg
          });
        } else {
          this.props.createFlashMessage({
            type: "error",
            text:
              "You it. You have broken the page. I can't believe you did this...."
          });
        }
      })
      .catch(error => {
        console.log("Errror");
        this.props.createFlashMessage({
          type: "error",
          text: "Something broke!"
        });
      });
  };
}

Add.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}
export default connect(mapStateToProps, {})(Add);
