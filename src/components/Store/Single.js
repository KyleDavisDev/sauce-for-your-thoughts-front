import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getStoreBySlug as getStore } from "../../actions/sauce";
import { flashError } from "../../actions/flash";
import { GenerateStaticGoogleMap } from "../Map/GenerateMap";

import Checker from "../../helper/Checker/Checker.js";
import FillerImage from "../../images/photos/store.jpg";

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
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.getStore(slug);
  }

  componentWillReceiveProps(nextProps) {
    const slug = nextProps.match.params.slug;
    if (slug && slug !== this.props.match.params.tag) {
      this.getStore(slug);
    }
  }

  render() {
    return (
      <div className="inner">
        {Object.keys(this.props.store).length > 0 && (
          <div className="single">
            <div className="single-hero">
              <img
                className="single-image"
                onLoad={e =>
                  (e.target.src = `http://localhost:7777/public/uploads/${
                    this.props.store.photo
                  }`)
                }
                src={FillerImage}
                onError={e => (e.target.src = FillerImage)}
              />
              <h2 className="title title-single">
                <Link to={this.props.store.slug}>{this.props.store.name}</Link>
              </h2>
            </div>
          </div>
        )}

        {Object.keys(this.props.store).length > 0 && (
          <div className="single-details inner">
            <GenerateStaticGoogleMap
              longitude={this.props.store.location.coordinates[0]}
              latitude={this.props.store.location.coordinates[1]}
              className="single-map"
            />
            <p className="single-location">
              {this.props.store.location.address}
            </p>
            <p>{this.props.store.description}</p>
            {this.props.store.tags.length > 0 && (
              <GenerateTagsList tags={this.props.store.tags} />
            )}
          </div>
        )}
      </div>
    );
  }

  getStore = slug => {
    this.props.getStore(slug).catch(err => {
      // console.log(err.response);
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}
Single.proptypes = {
  store: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf([PropTypes.string]).isRequired,
    location: PropTypes.shape({
      address: PropTypes.string.isRequired,
      coordinates: PropTypes.arrayOf([PropTypes.number.isRequired]).isRequired
    }).isRequired
  }).isRequired,
  getStore: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    store: state.store
  };
};

const mapDispatchToProps = {
  getStore,
  flashError
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Single);
