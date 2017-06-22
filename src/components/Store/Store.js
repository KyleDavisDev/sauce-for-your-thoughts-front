import React, { Component } from "react";
import axios from "axios";

import StoreForm from "../StoreForm/StoreForm.js";
import FlashMessage from "../FlashMessage/FlashMessage.js";

class Store extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {},
      flashMessage: { isVisible: false, type: "", text: "", slug: "" }
    };

    this.updateStoreEntry = this.updateStoreEntry.bind(this);
  }

  componentWillMount() {
    //TODO sanity checks to be sure the ID passed is legit
    const storeID = this.props.match.params.id;

    axios
      .get(`/api/store/${storeID}/get`)
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

    //million ways to destructure the store object but I like this one
    const { storeName, storeDescription } = store;
    const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);

    //TODO filter/sanitize user input
    // axios({
    //   method: "post",
    //   url: "/api/store/add",
    //   data: {
    //     name: storeName,
    //     description: storeDescription,
    //     tags
    //   }
    // })
    //   .then(response => {
    //     //response.data only holds the slug of the store added
    //     this.createFlashMessage("success", response.data);
    //   })
    //   .catch(error => {
    //     // console.log(error);
    //     this.createFlashMessage("error");
    //   });
  }

  render() {
    return (
      <div className="inner">
        {/*{this.state.flashMessage.isVisible &&
        <FlashMessage
          isVisible={this.state.flashMessage.isVisible}
          type={this.state.flashMessage.type}
          text={this.state.flashMessage.text}
          slug={this.state.flashMessage.slug}
          closeFlashMessage={this.closeFlashMessage}
        />}*/}
        <h2>Add Store</h2>
        <StoreForm
          onFormSubmit={this.updateStoreEntry}
          storeName={this.state.store.name}
          storeDescription={this.state.store.description}
          tags={this.state.store.tags}
        />

      </div>
    );
  }
}

module.exports = Store;
