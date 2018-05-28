import React, { Component } from "react";
import PropTypes from "prop-types";
import Rating from "react-rating";
import validator from "validator";
import TextInput from "../TextInput/TextInput.js";
import api from "../../api/api";
import _reviewTemplate from "./_reviewTemplate";
import Star from "../../images/icons/Star";

const ContainerLeft = ({ title, desc }) => (
  <div>
    <h4>{title}</h4>
    <span>{desc}</span>
  </div>
);
ContainerLeft.propTypes = {
  title: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired
};

class ReviewForm extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: _reviewTemplate,
      errors: {},
      addReview: false
    };
  }

  componentDidMount() {}

  render() {
    const { aroma, taste, label, heat, overall, note } = this.state.data;

    const { errors } = this.state;

    return (
      <form
        name="addForm"
        className="form"
        encType="multipart/form-data"
        onSubmit={this.onSubmit}
      >
        <div className="container" id="review__taste">
          <div className="container__left">
            <ContainerLeft
              title="Taste"
              desc="Can you taste garlic? Are there hints of thyme? Describe what you taste in the sauce."
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <label
                htmlFor="Taste"
                className="text__upper text__grey w--100 d--block"
              >
                {"taste*"}
              </label>
              <Rating
                onHover={rate =>
                  (document.getElementById("rating__taste").innerHTML =
                    rate || "")
                }
                emptySymbol={<Star className="star star--empty" />}
                fullSymbol={<Star className="star star--filled" />}
                onChange={x => console.log(x)}
              />
              <span id="rating__taste" className="rating" />
              <TextInput
                displayName={false}
                id="Taste"
                name="Taste"
                type="textarea"
                onChange={this.onChange}
                value={taste.txt}
                required={true}
                parentRef={input => (this.taste = input)}
              />

              {/* Error message */}
              {errors.taste && <p className="form-error">{errors.taste}</p>}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="review__aroma">
          <div className="container__left">
            <ContainerLeft
              title="Aroma"
              desc="What can you smell in the sauce? Try closing your eyes and wafting the aroma towards your nose? What accents do you pick up?"
            />
          </div>
          <div className="container__right pad--0">
            <div className="container__input__full">
              <label
                htmlFor="Aroma"
                className="text__upper text__grey w--100 d--block"
              >
                {"Aroma*"}
              </label>
              <Rating
                onHover={rate =>
                  (document.getElementById("rating__aroma").innerHTML =
                    rate || "")
                }
                emptySymbol={<Star className="star star--empty" />}
                fullSymbol={<Star className="star star--filled" />}
                onChange={x => console.log(x)}
              />
              <span id="rating__aroma" className="rating" />
              <TextInput
                displayName={false}
                id="Aroma"
                name="Aroma"
                type="textarea"
                onChange={this.onChange}
                value={aroma.txt}
                required={true}
                parentRef={input => (this.aroma = input)}
              />

              {/* Error message */}
              {errors.aroma && <p className="form-error">{errors.aroma}</p>}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__label">
          <div className="container__left">
            <ContainerLeft
              title="Label"
              desc="How do you feel about the design? Does it speak to you? Does it remind you of anything? How effective does the design convey what the sauce is/is not."
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              {/* <Rating /> */}
              <TextInput
                id="label"
                name="label"
                type="textarea"
                onChange={this.onChange}
                value={label.txt}
                required={true}
              />

              {/* Error message */}
              {errors.label && <p className="form-error">{errors.label}</p>}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__heat">
          <div className="container__left">
            <ContainerLeft title="Heat" desc="How spicy is this sauce? " />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              {/* <Rating /> */}
              <TextInput
                id="heat"
                name="heat"
                type="textarea"
                onChange={this.onChange}
                value={heat.txt}
                required={true}
              />

              {/* Error message */}
              {errors.heat && <p className="form-error">{errors.heat}</p>}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__overall">
          <div className="container__left">
            <ContainerLeft
              title="Overall"
              desc="What are you overall impressions? How could the sauce improve?"
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              {/* <Rating /> */}
              <TextInput
                id="overall"
                name="overall"
                type="textarea"
                onChange={this.onChange}
                value={overall.txt}
                required={true}
              />

              {/* Error message */}
              {errors.overall && <p className="form-error">{errors.overall}</p>}
            </div>
          </div>
        </div>

        <div className="spacer" />

        {/* <div className="container"  */}
        <button type="submit" className="button button--submit">
          Add ->
        </button>
      </form>
    );
  }

  onChange = e => {
    // Grab name of the element changed
    const name = e.target.name.toLowerCase();

    // Grab the value
    const val = e.target.value;

    const { errors } = this.state;

    if (errors[name]) {
      delete errors[name];
    }

    // Update local state
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: val
      },
      errors
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

  onCheckBoxChange = e => {
    // Find which group of checkboxes need to be updated
    const group = e.target.name.toLowerCase();

    // Find which checkbox was clicked and set isChecked to the opposite value
    const update = this.state.data[group].map(x => {
      if (x._id === e.target.id) x.isChecked = !x.isChecked;
      return x;
    });

    // Update state
    this.setState({
      ...this.state,
      data: { ...this.state.data, [group]: update }
    });
  };

  onSubmit = e => {
    // Allow parent to control what happens
    e.preventDefault();

    const { data, addReview } = this.state;

    // Check form for errors
    const errors = this.validate({ data });

    // If form has any errors, update state so they will render
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      this.setState({ ...this.state, errors });

      // focus on first error
      this[keys[0]].focus();

      return;
    }

    // Set SHU to be an int if it exists
    data.shu = data.shu.length > 0 ? parseInt(data.shu) : "";

    // Pass data to parent
    this.props.onSubmit(data, addReview);
  };

  /** @description Validates all data before passing it off.
   *  @param {Object} data - object to check
   *  @returns {Object} errors - set of form errors
   */
  validate = ({ data }) => {
    const errors = {};

    // Name cannot be empty
    if (validator.isEmpty(data.name)) errors.name = "*Cannot be empty";

    // Maker cannot be empty
    if (validator.isEmpty(data.maker)) errors.maker = "*Cannot be empty";

    // Description cannot be empty
    if (validator.isEmpty(data.description))
      errors.description = "*Cannot be empty";

    // If shu is a number - we don't have any issues
    const type = Object.prototype.toString.call(data.shu);
    if (!type === "[object Number]") {
      // Must be non-number if here
      // If it has input, it must be a string, not empty, and convertable to a number
      if (
        type === "[object String]" &&
        !validator.isEmpty(data.shu) &&
        !validator.isNumeric(data.shu)
      ) {
        errors.shu = "*Must be a number.";
      }
    }
    // If SHU has input, it must be a number.

    return errors;
  };
}

export default ReviewForm;
