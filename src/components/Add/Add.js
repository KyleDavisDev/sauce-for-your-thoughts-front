import React, { Component } from "react";

import StoreForm from "./StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showFlashMessage: false,
      flashMessageType: ""
    };

    this.handleStoreAdded = this.handleStoreAdded.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  handleStoreAdded(type) {
    this.setState({ showFlashMessage: true, flashMessageType: type });
  }

  closeFlashMessage() {
    this.setState({ showFlashMessage: false, flashMessageType: "" });
  }

  render() {
    return (
      <div className="inner">
        <h2>Add Store</h2>
        <StoreForm handleStoreAdded={this.handleStoreAdded} />
        {this.state.showFlashMessage &&
          <FlashMessage
            isVisible={true}
            type={this.state.flashMessageType}
            text={"it worked!"}
            closeFlashMessage={this.closeFlashMessage}
          />}
      </div>
    );
  }
}

module.exports = Add;
