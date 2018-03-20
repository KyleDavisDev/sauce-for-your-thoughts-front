import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import FillerImage from "../../images/photos/sauce.jpg";
import Pencil from "../../images/icons/Pencil.js";
import { Heart, FilledHeart } from "../../images/icons/Heart";
import { host } from "../../api/api";

const Card = ({
  ID,
  name,
  image,
  slug,
  description,
  displayEditIcon,
  displayHeartIcon,
  heart,
  toggleSauce
}) => {
  return (
    <div className="card">
      <div className="card-hero">
        <div className="card--actions">
          {displayEditIcon && (
            <div className="card--action card--action__edit">
              <Link to={`/sauce/${ID}/edit`}>
                <Pencil />
              </Link>
            </div>
          )}
          <div className="card--action card--action__heart">
            {handleHeartIcon()}
          </div>
        </div>
        <img
          src={FillerImage}
          onError={e => (e.target.src = FillerImage)}
          onLoad={e => (e.target.src = `${host}/public/uploads/${image}`)}
          title={name}
          alt={name}
        />
        <div className="sauce-title">
          <Link to={`/sauce/${slug}`}>{name}</Link>
        </div>
      </div>
      <div className="card-details">
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

  //only render appropriate heart icon if displayHeartIcon is true
  //function declaration so we can write it below our 'render' and it will still be hoisted
  function handleHeartIcon() {
    if (!displayHeartIcon) return;
    {
      return heart ? (
        <button
          onClick={e => toggleSauce(ID)}
          className="button--action__active"
        >
          <FilledHeart />
        </button>
      ) : (
        <button
          onClick={e => toggleSauce(ID)}
          className="button--action__inactive"
        >
          <Heart />
        </button>
      );
    }
  }
};

Card.propTypes = {
  ID: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string,
  slug: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  displayEditIcon: PropTypes.bool.isRequired,
  displayHeartIcon: PropTypes.bool.isRequired,
  heart: PropTypes.bool.isRequired,
  toggleSauce: PropTypes.func.isRequired
};

export default connect(null, {})(Card);
