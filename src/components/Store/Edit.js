import React, { Component } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { getInfo as getUserInfo } from '../../actions/user';
import { getStore as getStoreInfo } from '../../actions/store';
import { flashError } from '../../actions/flash';

import Form from "./Form.js";

import Auth from "../../helper/Auth/Auth.js";
import Checker from "../../helper/Checker/Checker";

class Edit extends Component {
  constructor(props) {
    super(props);

    this.state = {
      store: {
        name: "",
        description: "",
        tags: [""],
        location: { address: "", coordinates: ["", ""] },
        photo: ""
      }
    };
  }

  componentDidMount() {
    axios.all([this.getStoreInfo(), this.getUserInfo()]).catch(error => {
      console.log(error)
      // this.props.flashError({ text: error.response.data.msg });
    });
  }

  render() {
    return (
      <div className="inner">
        <h2>
          Edit {this.state.store.name || "Store"}
        </h2>
        {/* {Object.keys(this.state.store).length > 0 &&
          <Form
            onFormSubmit={this.handleFormSubmit}
            storeName={this.state.store.name}
            storeDescription={this.state.store.description}
            storePhoto={this.state.store.photo}
            tags={this.state.store.tags}
            storeAddress={this.state.store.location.address}
            storeLongitude={this.state.store.location.coordinates[0]}
            storeLatitude={this.state.store.location.coordinates[1]}
          />} */}
      </div>
    );
  }

  getUserInfo = () => {
    //check if email already passed to component to save api call
    if (this.props.user.email) return;
    const data = { token: this.props.user.token };
    return this.props.getUserInfo(data);
  };

  getStoreInfo = () => {
    //check to see if stores have already been passed to component to save an api call
    if (this.props.store) return;
    const storeID = this.props.match.params.id;
    const token = this.props.user.token
    const data = { token, storeID }
    return this.props.getStoreInfo(data);
  }

  // handleFormSubmit(e, store) {
  //   e.preventDefault();

  //   const storeID = this.props.id;

  //   //make tags an array of checked tags
  //   const tags = store.tags.filter(tag => tag.isChecked).map(tag => tag.name);
  //   //round location to 6 decimal places and convert to string
  //   const coordinates = [
  //     parseFloat(store.location.storeLongitude).toFixed(7) || "",
  //     parseFloat(store.location.storeLatitude).toFixed(7) || ""
  //   ];

  //   const data = new FormData();
  //   data.append("name", store.storeName);
  //   data.append("description", store.storeDescription);
  //   data.append("image", store.storePhoto);
  //   data.append("address", store.location.storeAddress);
  //   data.append("coordinates", coordinates);
  //   data.append("tags", tags);
  //   data.append("token", Auth.getToken());
  //   data.append("storeID", storeID);

  //   //TODO filter/sanitize user input
  //   axios({
  //     method: "post",
  //     url: `http://localhost:7777/api/store/id/edit`,
  //     data,
  //     options: { headers: { "Content-Type": "multipart/form-data" } }
  //   })
  //     .then(response => {
  //       if (response.data.errors) {
  //         this.props.createFlashMessage({
  //           type: "error",
  //           text: response.data.errors
  //         });
  //       } else {
  //         this.setState({ store: response.data });
  //         this.props.createFlashMessage({
  //           type: "success",
  //           slug: response.data.slug,
  //           text: "Your store was updated!"
  //         });
  //       }
  //     })
  //     .catch(error => {
  //       console.log(error);
  //       this.props.createFlashMessage({
  //         type: "error",
  //         text: "Try again."
  //       });
  //     });
  // }
}

Edit.propTypes = {

};

const mapStateToProps = state => {
  return {
    store: state.stores,
    user: { token: state.user.token, email: state.user.email }
  }
}

const mapDispatchToProps = {
  getStoreInfo,
  getUserInfo,
  flashError
};

export default connect(mapStateToProps, mapDispatchToProps)(Edit);
