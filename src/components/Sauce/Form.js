import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput/TextInput.js";
import Template from "./template";
import Rating from "../Rating/Rating.js";

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
  ),
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
  text: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

class Form extends Component {
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

  componentWillReceiveProps(nextProps) {
    const { name, description, photo, rating } = nextProps;
    if (
      name === undefined ||
      description === undefined ||
      photo === undefined ||
      rating === undefined
    ) {
      return;
    }
    const tags = this.getProperTags(nextProps.tags);

    this.setState({
      ...this.state,
      data: {
        name,
        description,
        photo: { name: photo },
        tags,
        rating
      }
    });
  }

  render() {
    const { name, description, tags, photo, review, rating } = this.state.data;
    return (
      <form
        name="addForm"
        className="form"
        encType="multipart/form-data"
        onSubmit={this.handleSubmit}
      >
        <TextInput
          id="Name"
          name="Name"
          type="text"
          onChange={this.onChange}
          onSubmit={this.handleSubmit}
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

        <label htmlFor="photo">Photo: </label>
        <PhotoUpload text={photo.name} onChange={this.onPhotoUpload} />

        <label>Tags:</label>
        <CheckBoxList tags={tags} onChange={this.onCheckboxClick} />

        <label className="rating--label">Overal Rating: {rating}</label>
        <Rating onClick={this.onRatingClick} rating={rating} />

        <button type="submit" className="button button--submit">
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

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
  tags: PropTypes.array
};

export default Form;
