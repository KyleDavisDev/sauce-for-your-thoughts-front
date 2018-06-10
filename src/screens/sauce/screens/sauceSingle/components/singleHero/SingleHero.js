import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { host } from "../../../../../../utils/api/api";
import ComingSoon from "../../../../../../images/photos/ComingSoon.png";

const SingleHero = ({ sauce }) => (
  <div className="single-hero">
    <img
      alt={`User-submitted background for ${sauce.name}`}
      className="single-image"
      src={`${host}/public/uploads/${sauce.photo}`}
      onError={e => (e.target.src = ComingSoon)}
    />
    <h2 className="title title-single">
      <Link to={sauce.slug || "#"}>{sauce.name || "Loading..."}</Link>
    </h2>
  </div>
);
SingleHero.propTypes = {
  sauce: PropTypes.shape({
    name: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
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
