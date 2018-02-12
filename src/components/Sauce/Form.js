import React, { Component } from "react";
import PropTypes from "prop-types";
import TextInput from "../TextInput/TextInput.js";
import Template from "./template";
import Star from "../../images/icons/Star";

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

const RatingSection = ({ onClick }) => {
  //create array of length 10, w/ each index having a <Star /> value
  const starArray = Array.apply(null, Array(10)).map((x, ind) => <Star />);
  const createTenStars = () => {
    return starArray.map((star, ind) => {
      return (
        <button
          type="button"
          className="star"
          key={ind}
          onClick={e => onHover(ind)}
        >
          {star}
        </button>
      );
    });

    function onHover(ind) {
      console.log(ind);
    }
  };

  return <div className="star--container">{createTenStars()}</div>;
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

  componentWillMount() {
    const { name, description, photo } = this.props;

    if (name === undefined || description === undefined || photo === undefined)
      return;

    const tags = this.getProperTags(this.props.tags);
    this.setState({
      ...this.state,
      data: {
        name,
        description,
        photo: { name: photo },
        tags
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const { name, description, photo } = nextProps;

    if (name === undefined || description === undefined || photo === undefined)
      return;

    const tags = this.getProperTags(nextProps.tags);

    this.setState({
      ...this.state,
      data: {
        name,
        description,
        photo: { name: photo },
        tags
      }
    });
  }

  render() {
    const { name, description, tags, photo } = this.state.data;
    return (
      <form name="addForm" className="form" encType="multipart/form-data">
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

        <label htmlFor="photo"> Photo: </label>
        <PhotoUpload text={photo.name} onChange={this.onPhotoUpload} />

        <label>Tags:</label>
        <CheckBoxList tags={tags} onChange={this.onCheckboxClick} />

        <label className="rating--label">
          Rating: {this.state.data.rating}
        </label>
        <RatingSection onClick={this.onRatingClick} />

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

  getProperTags = tags => {
    return this.state.data.tags.map(tag => {
      if (tags.includes(tag.name)) {
        tag.isChecked = true;
      }
      return tag;
    });
  };

  onRatingClick = () => {};
}

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  name: PropTypes.string,
  description: PropTypes.string,
  photo: PropTypes.string,
  tags: PropTypes.array
};

export default Form;
