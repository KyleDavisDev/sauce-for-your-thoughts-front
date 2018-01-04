import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getInfo as getUserInfo } from "../../actions/user";
import { getSauceById as getSauceInfo, updateSauce } from "../../actions/sauce";
import { flashError } from "../../actions/flash";

import Form from "./Form.js";

import Auth from "../../Helper/Auth/Auth.js";

class Edit extends Component {
  constructor(props) {
    super(props);

    //This state will only be used to set default data for the form component
    this.state = {
      sauce: {
        name: "Name",
        description: "Description",
        photo: "Str",
        tags: [""],
        location: { address: "", coordinates: [] }
      }
    };
  }

  componentDidMount() {
    axios.all([this.getSauceInfo(), this.getUserInfo()]).catch(error => {
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
      Object.keys(this.props.sauce).length > 0
        ? this.props.sauce
        : this.state.sauce;

    return (
      <div className="inner">
        <h2>Edit {name || "Sauce"}</h2>
        {Object.keys(this.props.sauce).length > 0 && (
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

  //get single sauce information
  //must pass user token and ID we are looking for
  getSauceInfo = () => {
    //check to see if sauces have already been passed to component to save an api call
    if (this.props.sauce && Object.keys(this.props.sauce).length > 0) return;
    const sauceID = this.props.match.params.id;
    const token = this.props.user.token;
    const data = { token, sauceID };
    return this.props.getSauceInfo(data);
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
    formData.append("sauceID", this.props.match.params.id);
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.photo.file);
    formData.append("address", data.location.address);
    formData.append("coordinates", coordinates);
    formData.append("tags", tags);
    formData.append("token", Auth.getToken());

    this.props
      .updateSauce(formData)
      .then(res => {
        this.props.history.push(`/sauce/${res.sauce.slug}`);
      })
      .catch(err => console.log(err));
  };
}

Edit.propTypes = {};

const mapStateToProps = state => {
  return {
    sauce: state.sauce,
    user: { token: state.user.token, email: state.user.email }
  };
};

const mapDispatchToProps = {
  getSauceInfo,
  getUserInfo,
  flashError,
  updateSauce
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
