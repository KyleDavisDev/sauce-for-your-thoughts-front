import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: this.props.isVisible,
      type: this.props.type,
      text: this.props.text,
      slug: this.props.slug
    };
  }

  render() {
    const slugLink = this.state.type === "success"
      ? <Link to={`/store/${this.state.slug}`}>Click to rate!</Link>
      : "";
    return (
      <div className={`flash ${this.state.type}`}>
        <p>{this.state.text}{slugLink}</p>
        <button onClick={this.props.closeFlashMessage}>X</button>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  isVisible: PropTypes.bool,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired
};

module.exports = FlashMessage;
