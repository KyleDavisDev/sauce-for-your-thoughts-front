import React, { Component } from "react";
import axios from "axios";

import StoreForm from "../StoreForm/StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class StoreEdit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {},
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    };

    this.updateStoreEntry = this.updateStoreEntry.bind(this);
    this.createFlashMessage = this.createFlashMessage.bind(this);
    this.closeFlashMessage = this.closeFlashMessage.bind(this);
  }

  componentWillMount() {
    //TODO sanity checks to be sure the ID passed is legit
    const storeID = this.props.match.params.id;

    axios
      .get(`http://localhost:7777/api/store/${storeID}/get`)
      .then(response => {
        //response.data is store objects from DB
        this.setState({ store: response.data });
      })
      .catch(function(error) {
        console.log("An error:");
        console.log(error);
      });
  }

  updateStoreEntry(store) {
    let didUpdateWork = false;
    this.closeFlashMessage();
    const storeID = this.props.match.params.id;

    //million ways to destructure the store object but I like this one
    const { storeName: name, storeDescription: description } = store;
    const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);
    const address = store.location.storeAddress;
    const coordinates = [
      parseFloat(store.location.storeLongitude),
      parseFloat(store.location.storeLatitude)
    ];

    axios({
      method: "post",
      url: `http://localhost:7777/api/store/${storeID}/edit`,
      data: {
        name,
        description,
        tags,
        location: { address, coordinates }
      }
    })
      .then(response => {
        if (response.data.errors) {
          this.createFlashMessage({
            type: "error",
            text: response.data.errors
          });
        } else {
          this.setState({ store: response.data });
          this.createFlashMessage({
            type: "success",
            slug: response.data.slug,
            text: "Your store was updated!"
          });
          didUpdateWork = true;
        }
      })
      .catch(error => {
        this.createFlashMessage("error");
      });

    return didUpdateWork;
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
            isVisible={this.state.flashMessage.isVisible}
            type={this.state.flashMessage.type}
            text={this.state.flashMessage.text}
            slug={this.state.flashMessage.slug}
            closeFlashMessage={this.closeFlashMessage}
          />}
        <h2>Edit {this.state.store.name || "Store"}</h2>
        {Object.keys(this.state.store).length > 0 &&
          <StoreForm
            onFormSubmit={this.updateStoreEntry}
            storeName={this.state.store.name}
            storeDescription={this.state.store.description}
            tags={this.state.store.tags}
            storeAddress={this.state.store.location.address}
            storeLongitude={this.state.store.location.coordinates[0]}
            storeLatitude={this.state.store.location.coordinates[1]}
            didPostWork={false}
          />}

      </div>
    );
  }
}

module.exports = StoreEdit;
