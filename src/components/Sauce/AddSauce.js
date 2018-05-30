import React, { Component } from "react";
import PropTypes from "prop-types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import axios from "axios";
import Dropzone from "react-dropzone";
import validator from "validator";
import CheckBoxList from "../CheckboxList/CheckboxList";
import TextInput from "../TextInput/TextInput.js";
import api from "../../api/api";
import _addTemplate from "./_addTemplate";

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

class AddSauce extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);

    this.state = {
      data: _addTemplate,
      errors: {},
      addReview: false
    };
  }

  componentDidMount() {
    // Query for peppers and types
    axios
      .all([this.getPeppers(), this.getTypes()])
      .then(res => {
        // res[0] holds peppers
        // res[1] holds types

        // Assign isChecked bool to each pepper
        const peppers = res[0].data.peppers.map(x => {
          x.isChecked = false;
          return x;
        });

        // Assign isChecked bool to each type
        const types = res[1].data.types.map(x => {
          x.isChecked = false;
          return x;
        });

        this.setState({
          ...this.state,
          data: { ...this.state.data, peppers, types }
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    const {
      name,
      description,
      photo,
      maker,
      location,
      ingredients,
      peppers,
      shu,
      types
    } = this.state.data;

    const { errors } = this.state;

    return (
      <form
        name="addForm"
        className="form"
        encType="multipart/form-data"
        onSubmit={this.onSubmit}
      >
        <div className="container" id="sauce__details">
          <div className="container__left">
            <ContainerLeft
              title="Details"
              desc="Information about the sauce only. Sauce name, maker lorum ipusum
              etc etc."
            />
          </div>
          <div className="container__right">
            <div className="container__input">
              <TextInput
                id="Name"
                title="name"
                name="Name"
                type="text"
                onChange={this.onChange}
                value={name}
                required={true}
                parentRef={input => (this.name = input)}
              />

              {/* Error message */}
              {errors.name && <p className="form-error">{errors.name}</p>}
            </div>

            <div className="container__input">
              <TextInput
                id="Maker"
                title="maker"
                name="Maker"
                type="text"
                onChange={this.onChange}
                value={maker}
                required={true}
                parentRef={input => (this.maker = input)}
              />

              {/* Error message */}
              {errors.maker && <p className="form-error">{errors.maker}</p>}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__description">
          <div className="container__left">
            <ContainerLeft
              title="Official Description"
              desc="How does the maker describe the suace and/or flavor? This might be
              found directly on the bottle, a website, in an email, etc. This is NOT your review."
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <TextInput
                id="Description"
                title="description"
                name="Description"
                type="textarea"
                onChange={this.onChange}
                value={description}
                required={true}
              />

              {/* Error message */}
              {errors.description && (
                <p className="form-error">{errors.description}</p>
              )}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__ingredients">
          <div className="container__left">
            <ContainerLeft
              title="Ingredients"
              desc="Which ingredients make up the sauce? This should be a comma
              seperated list found somewhere on the sauce label."
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <TextInput
                id="Ingredients"
                title="ingredients"
                name="Ingredients"
                type="textarea"
                onChange={this.onChange}
                value={ingredients}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__spice">
          <div className="container__left">
            <ContainerLeft
              title="Spiciness"
              desc="Is this sauce spicy? How spicy is it? What does the maker say the Scoville Heat Unit (SHU) rating is? Which peppers are primarily used? If this sauce is not spicy, leave blank."
            />
          </div>
          <div className="container__right">
            <div className="container__input">
              <TextInput
                id="SHU"
                title="shu"
                name="SHU"
                type="text"
                onChange={this.onChange}
                value={shu}
                parentRef={input => (this.shu = input)}
              />
              {errors.shu && <p className="form-error">{errors.shu}</p>}
            </div>
            <div className="container__input__full">
              <span className="text__upper text__grey">Primary Peppers</span>
              {peppers.length > 0 && (
                <CheckBoxList
                  tags={peppers}
                  onChange={this.onCheckBoxChange}
                  name="peppers"
                />
              )}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__type">
          <div className="container__left">
            <ContainerLeft
              title="Type"
              desc="What type of sauce is this? What is it primarily used for?"
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <span className="text__upper text__grey">Type of sauce</span>
              {types.length > 0 && (
                <CheckBoxList
                  tags={types}
                  onChange={this.onCheckBoxChange}
                  name="types"
                />
              )}
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__location">
          <div className="container__left">
            <ContainerLeft title="Location" desc="Where was the sauce made?" />
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
                title="city"
                name="City"
                type="text"
                onChange={this.onLocationChange}
                value={location.city}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__photo">
          <div className="container__left">
            <ContainerLeft
              title="Photo"
              desc="If you have a picture of the bottle, please upload it! If the
              picture is unclear, blurry, or missing completely, an admin may
              replace it with a different one."
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <span className="text__upper text__grey">Add Photo</span>
              <Dropzone
                onDrop={this.onDrop}
                accept="image/jpeg, image/png"
                style={{
                  width: "100%",
                  height: "200px",
                  border: "2px dashed rgb(102, 102, 102)",
                  borderRadius: "5px",
                  padding: "10px",
                  textAlign: "center"
                }}
                id="photo"
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

        <div className="spacer" />

        <div className="container" id="sauce__add__review">
          <div className="container__left">
            <ContainerLeft
              title="Review"
              desc="Would you like to add a review too? Do not review your own sauce. Blatantly altering scores will get your account banned and your review removed. Don't do it."
            />
          </div>
          <div className="container__right">
            <div className="container__input__full">
              <span className="text__upper text__grey">Add Review?</span>
              <div className="tags">
                <div className="tag tag-choice">
                  <input
                    type="radio"
                    name="add__review"
                    value="no"
                    id="add__review--no"
                    defaultChecked={true}
                    onChange={this.onAddReviewChange}
                  />
                  <label htmlFor="add__review--no">No</label>
                </div>
                <div className="tag tag-choice">
                  <input
                    type="radio"
                    name="add__review"
                    value="yes"
                    id="add__review--yes"
                    onChange={this.onAddReviewChange}
                  />
                  <label htmlFor="add__review--yes">Yes</label>
                </div>
              </div>
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

  onAddReviewChange = e => {
    const addReview = e.target.value === "yes";

    this.setState({ ...this.state, addReview });
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
   *    @param {String} data.name - Name of sauce
   *    @param {String} data.maker - Maker of sauce
   *    @param {String} data.description - Description of sauce
   *    @param {Number|String?} data.shu - optional. Will make sure string/int is actually an int
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

  /** @description Call API for an array of peppers
   *  @returns {Promise}
   */
  getPeppers = () => api.peppers.get();

  /** @description Call API for array of types  */
  getTypes = () => api.types.get();
}

export default AddSauce;
