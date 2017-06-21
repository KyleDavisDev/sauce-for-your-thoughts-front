import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: []
    };
  }

  componentWillMount() {
    axios
      .get("/api/stores/get")
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
          {this.state.stores.map(store => {
            return (
              <div className="store" key={store.slug}>
                <div className="store-hero">
                  <div className="store-actions">
                    {"<3"}
                  </div>
                  <div className="store-title">
                    <Link to={`/store/${store.slug}`}>
                      {store.name}
                    </Link>
                  </div>
                </div>
                <div className="store-details" >
                  <p>{store.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

module.exports = Stores;
