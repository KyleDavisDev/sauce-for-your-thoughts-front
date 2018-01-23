import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FillerImage from "../../images/photos/sauce.jpg";
import Pencil from "../../images/icons/Pencil.js";
import { Heart, FilledHeart } from "../../images/icons/Heart";
import { toggleHeart } from "../../actions/user";

const Card = ({
  ID,
  name,
  image,
  slug,
  description,
  displayEditIcon,
  heart,
  toggleHeart
}) => {
  const toggleStoreHeart = () => {
    console.log(ID);
  };

  return (
    <div className="sauce">
      <div className="sauce-hero">
        <div className="sauce-actions">
          {displayEditIcon && (
            <div className="sauce-action sauce-action-edit">
              <Link to={`/sauce/${ID}/edit`}>
                <Pencil />
              </Link>
            </div>
          )}
          <div className="sauce-action sauce-action-heart">
            {heart ? (
              <button onClick={toggleStoreHeart}>
                <FilledHeart />
              </button>
            ) : (
              <button onClick={toggleStoreHeart}>
                <Heart />
              </button>
            )}
          </div>
        </div>
        <img
          src={FillerImage}
          onError={e => (e.target.src = FillerImage)}
          onLoad={e =>
            (e.target.src = `http://localhost:7777/public/uploads/${image}`)
          }
          title={name}
          alt={name}
        />
        <div className="sauce-title">
          <Link to={`/sauce/${slug}`}>{name}</Link>
        </div>
      </div>
      <div className="sauce-details">
        {/*{limit description to 25 words }*/}
        <p>
          {description
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
  displayEditIcon: PropTypes.bool.isRequired,
  heart: PropTypes.bool.isRequired
};

const mapDistpatchToProps = {
  toggleHeart
};

export default connect(null, mapDistpatchToProps)(Card);
