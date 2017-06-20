import React, { Component } from "react";
import axios from "axios";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: []
    }
  }

  componentWillMount() {
    axios
      .get("/api/stores/get")
      .then( (response) => {
        //response.data is array of store objects from DB
        this.setState({stores: response.data})
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="inner">
        <h2>Stores</h2>
          {this.state.stores.map( (store) => {
            return store.name
          })}
      </div>
    );
  }
}

module.exports = Stores;
