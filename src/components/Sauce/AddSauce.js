import React, { Component } from "react";
import PropTypes from "prop-types";
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
              How does the maker describe the suace? This might be found
              directly on the bottle, a website, in an email, etc.
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
        {/* <button type="submit" className="button button--submit">
          Add ->
        </button> */}
      </form>
    );
  }

  onChange = e => {
    const name = e.target.name.toLowerCase();
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: e.target.value
      }
    });
  };

  onPhotoUpload = e => {
    const name = e.target.files[0].name;
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        photo: { ...this.state.data.photo, name, file: e.target.files[0] }
      }
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const data = this.state.data;
    this.props.onSubmit(data);
  };

  onCheckboxClick = e => {
    // find which array element was clicked and flip that elements isChecked value
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

  getProperTags = tags =>
    this.state.data.tags.map(tag => {
      if (tags.includes(tag.name)) {
        tag.isChecked = true;
      }
      return tag;
    });

  onRatingClick = val => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        rating: val
      }
    });
  };
}

export default AddSauce;

{
  /* <label htmlFor="test">Description: </label>
          <textarea
            id="test"
            name="description"
            cols="30"
            rows="10"
            onChange={this.onChange}
            value={description}
          />

          <label htmlFor="photo">Photo: </label>
          <PhotoUpload text={photo.name} onChange={this.onPhotoUpload} /> */
}
