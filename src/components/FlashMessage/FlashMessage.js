import React, { Component } from "react";
import PropTypes from "prop-types";

class FlashMessage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isVisible: this.props.isVisible,
      type: this.props.type,
      text: this.props.text
    };
  }

  render() {
    return (
      <div className="flashHolder" >
        <div className={`flashmessage ${this.state.type}`}>
          <p>{this.state.text}</p>
          <button onClick={this.props.closeFlashMessage}>X</button>
        </div>
      </div>
    );
  }
}

FlashMessage.propTypes = {
  isVisible: PropTypes.bool,
  type: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

module.exports = FlashMessage;
