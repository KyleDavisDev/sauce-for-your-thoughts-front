import React, { Component } from "react";

const UserReview = props => (
  <div className="review">
    <div className="review__header">
      <div className="review__author">
        <img
          className="avatar"
          alt="submitter icon"
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

export default UserReview;
