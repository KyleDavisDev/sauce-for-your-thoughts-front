import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

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

  render() {
    const slugLink = this.state.slug
      ? <Link to={`/store/${this.state.slug}`}>Rate it!</Link>
      : "";
    return (
      <div className={`flash ${this.state.type}`}>
        {/*Javascript makes checking between an object and an array incredibly*/}
        {/*difficult to be 100% but this method seems to work*/}
        {/*For more info:*/}
        {/*https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/*/}

        {/*if object, iterate over object*/}
        {Object.prototype.toString.call(this.state.text) ===
          "[object Object]" &&
          <div className="error-list">
            {this.iterateObject()}
          </div>}

        {/*if array, iterate over array*/}
        {Object.prototype.toString.call(this.state.text) === "[object Array]" &&
          <div className="error-list">
            {this.iterateArray()}
          </div>}

        {/*if string, output string*/}
        {typeof this.state.text === "string" &&
          <div className="success-list">
            <p className="item">
              {this.state.text} {slugLink}
            </p>
          </div>}

        <button className="close-button" onClick={this.props.closeFlashMessage}>
          X
        </button>
      </div>
    );
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
