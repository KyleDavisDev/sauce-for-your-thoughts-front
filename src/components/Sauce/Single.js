import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getSauceBySlug, cleanUpSauce } from "../../redux/actions/sauce";
import { flashError } from "../../redux/actions/flash";
import { RatingSection } from "./Form";
import UserReview from "./UserReview";

import FillerImage from "../../images/photos/sauce.jpg";

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
    this.getSauceBySlug(slug);
  }

  componentWillUnmount() {
    //clear sauce from redux store
    this.props.cleanUpSauce();
  }

  render() {
    return (
      <div className="inner">
        {Object.keys(this.props.sauce).length > 0 && (
          <div className="single">
            <div className="single-hero">
              <img
                className="single-image"
                onLoad={e =>
                  (e.target.src = `http://localhost:7777/public/uploads/${
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
          {Object.keys(this.props.sauce).length > 0 && (
            <UserReview sauceID={this.props.sauce._id} />
          )}
        </div>
      </div>
    );
  }

  getSauceBySlug = slug => {
    this.props.getSauceBySlug(slug).catch(err => {
      this.props.flashError({ text: err.response.data.msg });
    });
  };
}
Single.proptypes = {
  sauce: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf([PropTypes.string]).isRequired,
    rating: PropTypes.number.isRequired
  }).isRequired,
  user: {
    token: PropTypes.string
  },
  getSauceBySlug: PropTypes.func.isRequired,
  flashError: PropTypes.func.isRequired,
  cleanUpSauce: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return {
    user: {
      token: state.user.token
    },
    sauce: state.sauce
  };
};

const mapDispatchToProps = {
  getSauceBySlug,
  flashError,
  cleanUpSauce
};

module.exports = connect(mapStateToProps, mapDispatchToProps)(Single);
