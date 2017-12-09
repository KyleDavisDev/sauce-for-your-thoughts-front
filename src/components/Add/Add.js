import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addStore } from "../../actions/store";

import AddForm from "../AddForm/AddForm.js";
import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker.js";

class Add extends Component {
  componentDidMount() {}

  render() {
    return (
      <div className="inner">
        <h2>Add Store</h2>
        <AddForm onSubmit={this.handleFormSubmit} />
      </div>
    );
  }

  handleFormSubmit = data => {
    //make tags an array of checked tags
    const tags = data.tags.filter(tag => tag.isChecked).map(tag => tag.name);
    //round location to 6 decimal places and convert to string
    const coordinates = [
      parseFloat(data.location.longitude).toFixed(7) || "",
      parseFloat(data.location.latitude).toFixed(7) || ""
    ];

    //construct FormData object since we are passing image file
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.photo.file);
    formData.append("address", data.location.address);
    formData.append("coordinates", coordinates);
    formData.append("tags", tags);
    formData.append("token", Auth.getToken());

    this.props
      .addStore(formData)
      .then(res => console.log(res).catch(err => console.log(err)));
  };
}

Add.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  addStore: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.user.token
  };
}
export default connect(mapStateToProps, { addStore })(Add);
