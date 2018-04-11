import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Star from "../../images/icons/Star";

const UserReview = props => {
  // Generate 10 stars, and 'fill' the number based on the rating
  const generateStars = rating => {
    // make sure rating is a number
    if (Object.prototype.toString.call(rating) !== "[object Number]") return;
    return Array(...Array(10)).map((x, ind) => {
      const classVal = ind < rating ? "filled" : "empty";
      return (
        <div className={`star star--${classVal}`} key={ind}>
          <Star height={20} />
        </div>
      );
    });
  };
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

        {/* Stars sections */}
        <div
          className="review__stars"
          title={`Rated ${props.review.rating} our of 10 stars`}
        >
          <div className="star--container">
            {generateStars(props.review.rating, props.review._id)}
          </div>
        </div>

        {/* Date of the review */}
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
