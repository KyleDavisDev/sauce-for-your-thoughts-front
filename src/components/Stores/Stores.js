import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import storeImage from "../../images/photos/store.jpg";
import Pencil from "../../images/icons/Pencil.js";

class Stores extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: []
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
            this.state.stores.map(store => {
              return (
                <div className="store" key={store.slug}>
                  <div className="store-hero">
                    <div className="store-actions">
                      <div className="store-action store-action-edit">
                        <Link to={`/store/${store._id}/edit`}>
                          <Pencil />
                        </Link>
                      </div>
                    </div>
                    <img
                      src={`http://localhost:7777/public/uploads/${store.photo}`}
                      onError={e => (e.target.src = storeImage)}
                      title={store.name}
                      alt={store.name}
                    />
                    <div className="store-title">
                      <Link to={`/store/${store.slug}`}>
                        {store.name}
                      </Link>
                    </div>
                  </div>
                  <div className="store-details">
                    {/*{limit description to 25 words }*/}
                    <p>
                      {store.description.split(" ").slice(0, 25).join(" ")}
                    </p>
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
