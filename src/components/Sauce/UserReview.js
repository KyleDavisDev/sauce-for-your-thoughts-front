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
          <p>Wes Bos</p>
        </div>
        <div className="review__stars" title="Rated 5 our of 5 stars">
          ★★★★★
        </div>
        <time className="review__time" dateTime="2017-03-08T22:36:48.575Z">
          a year ago
        </time>
      </div>
      <div className="review__body">
        <p>Always a great spot to grab a coffee with a friend. </p>
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
  }).isRequired
};

const mapStateToProps = (state, ownProps) => {
  const review = ownProps._id ? state.reviews.byId[ownProps._id] : {};
  return {
    review
  };
};
export default connect(mapStateToProps, null)(UserReview);
