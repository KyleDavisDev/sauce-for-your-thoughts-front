import React, { Component } from "react";
import { Link } from "react-router-dom";

import storeImage from "../../images/photos/store.jpg";
import Pencil from "../../images/icons/Pencil.js";

class StoreCard extends Component {
  render() {
    return (
      <div className="stores">
        {this.props.stores.map(store => {
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
    );
  }
}

module.exports = StoreCard;
