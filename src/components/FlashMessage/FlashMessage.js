import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import Checker from "../../helper/Checker/Checker.js";

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      text: this.props.text,
      slug: this.props.slug || null
    };

    this.iterateObject = this.iterateObject.bind(this);
    this.iterateArray = this.iterateArray.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps);
  }

  render() {
    const slugLink = this.state.slug ? (
      <Link to={`/store/${this.state.slug}`}>Rate it!</Link>
    ) : (
      ""
    );
    return (
      <div className={`flash ${this.state.type}`}>
        {/*if object, iterate over object*/}
        {Checker.isObject(this.state.text) && (
          <div className="error-list">{this.iterateObject()}</div>
        )}

        {/*if array, iterate over array*/}
        {Checker.isArray(this.state.text) && (
          <div className="error-list">{this.iterateArray()}</div>
        )}

        {/*if string, output string*/}
        {Checker.isString(this.state.text) && (
          <div className="success-list">
            <p className="item">
              {this.state.text} {slugLink}
            </p>
          </div>
        )}

        <button className="close-button" onClick={this.props.closeFlashMessage}>
          X
        </button>
      </div>
    );
  }

  iterateObject() {
    // the keys of this.state.text may change later depending on
    //the DB and this way of looping through the object will us to grab the messages
    //reguardless of what the key is
    // .reverse() to get error message in correct order of form layout
    const errorKeys = Object.keys(this.state.text).reverse();
    const errorMessages = errorKeys.map(key => {
      return this.state.text[key].message;
    });
    return errorMessages.map((errorMessage, index) => {
      return (
        <p key={index} className="item">
          {errorMessage}
        </p>
      );
    });
  }

  iterateArray() {
    return this.state.text.map((txt, index) => {
      return (
        <p key={index} className="item">
          {txt}
        </p>
      );
    });
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.array
  ]),
  slug: PropTypes.string
};

module.exports = FlashMessage;
