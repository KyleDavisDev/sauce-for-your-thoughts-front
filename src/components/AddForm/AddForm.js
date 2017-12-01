import React, { Component } from "react";
import PropTypes from "prop-types";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import TextInput from "../TextInput/TextInput.js";

import FillerImage from "../../images/photos/store.jpg";

class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: {
        name: "",
        description: "",
        tags: [
          { name: "Wifi", isChecked: false },
          { name: "Open Late", isChecked: false },
          { name: "Vegatarian", isChecked: false },
          { name: "Licensed", isChecked: false },
          { name: "Family Friendly", isChecked: false }
        ],
        location: {
          address: "a",
          latitude: "",
          longitude: ""
        },
        photo: {}
      },
      errors: {
        name: "",
        description: "",
        location: "",
        photo: ""
      }
    };
  }

  // componentWillReceiveProps(nextProps) {
  //   const {
  //     storeName,
  //     storeDescription,
  //     storeAddress,
  //     storeLongitude,
  //     storeLatitude,
  //     storePhoto
  //   } = nextProps;

  //   //compare prop tags with current state tag to see which checkbox
  //   //should be initiated as checked
  //   const tags = this.state.tags.map(tag => {
  //     if (nextProps.tags.includes(tag.name)) {
  //       tag.isChecked = true;
  //     } else {
  //       tag.isChecked = false;
  //     }
  //     return tag;
  //   });

  //   //update state
  //   this.setState({
  //     storeName,
  //     storeDescription,
  //     tags,
  //     location: {
  //       storeAddress,
  //       storeLongitude,
  //       storeLatitude
  //     },
  //     storePhoto
  //   });
  // }

  render() {
    let dropzoneRef;
    const { name, description, tags, location, photo } = this.state.data;
    return (
      <form
        onSubmit={this.handleSubmit}
        name="addForm"
        className="form"
        encType="multipart/form-data"
      >
        <TextInput
          id="name"
          name="Name"
          type="text"
          onChange={this.onChange}
          value={name}
        />

        <label htmlFor="description">Description: </label>
        <textarea
          id="description"
          name="Description"
          cols="30"
          rows="10"
          onChange={this.onChange}
          value={description}
        />

        <label htmlFor="photo"> Photo: </label>

        <label htmlFor="address"> Address: </label>
        <PlacesAutocomplete
          inputProps={{
            value: location.address,
            onChange: this.onChangeAddress
          }}
          id="address"
          name="address"
          onSelect={this.handleAddressSelect}
        />

        <TextInput
          id="longitude"
          name="Address Longitude"
          type="text"
          onChange={this.onChangeLocation}
          value={location.longitude}
          placeholder="Click or press enter in Address autocomplete to generate"
        />

        <TextInput
          id="latitude"
          name="Address Latitude"
          type="text"
          onChange={this.onChangeLocation}
          value={location.latitude}
          placeholder="Click or press enter in Address autocomplete to generate"
        />

        <ul className="tags">
          {tags.map(tag => {
            return (
              <div key={tag.name} className="tag tag-choice">
                <input
                  type="checkbox"
                  id={tag.name}
                  name={tag.name}
                  value={tag.name}
                  checked={tag.isChecked}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor={tag.name}>{tag.name}</label>
              </div>
            );
          })}
        </ul>

        <button type="submit" className="button">
          Save ->
        </button>
      </form>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    //destroy object to avoid memory leaks -- suggested by Dropzone documentations
    if (this.state.data.photo.preview) {
      window.URL.revokeObjectURL(this.state.data.photo.preview);
    }

    const data = this.state.store;
    this.props.onFormSubmit(data);
  }

  onChange = e => {
    this.setState({
      ...this.state,
      data: { ...this.state.data, [e.target.name]: e.target.value }
    });
  };

  onChangeLocation = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        location: {
          ...this.state.data.location,
          [e.target.name]: e.target.value
        }
      }
    });
  };

  onChangeAddress = address => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        location: {
          ...this.state.data.location,
          address
        }
      }
    });
  };

  onFileUploadChange = (acceptedFile, rejectedFile) => {
    const reader = new FileReader();
    console.log(acceptedFiles);
    console.log(rejectedFiles);
    this.setState({
      ...this.state,
      data: { ...this.state.data, photo: acceptedFile[0] }
    });
  };

  handleAddressSelect = (address, placeId) => {
    geocodeByAddress(address)
      .then(results => {
        const address = results[0].formatted_address;
        const latitude = parseFloat(results[0].geometry.location.lat()).toFixed(
          7
        );
        const longitude = parseFloat(
          results[0].geometry.location.lng()
        ).toFixed(7);
        this.setState({
          ...this.state,
          data: {
            ...this.state.data,
            location: { address, latitude, longitude }
          }
        });
      })
      .catch(error => console.error("Error", error));
  };

  handleCheckboxChange = e => {
    //find which array element was clicked and flip that elements isChecked value
    const tags = this.state.data.tags.map(tag => {
      if (tag.name === e.target.name) {
        tag.isChecked = !tag.isChecked;
      }
      return tag;
    });

    this.setState({
      ...this.state,
      data: { ...this.state.data, tags }
    });
  };
}

StoreForm.propTypes = {};

module.exports = StoreForm;
