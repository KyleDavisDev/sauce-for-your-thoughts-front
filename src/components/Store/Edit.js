import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo as getUserInfo } from "../../actions/user";
import { getStoreById as getStoreInfo, updateStore } from "../../actions/store";
import { flashError } from "../../actions/flash";

import Form from "./Form.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker";

class Edit extends Component {
  constructor(props) {
    super(props);

    //This state will only be used to set default data for the form component
    this.state = {
      store: {
        name: "Name",
        description: "Description",
        photo: "Str",
        tags: [""],
        location: { address: "", coordinates: [] }
      }
    };
  }

  componentDidMount() {
    axios.all([this.getStoreInfo(), this.getUserInfo()]).catch(error => {
      console.log(error);
      // this.props.flashError({ text: error.response.data.msg });
    });
  }

  render() {
    const {
      name,
      description,
      photo,
      tags,
      location: { address, coordinates: [longitude, latitude] }
    } =
      Object.keys(this.props.store).length > 0
        ? this.props.store
        : this.state.store;

    return (
      <div className="inner">
        <h2>Edit {name || "Store"}</h2>
        {Object.keys(this.props.store).length > 0 && (
          <Form
            onSubmit={this.handleSubmit}
            name={name}
            description={description}
            photo={photo}
            tags={tags}
            address={address}
            longitude={longitude}
            latitude={latitude}
          />
        )}
      </div>
    );
  }

  //get information about user
  getUserInfo = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };
    return this.props.getUserInfo(data);
  };

  //get single store information
  //must pass user token and ID we are looking for
  getStoreInfo = () => {
    //check to see if stores have already been passed to component to save an api call
    if (this.props.store && Object.keys(this.props.store).length > 0) return;
    const storeID = this.props.match.params.id;
    const token = this.props.user.token;
    const data = { token, storeID };
    return this.props.getStoreInfo(data);
  };

  handleSubmit = data => {
    //make tags an array of checked tags
    const tags = data.tags.filter(tag => tag.isChecked).map(tag => tag.name);
    //round location to 6 decimal places and convert to string
    const coordinates = [
      parseFloat(data.location.longitude).toFixed(7) || "",
      parseFloat(data.location.latitude).toFixed(7) || ""
    ];

    //construct FormData object since we are passing image file
    const formData = new FormData();
    formData.append("storeID", this.props.match.params.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.photo.file);
    formData.append("address", data.location.address);
    formData.append("coordinates", coordinates);
    formData.append("tags", tags);
    formData.append("token", Auth.getToken());

    this.props
      .updateStore(formData)
      .then(res => {
        this.props.history.push(`/store/${res.store.slug}`);
      })
      .catch(err => console.log(err));
  };
}

Edit.propTypes = {};

const mapStateToProps = state => {
  return {
    store: state.store,
    user: { token: state.user.token, email: state.user.email }
  };
};

const mapDispatchToProps = {
  getStoreInfo,
  getUserInfo,
  flashError,
  updateStore
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
