import React, { Component } from "react";
import axios from "axios";

import StoreForm from "../StoreForm/StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class Add extends Component {
  constructor(props) {
    super(props);

    this.state = {
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    };

    this.addStoreEntry = this.addStoreEntry.bind(this);
    this.createFlashMessage = this.createFlashMessage.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  addStoreEntry(store) {

    //million ways to destructure the store object but I like this one
    const { storeName, storeDescription } = store;
    const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);

    //TODO filter/sanitize user input
    axios({
      method: "post",
      url: "/api/store/add",
      data: {
        name: storeName,
        description: storeDescription,
        tags
      }
    })
      .then(response => {
        //response.data only holds the slug of the store added
        this.createFlashMessage("success", response.data);
      })
      .catch(error => {
        // console.log(error);
        this.createFlashMessage("error");
      });
  }

  createFlashMessage(type, slug = "") {
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
    this.setState({ flashMessage: { isVisible, type, text, slug } });
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
        <StoreForm onFormSubmit={this.addStoreEntry} />

      </div>
    );
  }
}

module.exports = Add;
