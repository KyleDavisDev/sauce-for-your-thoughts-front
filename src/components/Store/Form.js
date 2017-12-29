import React, { Component } from "react";
import PropTypes from "prop-types";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";

import FillerImage from "../../images/photos/store.jpg";

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeName: "",
      storeDescription: "",
      tags: [
        { name: "Wifi", isChecked: false },
        { name: "Open Late", isChecked: false },
        { name: "Vegatarian", isChecked: false },
        { name: "Licensed", isChecked: false },
        { name: "Family Friendly", isChecked: false }
      ],
      location: {
        storeAddress: "",
        storeLatitude: "",
        storeLongitude: ""
      },
      storePhoto: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.onFileUploadChange = this.onFileUploadChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.handleLongitudeChange = this.handleLongitudeChange.bind(this);
    this.handleLatitudeChange = this.handleLatitudeChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {
      storeName,
      storeDescription,
      storeAddress,
      storeLongitude,
      storeLatitude,
      storePhoto
    } = nextProps;

    //compare prop tags with current state tag to see which checkbox
    //should be initiated as checked
    const tags = this.state.tags.map(tag => {
      if (nextProps.tags.includes(tag.name)) {
        tag.isChecked = true;
      } else {
        tag.isChecked = false;
      }
      return tag;
    });

    //update state
    this.setState({
      storeName,
      storeDescription,
      tags,
      location: {
        storeAddress,
        storeLongitude,
        storeLatitude
      },
      storePhoto
    });
  }

  render() {
    const inputProps = {
      value: this.state.location.storeAddress,
      onChange: this.handleAddressChange
    };

    return (
      <form
        onSubmit={this.handleSubmit}
        name="addForm"
        className="form"
        encType="multipart/form-data"
      >
        <label htmlFor="storeName"> Name: </label>
        <input
          id="storeName"
          name="storeName"
          type="text"
          onChange={this.handleNameChange}
          value={this.state.storeName}
        />

        <label htmlFor="storeDescription">Description: </label>
        <textarea
          id="storeDescription"
          name="storeDescription"
          cols="30"
          rows="10"
          onChange={this.handleDescriptionChange}
          value={this.state.storeDescription}
        />

        <label htmlFor="storePhoto"> Photo: </label>
        <div className="dropZoneHolder" />

        <label htmlFor="storeAddress"> Address: </label>
        <PlacesAutocomplete
          inputProps={inputProps}
          id="storeAddress"
          name="storeAddress"
          onSelect={this.handleAddressSelect.bind(this)}
        />

        <label htmlFor="storeLongitude"> Address Longitude: </label>
        <input
          id="storeLongitude"
          name="storeLongitude"
          type="text"
          onChange={this.handleLongitudeChange}
          value={this.state.location.storeLongitude}
          placeholder="Click or press enter in Address autocomplete to generate"
        />

        <label htmlFor="storeLatitude"> Address Latitude: </label>
        <input
          id="storeLatitude"
          name="storeLatitude"
          type="text"
          onChange={this.handleLatitudeChange}
          value={this.state.location.storeLatitude}
          placeholder="Click or press enter in Address autocomplete to generate"
        />

        <ul className="tags">
          {this.state.tags.map(tag => {
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

  handleSubmit(event) {
    //destroy object to avoid memory leaks -- suggested by Dropzone documentations
    if (this.state.storePhoto.preview) {
      window.URL.revokeObjectURL(this.state.storePhoto.preview);
    }

    //call function passed by parent
    this.props.onFormSubmit(event, this.state);
  }

  handleNameChange(event) {
    this.setState({ storeName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ storeDescription: event.target.value });
  }

  onFileUploadChange(files) {
    this.setState({ storePhoto: files[0] });
  }

  handleAddressChange(event) {
    const location = this.state.location;
    location.storeAddress = event;
    this.setState({ location });
  }

  handleAddressSelect(address, placeId) {
    geocodeByAddress(address)
      .then(results => {
        const location = this.state.location;
        location.storeAddress = results[0].formatted_address;
        location.storeLatitude = results[0].geometry.location.lat();
        location.storeLongitude = results[0].geometry.location.lng();
        this.setState({ location });
      })
      .catch(error => console.error("Error", error));
  }

  handleLongitudeChange(event) {
    const location = this.state.location;
    location.storeLongitude = event.target.value;
    this.setState({ location });
  }

  handleLatitudeChange(event) {
    const location = this.state.location;
    location.storeLatitude = event.target.value;
    this.setState({ location });
  }

  handleCheckboxChange(event) {
    //find which array element was clicked and flip that elements isChecked value
    const tags = this.state.tags.map(tag => {
      if (tag.name === event.target.name) {
        tag.isChecked = !tag.isChecked;
      }
      return tag;
    });

    this.setState({
      tags
    });
  }
}

Form.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  storeName: PropTypes.string,
  storeDescription: PropTypes.string,
  tags: PropTypes.array,
  storePhoto: PropTypes.string,
  storeAddress: PropTypes.string,
  storeLongitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  storeLatitude: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};

module.exports = Form;
