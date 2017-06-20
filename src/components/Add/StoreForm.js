import React, { Component } from "react";
import PropTypes from "prop-types";
import axios from "axios";

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
  }

  handleSubmit(event) {
    event.preventDefault();

    axios({
      method: "post",
      url: "/store/add",
      data: {
        name: this.state.storeName,
        description: this.state.storeDescription,
        tags: this.state.tags
          .filter(tag => {
            return tag.isChecked;
          })
          .map(tag => {
            return tag.name;
          })
      }
    })
      .then(response => {
        // console.log(response);
        this.props.handleStoreAdded("success");
      })
      .catch(error => {
        // console.log(error);
        this.props.handleStoreAdded("error");
      });

    //reset value of input on submit
    this.setState({ storeName: "", storeDescription: "" });
  }

  handleNameChange(event) {
    this.setState({ storeName: event.target.value });
  }

  handleDescriptionChange(event) {
    this.setState({ storeDescription: event.target.value });
  }

  handleCheckboxChange(event) {
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

        <label htmlFor="storeDescription">Description</label>
        <textarea
          id="storeDescription"
          name="storeDescription"
          onChange={this.handleDescriptionChange}
          cols="30"
          rows="10"
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
  handleStoreAdded: PropTypes.func.isRequired
};

module.exports = StoreForm;
