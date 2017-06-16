import React, { Component } from "react";
import PropTypes from "prop-types";

class StoreForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addNameValue: "",
      addDescriptionValue: ""
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    //hit store api

    //reset value of input on submit
    this.setState({ addNameValue: "", addDescriptionValue: "" });
  }

  handleNameChange(event) {
    this.setState({ addNameValue: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ addDescriptionValue: event.target.value });
  }

  render() {
    const choices = [
      "Wifi",
      "Open Late",
      "Vegatarian",
      "Licensed",
      "Family Friendly"
    ];
    return (
      <form onSubmit={this.handleSubmit} name="addForm" className="form card">
        <label htmlFor="storeName"> Name: </label>
        <input
          id="storeName"
          type="text"
          onChange={this.handleNameChange}
          value={this.state.addNameValue}
        />

        <label htmlFor="storeDescription">Description</label>
        <textarea
          name=""
          id="storeDescription"
          onChange={this.handleDescriptionChange}
          cols="30"
          rows="10"
        >
          {this.state.addDescriptionValue}
        </textarea>

        <ul className="tags">
          {choices.map(choice => {
            return (
              <div key={choice} className="tag tag-choice">
                <input type="checkbox" id={choice} value={choice} name="tags" />
                <label htmlFor={choice}>{choice}</label>
              </div>
            );
          })}
        </ul>
        
      </form>
    );
  }
}

StoreForm.propTypes = {
  name: PropTypes.string
};

module.exports = StoreForm;
