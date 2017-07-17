import React, { Component } from "react";
import axios from "axios";

import StoreForm from "../StoreForm/StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";
import Auth from "../../helper/Auth/Auth.js";

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

  addStoreEntry(store) {
    this.closeFlashMessage();

    //grab info from store object and then put into FormData for AJAX post
    const {
      storeName: name,
      storeDescription: description,
      storePhoto: photo
    } = store;
    const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);
    const address = store.location.storeAddress;
    const coordinates = [
      parseFloat(store.location.storeLongitude) || "",
      parseFloat(store.location.storeLatitude) || ""
    ];

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", photo);
    formData.append("address", address);
    formData.append("coordinates", coordinates);
    formData.append("tags", tags);
    formData.append("token", Auth.getToken());

    var options = {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    };

    //TODO filter/sanitize user input, focus top element on submit so flashmessage is in view
    axios
      .post("http://localhost:7777/api/store/add", formData, options)
      .then(response => {
        if (response.data.errors) {
          //we will be here if user didn't use all inputs correctly or didn't fill something out
          //create error message
          this.createFlashMessage({
            type: "error",
            text: response.data.errors
          });

          //making this false will keep data in the form and not reset it
          this.setState({ didPostWork: false });
        } else {
          //response.data holds the slug of the store added
          //create success message
          this.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Your store was added!"
          });

          //reset form
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
    const flashMessage = { isVisible: false, type: "", text: "", slug: "" };
    this.setState({ flashMessage });
  }
}

module.exports = Add;
