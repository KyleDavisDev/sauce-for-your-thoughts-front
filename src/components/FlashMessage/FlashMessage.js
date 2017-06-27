import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: this.props.type,
      text: this.props.text,
      slug: this.props.slug
    };

    this.iterateObject = this.iterateObject.bind(this);
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
    return errorMessages.map(errorMessage => {
      return <p key={errorMessage} className="item">{errorMessage}</p>;
    });
  }

  render() {
    const slugLink = this.state.type === "success"
      ? <Link to={`/store/${this.state.slug}`}>Rate it!</Link>
      : "";
    return (
      <div className={`flash ${this.state.type}`}>

        {/*if object, iterate over object*/}
        {typeof this.state.text === "object" &&
          <div className="error-list">{this.iterateObject()}</div>}

        {/*if string, output string*/}
        {typeof this.state.text === "string" &&
          <div className="success-list">
            <p className="item">{this.state.text}{" "}{slugLink}</p>
          </div>}

        <button className="close-button" onClick={this.props.closeFlashMessage}>
          X
        </button>

      </div>
    );
  }
}

FlashMessage.propTypes = {
  type: PropTypes.string,
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  slug: PropTypes.string.isRequired
};

module.exports = FlashMessage;
