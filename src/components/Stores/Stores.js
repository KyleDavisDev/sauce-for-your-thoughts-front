import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import StoreCard from "../StoreCard/StoreCard.js";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: {}
    };
  }

  componentWillMount() {
    axios
      .get("http://localhost:7777/api/stores/get")
      .then(response => {
        //response.data is array of store objects from DB
        this.setState({ stores: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="inner">
        <h2>Stores</h2>
        <div className="stores">
          {this.state.stores.length > 0 &&
            <div className="stores">
              {this.state.stores.map(store => {
                return (
                  <StoreCard
                    ID={store._id}
                    name={store.name}
                    image={store.image}
                    slug={store.slug}
                    description={store.description}
                    key={store.slug}
                  />
                );
              })}
            </div>}
        </div>
      </div>
    );
  }
}

module.exports = Stores;
