import React, { Component } from "react";
import axios from "axios";

import StoreForm from "../StoreForm/StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      didPostWork: false,
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    };

    this.addStoreEntry = this.addStoreEntry.bind(this);
    this.createFlashMessage = this.createFlashMessage.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  addStoreEntry(store) {
    this.closeFlashMessage();

    //million ways to destructure the store object but I like this one
    const { storeName: name, storeDescription: description } = store;
    const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);
    const address = store.location.storeAddress;
    const coordinates = [
      parseInt(store.location.storeLongitude),
      parseInt(store.location.storeLatitude)
    ];

    //TODO filter/sanitize user input
    axios({
      method: "post",
      url: "http://localhost:7777/api/store/add",
      data: {
        name,
        description,
        tags,
        location: { address, coordinates }
      }
    })
      .then(response => {
        if (response.data.errors) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out
          this.createFlashMessage({
            type: "error",
            text: response.data.errors
          });
          this.setState({ didPostWork: false });
        } else {
          //response.data holds the slug of the store added
          this.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Your store was added!"
          });
          this.setState({ didPostWork: true });
        }
      })
      .catch(error => {
        this.createFlashMessage("error");
        this.setState({ didPostWork: false });
      });
  }

  createFlashMessage({ type, slug = "", text }) {
    this.setState({ flashMessage: { isVisible: true, type, text, slug } });
  }

  closeFlashMessage() {
    const isVisible = false;
    const type = "";
    const text = "";
    const slug = "";
    this.setState({ flashMessage: { isVisible, type, text, slug } });
  }

  render() {
    return (
      <div className="inner">
        {this.state.flashMessage.isVisible &&
          <FlashMessage
            type={this.state.flashMessage.type}
            text={this.state.flashMessage.text}
            slug={this.state.flashMessage.slug}
            closeFlashMessage={this.closeFlashMessage}
          />}
        <h2>Add Store</h2>
        <StoreForm
          onFormSubmit={this.addStoreEntry}
          didPostWork={this.state.didPostWork}
        />

      </div>
    );
  }
}

module.exports = Add;
