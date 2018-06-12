import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { host } from "../../../../../../utils/api/api";
import ComingSoon from "../../../../../../images/photos/ComingSoon.png";

const SingleHero = ({ sauce }) => (
  <div className="single__container--tilted">
    {sauce && (
      <div className="single__container">
        <div className="single__hero">
          <h3 className="single__title">
            <Link to={sauce.slug || "#"}>{sauce.name || "Loading..."}</Link>
          </h3>
          <img
            alt={`User-submitted background for ${sauce.name}`}
            className="single__image"
            src={`${host}/public/uploads/${sauce.photo}`}
            onError={e => (e.target.src = ComingSoon)}
          />
        </div>
        <div className="single__desc">description stuff</div>
      </div>
    )}
  </div>
);
SingleHero.propTypes = {
  sauce: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    slug: PropTypes.string.isRequired
  })
};

SingleHero.defaultProps = {
  sauce: {
    name: "",
    photo: "",
    slug: ""
  }
};

export default SingleHero;
