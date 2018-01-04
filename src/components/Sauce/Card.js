import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import FillerImage from "../../images/photos/sauce.jpg";
import Pencil from "../../images/icons/Pencil.js";

const Card = sauce => {
  return (
    <div className="sauce">
      <div className="sauce-hero">
        <div className="sauce-actions">
          {sauce.displayEditIcon && (
            <div className="sauce-action sauce-action-edit">
              <Link to={`/sauce/${sauce.ID}/edit`}>
                <Pencil />
              </Link>
            </div>
          )}
        </div>
        <img
          src={FillerImage}
          onError={e => (e.target.src = FillerImage)}
          onLoad={e =>
            (e.target.src = `http://localhost:7777/public/uploads/${
              sauce.image
            }`)
          }
          title={sauce.name}
          alt={sauce.name}
        />
        <div className="sauce-title">
          <Link to={`/sauce/${sauce.slug}`}>{sauce.name}</Link>
        </div>
      </div>
      <div className="sauce-details">
        {/*{limit description to 25 words }*/}
        <p>
          {sauce.description
            .split(" ")
            .slice(0, 25)
            .join(" ")}
        </p>
      </div>
    </div>
  );
};

Card.propTypes = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  displayEditIcon: PropTypes.bool.isRequired
};

export default Card;
