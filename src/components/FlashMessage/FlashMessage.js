import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { flashClose } from "../../actions/flash";

import Checker from "../../helper/Checker/Checker.js";

const FlashMessage = ({ flashMessage, flashClose }) => {
  function iterateObject() {
    // the keys of this.state.text may change later depending on
    //the DB and this way of looping through the object will us to grab the messages
    //reguardless of what the key is
    // .reverse() to get error message in correct order of form layout
    const errorKeys = Object.keys(flashMessage.text).reverse();
    const errorMessages = errorKeys.map(key => {
      return flashMessage.text[key].message;
    });
    return errorMessages.map((errorMessage, index) => {
      return (
        <p key={index} className="item">
          {errorMessage}
        </p>
      );
    });
  }

  function iterateArray() {
    return flashMessage.text.map((txt, index) => {
      return (
        <p key={index} className="item">
          {txt}
        </p>
      );
    });
  }

  const slugLink = flashMessage.slug ? (
    <Link to={`/store/${flashMessage.slug}`}>Rate it!</Link>
  ) : (
    ""
  );

  return (
    <div className={`flash ${flashMessage.type}`}>
      {/*if object, iterate over object*/}
      {Checker.isObject(flashMessage.text) && (
        <div className="error-list">{this.iterateObject()}</div>
      )}

      {/*if array, iterate over array*/}
      {Checker.isArray(flashMessage.text) && (
        <div className="error-list">{this.iterateArray()}</div>
      )}

      {/*if string, output string*/}
      {Checker.isString(flashMessage.text) && (
        <div className="success-list">
          <p className="item">
            {flashMessage.text} {slugLink}
          </p>
        </div>
      )}
      <button className="close-button" onClick={e => flashClose()}>
        X
      </button>
    </div>
  );
};

FlashMessage.propTypes = {
  flashMessage: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    text: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ])
  }).isRequired,
  flashClose: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    flashMessage: state.flashMessage
  };
}

export default connect(mapStateToProps, { flashClose })(FlashMessage);
