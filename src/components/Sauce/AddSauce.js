import React, { Component } from "react";
import PropTypes from "prop-types";
import { CountryDropdown, RegionDropdown } from "react-country-region-selector";
import Dropzone from "react-dropzone";
import TextInput from "../TextInput/TextInput.js";
import api from "../../api/api";
import _addTemplate from "./_addTemplate";

const CheckBoxList = ({ tags, onChange }) => (
  <ul className="tags">
    {tags.map(tag => (
      <div key={tag._id} className="tag tag-choice">
        <input
          type="checkbox"
          id={tag._id}
          name={tag.name}
          value={tag.name}
          checked={tag.isChecked}
          onChange={onChange}
        />
        <label htmlFor={tag._id}>{tag.name}</label>
      </div>
    ))}
  </ul>
);
CheckBoxList.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired
    })
  ).isRequired,
  onChange: PropTypes.func.isRequired
};

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
      errors: _addTemplate
    };
  }

  componentDidMount() {
    api.peppers
      .get()
      .then(res => {
        const peppers = res.data.peppers.map(x => {
          x.isChecked = false;
          return x;
        });
        this.setState({
          ...this.state,
          data: { ...this.state.data, peppers }
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
      ingrediants,
      peppers,
      shu
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
                name="Name"
                type="text"
                onChange={this.onChange}
                value={name}
                required={true}
              />
            </div>

            <div className="container__input">
              <TextInput
                id="Maker"
                name="Maker"
                type="text"
                onChange={this.onChange}
                value={maker}
                required={true}
              />
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
                name="Description"
                type="textarea"
                onChange={this.onChange}
                value={description}
                required={true}
              />
            </div>
          </div>
        </div>

        <div className="spacer" />

        <div className="container" id="sauce__ingrediants">
          <div className="container__left">
            <ContainerLeft
              title="Ingrediants"
              desc="Which ingrediants make up the sauce? This should be a comma
              seperated list found somewhere on the sauce label."
            />
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

        <div className="container" id="sauce__spice">
          <div className="container__left">
            <ContainerLeft
              title="Spice"
              desc="How spicy is this sauce? What does the maker say the Scoville Heat Unit (SHU) rating is? Which peppers are primarily used?"
            />
          </div>
          <div className="container__right">
            <div className="container__input">
              <TextInput
                id="SHU"
                name="SHU"
                type="Text"
                onChange={this.onChange}
                value={shu}
              />
            </div>
            <div className="container__input__full">
              <CheckBoxList tags={peppers} onChange={this.onCheckChange} />
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
                  />
                  <label htmlFor="add__review--no">No</label>
                </div>
                <div className="tag tag-choice">
                  <input
                    type="radio"
                    name="add__review"
                    value="yes"
                    id="add__review--yes"
                  />
                  <label htmlFor="add__review--yes">Yes</label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <div className="container"  */}
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

  onCheckChange = e => {
    const peppers = this.state.data.peppers.map(pepper => {
      if (pepper._id === e.target.id) pepper.isChecked = !pepper.isChecked;
      return pepper;
    });

    this.setState({ ...this.state, data: { ...this.state.data, peppers } });
  };

  onSubmit = e => {
    e.preventDefault();
    const { data } = this.state;
    this.props.onSubmit(data);
  };
}

export default AddSauce;
