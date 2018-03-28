import api from "../../api/api";

export const addReviews = ({ reviews }) => ({
  type: "REVIEWS_ADDED",
  reviews
});

export const addReview = data => dispatch =>
  api.review.add(data).then(
    res =>
      // update store here...?
      res.data
  );
