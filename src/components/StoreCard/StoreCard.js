import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import FillerImage from "../../images/photos/store.jpg";
import Pencil from "../../images/icons/Pencil.js";

const StoreCard = (store) => {
  return (
    <div className="store">
      <div className="store-hero">
        <div className="store-actions">
          {store.displayEditIcon && (
            <div className="store-action store-action-edit">
              <Link to={`/store/${store.ID}/edit`}>
                <Pencil />
              </Link>
            </div>
          )}
        </div>
        <img
          src={FillerImage}
          onError={e => (e.target.src = FillerImage)}
          onLoad={e => e.target.src = `http://localhost:7777/public/uploads/${store.image}`}
          title={store.name}
          alt={store.name}
        />
        <div className="store-title">
          <Link to={`/store/${store.slug}`}>{store.name}</Link>
        </div>
      </div>
      <div className="store-details">
        {/*{limit description to 25 words }*/}
        <p>
          {store.description
            .split(" ")
            .slice(0, 25)
            .join(" ")}
        </p>
      </div>
    </div>
  );
};

StoreCard.propTypes = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  displayEditIcon: PropTypes.bool.isRequired
};

module.exports = StoreCard;
