import React, { Component } from "react";
import PropTypes from "prop-types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Dropzone from "react-dropzone";
import TextInput from "../TextInput/TextInput.js";
import _addTemplate from "./_addTemplate";

const CheckBoxList = ({ tags, onChange }) => (
  <ul className="tags">
    {tags.map(tag => (
      <div key={tag.name} className="tag tag-choice">
        <input
          type="checkbox"
          id={tag.name}
          name={tag.name}
          value={tag.name}
          checked={tag.isChecked}
          onChange={onChange}
        />
        <label htmlFor={tag.name}>{tag.name}</label>
      </div>
    ))}
  </ul>
);
CheckBoxList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

const PhotoUpload = ({ text, onChange }) => (
  <div className="input-group">
    <span className="file-button">
      Browse...<input
        type="file"
        name="photo"
        accept=".png, .jpg"
        onChange={onChange}
      />
    </span>
    <input type="text" value={text || ""} readOnly />
  </div>
);
PhotoUpload.propTypes = {
  text: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

class AddSauce extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      data: _addTemplate,
      errors: _addTemplate
    };
  }

  render() {
    const {
      name,
      description,
      photo,
      maker,
      location,
      ingrediants
    } = this.state.data;

    return (
      <form
        name="addForm"
        className="form"
        encType="multipart/form-data"
        onSubmit={this.onSubmit}
      >
        <div className="container" id="sauce__details">
          <div className="container__left">
            <h4>Details</h4>
            <span>
              Information about the sauce only. Sauce name, maker lorum ipusum
              etc etc.
            </span>
          </div>
          <div className="container__right">
            <div className="container__input">
              <TextInput
                id="Name"
                name="Name"
                type="text"
                onChange={this.onChange}
                value={name}
              />
            </div>

            <div className="container__input">
              <TextInput
                id="Maker"
                name="Maker"
                type="text"
                onChange={this.onChange}
                value={maker}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__description">
          <div className="container__left">
            <h4>Official Description</h4>
            <span>
              How does the maker describe the suace and/or flavor? This might be
              found directly on the bottle, a website, in an email, etc.
            </span>
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <TextInput
                id="Description"
                name="Description"
                type="textarea"
                onChange={this.onChange}
                value={description}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__ingrediants">
          <div className="container__left">
            <h4>Ingrediants</h4>
            <span>
              Which ingrediants make up the sauce? This should be a comma
              seperated list found somewhere on the sauce label.
            </span>
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <TextInput
                id="Ingrediants"
                name="Ingrediants"
                type="textarea"
                onChange={this.onChange}
                value={ingrediants}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__location">
          <div className="container__left">
            <h4>Location</h4>
            <span>Where was the sauce made?</span>
          </div>
          <div className="container__right">
            <div className="container__input">
              <label htmlFor="Country" className="text__upper text__grey">
                Country
              </label>
              <CountryDropdown
                value={location.country}
                onChange={this.onLocationChange}
                disabled={false}
                name="Country"
                id="Country"
              />
            </div>
            <div className="container__input">
              <label htmlFor="Country" className="text__upper text__grey">
                State / Region
              </label>
              <RegionDropdown
                country={location.country}
                value={location.state}
                onChange={this.onLocationChange}
                disabled={false}
                defaultOptionLabel="--Select--"
                name="State"
                id="State"
              />
            </div>
            <div className="container__input">
              <TextInput
                id="City"
                name="City"
                type="text"
                onChange={this.onChange}
                value={location.city}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__photo">
          <div className="container__left">
            <h4>Photo</h4>
            <span>
              If you have a picture of the bottle, please upload it! If the
              picture is unclear, blurry, or missing completely, an admin may
              replace it with a different one.
            </span>
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <Dropzone
                onDrop={this.onDrop}
                accept="image/jpeg, image/png"
                style={{
                  width: "100%",
                  height: "200px",
                  border: "2px dashed rgb(102, 102, 102)",
                  borderRadius: "5px",
                  padding: "10px"
                }}
              >
                {photo.file ? (
                  <p>
                    File Uploaded! Feel free to drag and drop again to upload a
                    different file
                  </p>
                ) : (
                  <p>
                    Try dropping some files here, or click to select files to
                    upload.
                  </p>
                )}
              </Dropzone>
              {photo.name.length > 0 && (
                <div>
                  <h6>File:</h6> {photo.name}
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <button type="submit" className="button button--submit">
          Add ->
        </button> */}
      </form>
    );
  }

  onChange = e => {
    // Grab name of the element changed
    const name = e.target.name.toLowerCase();

    // Grab the value
    const val = e.target.value;

    // Update local state
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: val
      }
    });
  };

  // Seperate from onChange since CountryDropdown, RegionDropdown passes the event second
  onLocationChange = (val, e) => {
    // Grab name
    const name = e.target.name.toLowerCase();

    // Update local state
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        location: { ...this.state.data.location, [name]: val }
      }
    });
  };

  // Used by the Dropzone component
  onDrop = files => {
    // Grab file
    const file = files[0];

    // Update local state
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        photo: {
          name: file.name,
          file
        }
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    this.props.onSubmit(data);
  };
}

export default AddSauce;
