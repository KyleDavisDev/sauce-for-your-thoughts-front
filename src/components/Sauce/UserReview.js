import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

const UserReview = props => {
  const { _id } = props.review;
  return (
    <div className="review">
      <div className="review__header">
        <div className="review__author">
          <img
            className="avatar"
            alt="submitter's icon"
            src="https://gravatar.com/avatar/9efd86dfb66394fae773919df6a9c0fb?s=200"
          />
          <p>{props.author.name}</p>
        </div>
        <div className="review__stars" title="Rated 5 our of 5 stars">
          ★★★★★
        </div>
        <time className="review__time" dateTime="2017-03-08T22:36:48.575Z">
          a year ago
        </time>
      </div>
      <div className="review__body">
        <p>{props.review.text}</p>
      </div>
    </div>
  );
};

UserReview.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    sauce: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired,
    author: PropTypes.shape({ _id: PropTypes.string.isRequired }).isRequired
  }).isRequired,
  author: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  // Grab the specific review from redux using the reviews' _id
  const review = ownProps._id ? state.reviews.byId[ownProps._id] : {};

  // Grab the author of the review
  const author =
    Object.keys(review).length > 0 &&
    state.users &&
    state.users.byId !== undefined &&
    Object.keys(state.users.byId).length > 0
      ? state.users.byId[review.author._id]
      : { _id: "", name: "" };

  return {
    review,
    author
  };
};
export default connect(mapStateToProps, null)(UserReview);
