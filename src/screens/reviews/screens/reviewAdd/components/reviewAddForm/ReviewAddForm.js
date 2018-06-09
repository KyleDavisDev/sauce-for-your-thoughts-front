import React, { Component } from "react";
import PropTypes from "prop-types";
import validator from "validator";

import _reviewTemplate from "../_reviewAddTemplate/_ReviewAddTemplate";
import FormRatingRight from "../formRatingRight/FormRatingRight";

import FormLeft from "../../../../../../components/formLeft/FormLeft.js";

class ReviewAddForm extends Component {
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
            <FormLeft
              title="Taste"
              desc="Can you taste garlic? Are there hints of thyme? Describe what you taste in the sauce."
            />
          </div>
          <div className="container__right">
            <FormRatingRight
              onClick={this.onRatingChange}
              name="taste"
              errors={errors.taste}
              data={taste}
              onChange={this.onChange}
              parentRefRating={input =>
                this.parentRef(input, "taste", "rating")
              }
              parentRefTextArea={input =>
                this.parentRef(input, "taste", "textarea")
              }
            />
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="review__aroma">
          <div className="container__left">
            <FormLeft
              title="Aroma"
              desc="What can you smell in the sauce? Try closing your eyes and wafting the aroma towards your nose? What accents do you pick up?"
            />
          </div>
          <div className="container__right">
            <FormRatingRight
              onClick={this.onRatingChange}
              name="aroma"
              errors={errors.aroma}
              data={aroma}
              onChange={this.onChange}
              parentRefRating={input =>
                this.parentRef(input, "aroma", "rating")
              }
              parentRefTextArea={input =>
                this.parentRef(input, "aroma", "textarea")
              }
            />
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__label">
          <div className="container__left">
            <FormLeft
              title="Label"
              desc="How do you feel about the design? Does it speak to you? Does it remind you of anything? How effective does the design convey what the sauce is/is not."
            />
          </div>
          <div className="container__right">
            <FormRatingRight
              onClick={this.onRatingChange}
              name="label"
              errors={errors.label}
              data={label}
              onChange={this.onChange}
              parentRefRating={input =>
                this.parentRef(input, "label", "rating")
              }
              parentRefTextArea={input =>
                this.parentRef(input, "label", "textarea")
              }
            />
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__heat">
          <div className="container__left">
            <FormLeft
              title="Heat"
              desc="How spicy is this sauce? Did you have to run for water? Was it the perfect amount of heat?"
            />
          </div>
          <div className="container__right">
            <FormRatingRight
              onClick={this.onRatingChange}
              name="heat"
              errors={errors.heat}
              data={heat}
              onChange={this.onChange}
              parentRefRating={input => this.parentRef(input, "heat", "rating")}
              parentRefTextArea={input =>
                this.parentRef(input, "heat", "textarea")
              }
            />
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__overall">
          <div className="container__left">
            <FormLeft
              title="Overall"
              desc="What are you overall impressions? How could the sauce improve?"
            />
          </div>
          <div className="container__right">
            <FormRatingRight
              onClick={this.onRatingChange}
              name="overall"
              errors={errors.overall}
              data={overall}
              onChange={this.onChange}
              parentRefRating={input =>
                this.parentRef(input, "overall", "rating")
              }
              parentRefTextArea={input =>
                this.parentRef(input, "overall", "textarea")
              }
            />
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__note">
          <div className="container__left">
            <FormLeft
              title="Note"
              desc="Have anything else you'd like to add? Include it here!"
            />
          </div>
          <div className="container__right">
            <FormRatingRight
              onClick={this.onRatingChange}
              name="note"
              errors={errors}
              data={note}
              onChange={this.onChange}
              displayRating={false}
              required={false}
            />
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

    // Check form for errors
    const errors = this.validate({ data });

    // If form has any errors, update state so they will render
    const keys = Object.keys(errors);
    if (keys.length > 0) {
      this.setState({ ...this.state, errors }, () => {
        const temp = Object.keys(errors[keys[0]]); // get keys of first error
        this[keys[0]][temp].focus(); // focus on first error of first key
      });

      // Do not submit form
      return;
    }

    // Call parent onSubmit
    this.props.onSubmit({ payload: data });
  };

  /** @description Validates all data before passing it off.
   *  @param {Object} data - object to check
   *  @returns {Object} errors - set of form errors
   */
  validate = ({ data }) => {
    const errors = {};

    ["aroma", "taste", "label", "heat", "overall"].forEach(criteria => {
      // Check txt and initiate obj
      if (validator.isEmpty(data[criteria].txt)) {
        errors[criteria] = {};
        errors[criteria].txt = "*Cannot be empty";
      }

      // check rating value and initialize obj if needed
      const val = data[criteria].rating;
      if (val < 1 || val > 5) {
        if (errors[criteria] === undefined) errors[criteria] = {};
        errors[criteria].rating = "*Must provide rating";
      }
    });

    return errors;
  };

  /** @description this is to help assign references to all important inputs/areas
   *  @param {Node} input - either div or textarea
   *  @param {String} name - name of reference object that will be created
   *  @param {String} type - whether the reference is for a div or textarea
   */
  parentRef = (input, name, type) => {
    if (!this[name]) this[name] = {};
    this[name][type] = input;
  };
}

export default ReviewAddForm;
