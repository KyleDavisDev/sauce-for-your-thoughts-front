import React, { Component } from "react";

import StoreForm from "./StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashMessage: { isVisible: false, type: "", text: "", slug:"" }
    };

    this.handleStoreAdded = this.handleStoreAdded.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  handleStoreAdded(type, slug = "") {
    const text = type === "success"
      ? "Your store was added!"
      : "Something didn't work.... Try again!";
    this.setState({ flashMessage: { isVisible: true, type, text, slug } });
  }

  closeFlashMessage() {
    const isVisible = false;
    const type = "";
    const text = "";
    const slug = "";
    this.setState({ flashMessage: { isVisible, type, text, slug} });
  }

  render() {
    return (
      <div className="inner">
        {this.state.flashMessage.isVisible &&
          <FlashMessage
            isVisible={this.state.flashMessage.isVisible}
            type={this.state.flashMessage.type}
            text={this.state.flashMessage.text}
            slug={this.state.flashMessage.slug}
            closeFlashMessage={this.closeFlashMessage}
          />}
        <h2>Add Store</h2>
        <StoreForm handleStoreAdded={this.handleStoreAdded} />

      </div>
    );
  }
}

module.exports = Add;
