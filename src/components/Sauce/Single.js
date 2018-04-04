import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSauceBySlug } from "../../redux/actions/sauces";
import { flashError } from "../../redux/actions/flash";
import { RatingSection } from "./Form";
// import UserReview from "./UserReview";
import { host } from "../../api/api";

import FillerImage from "../../images/photos/sauce.jpg";

const GenerateTagsList = ({ tags }) => (
  <ul className="tags">
    {tags.map(tag => (
      <li className="tag" key={tag}>
        <Link to={`/tags/${tag}`} className="tag-link">
          <span className="tag-text">#{tag}</span>
        </Link>
      </li>
    ))}
  </ul>
);
GenerateTagsList.propTypes = {
  tags: PropTypes.arrayOf([PropTypes.string]).isRequired
};

class Single extends Component {
  componentDidMount() {
    const { slug } = this.props.match.params;
    this.getSauceBySlug({ slug });
  }

  componentWillUnmount() {}

  render() {
    return (
      <div className="inner">
        {Object.keys(this.props.sauce).length > 0 && (
          <div className="single">
            <div className="single-hero">
              <img
                alt={`User-submitted background for ${this.props.sauce.name}`}
                className="single-image"
                onLoad={e =>
                  (e.target.src = `${host}/public/uploads/${
                    this.props.sauce.photo
                  }`)
                }
                src={FillerImage}
                onError={e => (e.target.src = FillerImage)}
              />
              <h2 className="title title-single">
                <Link to={this.props.sauce.slug}>{this.props.sauce.name}</Link>
              </h2>
            </div>
          </div>
        )}

        <div className="single--details">
          {/* description & tags */}
          {Object.keys(this.props.sauce).length > 0 && (
            <div className="inner">
              <p>{this.props.sauce.description}</p>
              {this.props.sauce.tags.length > 0 && (
                <GenerateTagsList tags={this.props.sauce.tags} />
              )}
            </div>
          )}

          {/* Add review */}
          {/* {Object.keys(this.props.sauce).length > 0 && (
            <UserReview sauceID={this.props.sauce._id} />
          )} */}
        </div>
      </div>
    );
  }

  getSauceBySlug = ({ slug }) => {
    this.props.getSauceBySlug(slug).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}
Single.propTypes = {
  sauce: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired,
  // user: {
  //   token: PropTypes.string.isRequired || ""
  // }.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      slug: PropTypes.string
    }).isRequired
  }).isRequired,
  getSauceBySlug: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired
};

const mapStateToProps = (state, ownProps) => ({
  user: {
    token: state.users.self.token || ""
  },
  sauce: state.sauces.allIds.filter(
    x => this.state.sauces.byId[x].slug === ownProps.sauce
  )[0] || {
    _id: "",
    name: "",
    description: "",
    photo: "",
    slug: "",
    tags: [],
    rating: 0
  }
});

const mapDispatchToProps = {
  getSauceBySlug,
  flashError
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Single);
