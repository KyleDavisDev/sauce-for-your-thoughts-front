import api from "../../api/api";

export const addReviews = ({ reviews }) => ({
  type: "REVIEWS_ADDED",
  reviews
});

export const addReview = data => dispatch =>
  api.review.add(data).then(
    res =>
    //add review to redux store
      dispatch(addReviews({reviews: [res.data.review]}))
      res.data
  );
