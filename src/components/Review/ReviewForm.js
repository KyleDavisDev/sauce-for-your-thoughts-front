import React, { Component } from "react";
import PropTypes from "prop-types";
import validator from "validator";
import TextInput from "../TextInput/TextInput.js";
import api from "../../api/api";
import _reviewTemplate from "./_reviewTemplate";
import Star from "../../images/icons/Star";
import Rating from "../Rating/Rating";

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
              <span className="text__upper text__grey w--100 d--block">
                {"taste rating*"}
              </span>
              <div className="rating">
                <Rating
                  onClick={this.onRatingChange}
                  value={taste.rating}
                  name="taste"
                  showHelper={true}
                />

                {/* Error message */}
                {errors.taste &&
                  errors.taste.rating && (
                    <p className="form-error">{errors.taste.rating}</p>
                  )}
              </div>
              <TextInput
                id="Taste"
                name="taste"
                title="description"
                type="textarea"
                onChange={this.onChange}
                value={taste.txt}
                required={true}
                parentRef={input => (this.taste = input)}
              />

              {/* Error message */}
              {errors.taste &&
                errors.taste.txt && (
                  <p className="form-error">{errors.taste.txt}</p>
                )}
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
              <span className="text__upper text__grey w--100 d--block">
                {"Aroma Rating*"}
              </span>
              <div className="rating">
                <Rating
                  onClick={this.onRatingChange}
                  value={aroma.rating}
                  name="aroma"
                  showHelper={true}
                />

                {/* Error message */}
                {errors.aroma &&
                  errors.aroma.rating && (
                    <p className="form-error">{errors.aroma.rating}</p>
                  )}
              </div>

              <TextInput
                id="Aroma"
                name="aroma"
                title="Description"
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
              <span className="text__upper text__grey w--100 d--block">
                {"Label Rating*"}
              </span>
              <div className="rating">
                <Rating
                  onClick={this.onRatingChange}
                  value={label.rating}
                  name="label"
                  showHelper={true}
                />
              </div>

              <TextInput
                id="Label"
                name="label"
                title="description"
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
            <ContainerLeft
              title="Heat"
              desc="How spicy is this sauce? Did you have to run for water? Was it the perfect amount of heat?"
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <span className="text__upper text__grey w--100 d--block">
                {"Heat rating*"}
              </span>
              <div className="rating">
                <Rating
                  onClick={this.onRatingChange}
                  value={heat.rating}
                  name="heat"
                  showHelper={true}
                />
              </div>
              <TextInput
                id="heat"
                name="heat"
                title="description"
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
              <span className="text__upper text__grey w--100 d--block">
                {"overall rating*"}
              </span>
              <div className="rating">
                <Rating
                  onClick={this.onRatingChange}
                  value={overall.rating}
                  name="overall"
                  showHelper={true}
                />
              </div>
              <TextInput
                id="overall"
                name="overall"
                title="description"
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

        <div className="container" id="sauce__note">
          <div className="container__left">
            <ContainerLeft
              title="Note"
              desc="Have anything else you'd like to add? Include it here!"
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <TextInput
                id="note"
                name="note"
                title="Note"
                type="textarea"
                onChange={this.onChange}
                value={note.txt}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        {/* Submit button */}
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

    // If the input had an error, remove it.
    const { errors } = this.state;
    if (errors[name]) {
      delete errors[name];
    }

    // Update local state
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: { ...this.state.data[name], txt: val }
      },
      errors
    });
  };

  // TODO: Better way of getting the specific name
  onRatingChange = (val, e) => {
    // Need to get the name of the section where a star was just clicked.
    // We will progress up the star DOM four steps or until we find a name to associate the click with.
    const name =
      e.target.name ||
      e.target.parentNode.name ||
      e.target.parentNode.parentNode.name ||
      e.target.parentNode.parentNode.parentNode.name;

    // Update state with the rating value
    this.setState({
      ...this.state,
      data: {
        ...this.state.data,
        [name]: { ...this.state.data[name], rating: val }
      }
    });
  };

  onSubmit = e => {
    // Hold off on doing anything
    e.preventDefault();

    const { data } = this.state;
    console.log(data);

    // Check form for errors
    const errors = this.validate({ data });

    // If form has any errors, update state so they will render
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      this.setState({ ...this.state, errors });

      // focus on first error
      this[keys[0]].focus();
    }

    // Call API to submit data
    // api.reivews.
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
