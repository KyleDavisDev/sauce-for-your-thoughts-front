import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Checker from "../../helper/Checker/Checker.js";
import FillerImage from "../../images/photos/store.jpg";

const GenerateStaticGoogleMap = ({ className, longitude, latitude }) => {
  return (
    <img
      className={className}
      src={`https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=800x150&key=AIzaSyBjyKevCZH8vO5TOByZaH37d--miW703f8&markers=${latitude},${longitude}&scale=2`}
    />
  );
};
GenerateStaticGoogleMap.proptypes = {
  className: PropTypes.string.isRequired,
  longitude: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired,
  latitude: PropTypes.oneOf([PropTypes.string, PropTypes.number]).isRequired
};

const GenerateTagsList = ({ tags }) => {
  return (
    <ul className="tags">
      {tags.map(tag => {
        return (
          <li className="tag" key={tag}>
            <Link to={`/tags/${tag}`} className="tag-link">
              <span className="tag-text">#{tag}</span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
GenerateTagsList.proptypes = {
  tags: PropTypes.arrayOf([PropTypes.string]).isRequired
};

class Single extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const storeSlug = this.props.match.params.slug;

    axios
      .get(`http://localhost:7777/api/store/${storeSlug}`)
      .then(response => {
        //if unable to find store, redirect to 404
        if (Checker.isObject(response.data) && response.data.isGood) {
          this.setState({
            store: response.data.store,
            author: response.data.author.name
          });
        } else {
          this.props.history.push("/404");
        }
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="inner">
        {this.state.store && (
          <div className="single">
            <div className="single-hero">
              <img
                className="single-image"
                onLoad={e =>
                  (e.target.src = `http://localhost:7777/public/uploads/${
                    this.state.store.photo
                  }`)
                }
                src={FillerImage}
                onError={e => (e.target.src = FillerImage)}
              />
              <h2 className="title title-single">
                <Link to={this.state.store.slug}>{this.state.store.name}</Link>
              </h2>
            </div>
          </div>
        )}

        {this.state.store && (
          <div className="single-details inner">
            <GenerateStaticGoogleMap
              longitude={this.state.store.location.coordinates[0]}
              latitude={this.state.store.location.coordinates[1]}
              className="single-map"
            />
            <p className="single-location">
              {this.state.store.location.address}
            </p>
            <p>{this.state.store.description}</p>
            {this.state.store.tags.length > 0 && (
              <GenerateTagsList tags={this.state.store.tags} />
            )}
          </div>
        )}
      </div>
    );
  }
}

module.exports = Single;
