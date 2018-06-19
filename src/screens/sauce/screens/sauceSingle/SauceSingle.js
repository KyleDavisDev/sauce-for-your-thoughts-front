import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import SingleHero from "./components/singleHero/SingleHero";
import SingleReviewFeed from "./components/singleReviewFeed/SingleReviewFeed";
import SubmitReview from "./components/submitReview/SubmitReview";
import UserReview from "./components/userReview/UserReview";

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
  tags: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired
};

class SauceSingle extends Component {
  static propTypes = {
    user: PropTypes.shape({
      token: PropTypes.string.isRequired
    }).isRequired,
    reviews: PropTypes.arrayOf(
      PropTypes.shape({
        aroma: PropTypes.shape({
          txt: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired
        }).isRequired,
        label: PropTypes.shape({
          txt: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired
        }).isRequired,
        taste: PropTypes.shape({
          txt: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired
        }).isRequired,
        heat: PropTypes.shape({
          txt: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired
        }).isRequired,
        overall: PropTypes.shape({
          txt: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired
        }).isRequired,
        note: PropTypes.shape({
          txt: PropTypes.string.isRequired
        }).isRequired,
        _id: PropTypes.string.isRequired,
        sauce: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
        author: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
      }).isRequired
    ),
    match: PropTypes.shape({
      params: PropTypes.shape({
        slug: PropTypes.string
      }).isRequired
    }).isRequired
  };

  static defaultProps = {
    reviews: [
      {
        heat: { txt: "", rating: 0 },
        aroma: { txt: "", rating: 0 },
        label: { txt: "", rating: 0 },
        taste: { txt: "", rating: 0 },
        overall: { txt: "", rating: 0 },
        note: { txt: "" },
        _id: "",
        sauce: { _id: "" },
        author: { _id: "" }
      }
    ]
  };

  render() {
    const { sauce } = this.props;

    return (
      <div className="inner">
        <div className="single">
          <SingleHero slug={this.props.match.params.slug} />

          <SingleReviewFeed />
        </div>

        {/* <div className="single--details"> */}
        {/* description & tags */}
        {sauce &&
          false &&
          Object.keys(sauce).length > 0 && (
            <div className="inner">
              <p>{sauce.description}</p>
              {/* {sauce.tags.length > 0 && (
                <GenerateTagsList tags={sauce.tags} />
              )} */}
            </div>
          )}

        {/* Add review */}
        {/* {sauce &&
            Object.keys(sauce).length > 0 &&
            this.props.user.token && <SubmitReview sauceID={sauce._id} />} */}

        {/* All of the user reviews */}
        {/* <div className="reviews">
            {this.props.reviews &&
              this.props.reviews.length > 0 &&
              this.props.reviews.map(review => (
                <UserReview _id={review._id} key={review._id} />
              ))}
          </div> */}
        {/* </div> */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  // init reviews
  // const reviews = sauceID ? state.sauces.byId[sauceID].reviews : [];

  const user = {
    token: state.users.self.token || ""
  };

  return {
    user
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SauceSingle);
