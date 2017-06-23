import React, { Component } from "react";
import PropTypes from "prop-types";

class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      storeName: "",
      storeDescription: "",
      tags: [
        { name: "Wifi", isChecked: false },
        { name: "Open Late", isChecked: false },
        { name: "Vegatarian", isChecked: false },
        { name: "Licensed", isChecked: false },
        { name: "Family Friendly", isChecked: false }
      ]
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
    this.handleCheckboxChange = this.handleCheckboxChange.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  componentWillMount() {
    //update state if props passed otherwise keep as is
    //greater than 1 since "onFormSubmit" MUST be passed
    if (Object.keys(this.props).length > 1) {
      const { storeName, storeDescription } = this.props;

      //compare prop tags with inital state tag to see which checkbox
      //should be initiated as checked
      const tags = this.state.tags.map(tag => {
        if (this.props.tags.includes(tag.name)) {
          tag.isChecked = true;
        }
        return tag;
      });

      //update state
      this.setState({
        storeName,
        storeDescription,
        tags
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    //update state if props updated otherwise keep as is
    //greater than 1 since "onFormSubmit" MUST be passed
    if (Object.keys(this.props).length > 1) {
      const { storeName, storeDescription } = nextProps;

      //compare prop tags with current state tag to see which checkbox
      //should be initiated as checked
      const tags = this.state.tags.map(tag => {
        if (nextProps.tags.includes(tag.name)) {
          tag.isChecked = true;
        }
        return tag;
      });

      //update state
      this.setState({
        storeName,
        storeDescription,
        tags
      });
    }
  }

  handleSubmit(event) {
    //prevent the normal submission of a submit to post
    event.preventDefault();

    //call function initally passed to component
    this.props.onFormSubmit(this.state);

    //This part is needed bc this component is used for adding and editing
    //Adding - reset state
    //Editing - reset state then update state via componentWillReceiveProps
    //TODO reset state only if form submission fails
    this.resetState();
  }

  handleNameChange(event) {
    this.setState({ storeName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ storeDescription: event.target.value });
  }

  handleCheckboxChange(event) {
    //this could probably be much more elegant but works so I'll come back to this later
    //find which array element was clicked and flip that elements isChecked value
    const newTags = this.state.tags.map(tag => {
      if (tag.name === event.target.name) {
        tag.isChecked = !tag.isChecked;
      }
      return tag;
    });

    this.setState({
      tags: newTags
    });
  }

  resetState() {
    this.setState({
      storeName: "",
      storeDescription: "",
      tags: [
        { name: "Wifi", isChecked: false },
        { name: "Open Late", isChecked: false },
        { name: "Vegatarian", isChecked: false },
        { name: "Licensed", isChecked: false },
        { name: "Family Friendly", isChecked: false }
      ]
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} name="addForm" className="form">
        <label htmlFor="storeName"> Name: </label>
        <input
          id="storeName"
          name="storeName"
          type="text"
          onChange={this.handleNameChange}
          value={this.state.storeName}
        />

        <label htmlFor="storeDescription">Description: </label>
        <textarea
          id="storeDescription"
          name="storeDescription"
          cols="30"
          rows="10"
          onChange={this.handleDescriptionChange}
          value={this.state.storeDescription}
        />

        <ul className="tags">
          {this.state.tags.map(tag => {
            return (
              <div key={tag.name} className="tag tag-choice">
                <input
                  type="checkbox"
                  id={tag.name}
                  name={tag.name}
                  value={tag.name}
                  checked={tag.isChecked}
                  onChange={this.handleCheckboxChange}
                />
                <label htmlFor={tag.name}>{tag.name}</label>
              </div>
            );
          })}
        </ul>
        <button type="submit"> Save -> </button>
      </form>
    );
  }
}

StoreForm.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  storeName: PropTypes.string,
  storeDescription: PropTypes.string,
  tags: PropTypes.arrayOf(PropTypes.object)
};

module.exports = StoreForm;
