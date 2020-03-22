import * as React from "react";

import ReviewForm from "../../src/components/ReviewForm/ReviewForm";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import Footer from "../../src/components/Footer/Footer";
import { IReviewToServer } from "../../src/redux/reviews/types";
import { useDispatch } from "react-redux";
import { reduxStore } from "../../src/redux/with-redux-store";
import { editReview } from "../../src/redux/reviews/actions";
interface ReviewAddPageProps {}

const ReviewAddPage: React.FunctionComponent<ReviewAddPageProps> = props => {
  // assign dispatch
  const useThunkDispatch = useDispatch<typeof reduxStore.dispatch>();

  return (
    <>
      <TopBar />
      <Navigation />
      <ReviewForm onSubmit={onSubmit} />
      <Footer />
    </>
  );

  async function onSubmit(data: IReviewToServer) {
    try {
      // add review
      await useThunkDispatch(editReview(data));
    } catch (err) {
      // handle error in component
    }

    return null;
  }
};

export default ReviewAddPage;
