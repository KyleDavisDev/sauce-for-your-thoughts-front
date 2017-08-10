import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import FillerImage from "../../images/photos/store.jpg";
import Pencil from "../../images/icons/Pencil.js";

class StoreCard extends Component {
  render() {
    return (
      <div className="store">
        <div className="store-hero">
          <div className="store-actions">
            {this.props.displayEditIcon &&
              <div className="store-action store-action-edit">
                <Link to={`/store/${this.props.ID}/edit`}>
                  <Pencil />
                </Link>
              </div>}
          </div>
          <img
            src={`http://localhost:7777/public/uploads/${this.props.image}`}
            onError={e => (e.target.src = FillerImage)}
            title={this.props.name}
            alt={this.props.name}
          />
          <div className="store-title">
            <Link to={`/store/${this.props.slug}`}>
              {this.props.name}
            </Link>
          </div>
        </div>
        <div className="store-details">
          {/*{limit description to 25 words }*/}
          <p>
            {this.props.description.split(" ").slice(0, 25).join(" ")}
          </p>
        </div>
      </div>
    );
  }
}

StoreCard.propTypes = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  displayEditIcon: PropTypes.bool.isRequired
};

module.exports = StoreCard;
