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

export class RatingSection extends Component {
  constructor(props) {
    super(props);

    //create array of length 10, w/ each index having a <Star /> value
    this.state = {
      hold: false,
      rating: this.props.rating,
      starArray: Array.apply(null, Array(10)).map((x, ind) => {
        const classVal = ind < this.props.rating ? "filled" : "empty";
        return { logo: <Star height={this.props.height || 50} />, classVal };
      })
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rating === 0) return;

    const rating =
      nextProps.rating === this.state.rating ? 0 : nextProps.rating;
    const hold = nextProps.rating === this.state.rating ? false : true;
    const starArray = this.state.starArray.map((x, ind) => {
      const classVal = ind < nextProps.rating ? "filled" : "empty";
      return { logo: <Star height={nextProps.height || 50} />, classVal };
    });
    this.setState(prevState => ({
      rating,
      hold,
      starArray
    }));

    //this will reset the value next to "Rating:" in Form component
    //will also cause componentWillReiveProps to trigger again which should possibly be looked into later
    if (rating === 0) this.props.onClick(0);
  }

  render() {
    return <div className="star--container">{this.createTenStars()}</div>;
  }

  toggleStars = ind => {
    this.setState(prevState => {
      return {
        rating: ind,
        starArray: prevState.starArray.map((star, i) => {
          const classVal = i < ind ? "filled" : "empty";
          return { ...star, classVal };
        })
      };
    });
  };

  onClick = rating => {
    const curRating = this.state.rating;
    this.props.onClick(rating);
  };

  onMouseLeave = ind => {
    if (this.state.hold) return;
    this.toggleStars(0);
  };

  onMouseEnter = ind => {
    if (this.state.hold) return;
    this.toggleStars(ind);
  };

  createTenStars = () => {
    return this.state.starArray.map((star, ind) => {
      return (
        <button
          type="button"
          className={`star star--${star.classVal}`}
          key={ind}
          onClick={e => this.onClick(ind + 1)}
          onMouseEnter={e => this.onMouseEnter(ind)}
          onMouseLeave={e => this.onMouseLeave(ind)}
        >
          {star.logo}
        </button>
      );
    });
  };
}
RatingSection.propTypes = {
  rating: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
  height: PropTypes.number
};
// module.export = RatingSection

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
    const { name, description, photo, review, rating } = nextProps;

    if (
      name === undefined ||
      description === undefined ||
      photo === undefined ||
      review === undefined ||
      rating === undefined
    )
      return;

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
        <RatingSection onClick={this.onRatingClick} rating={rating} />

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
