import React, { Component } from "react";
import PropTypes from "prop-types";
import PlacesAutocomplete, {
  geocodeByAddress
} from "react-places-autocomplete";
import TextInput from "../TextInput/TextInput.js";
import Template from '../Sauce/template'
import FillerImage from "../../images/photos/sauce.jpg";

const CheckBoxList = ({ tags, onChange }) => {
  return (
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
              onChange={onChange}
            />
            <label htmlFor={tag.name}>{tag.name}</label>
          </div>
        );
      })}
    </ul>
  );
};
CheckBoxList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      isChecked: PropTypes.bool.isRequired
    })
  ),
  onChange: PropTypes.func.isRequired
};

const PhotoUpload = ({ text, onChange }) => {
  return (
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
};
PhotoUpload.propTypes = {
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

class AddForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: Template,
      errors: {
        name: "",
        description: "",
        photo: ""
      }
    };
  }

  render() {
    const { name, description, tags, photo } = this.state.data;
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
          name="description"
          cols="30"
          rows="10"
          onChange={this.onChange}
          value={description}
        />

        <label htmlFor="photo"> Photo: </label>
        <PhotoUpload text={photo.name} onChange={this.onPhotoUpload} />

        <CheckBoxList tags={tags} onChange={this.onCheckboxClick} />

        <button type="submit" className="button">
          Add ->
        </button>
      </form>
    );
  }

  handleSubmit = e => {
    e.preventDefault();
    const data = this.state.data;
    this.props.onSubmit(data);
  };

  onChange = e => {
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [e.target.name.toLowerCase()]: e.target.value
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

  onCheckboxClick = e => {
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
AddForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

export default AddForm;
