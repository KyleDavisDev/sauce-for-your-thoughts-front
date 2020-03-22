import * as React from "react";

import ReviewAdd from "../../src/components/ReviewAdd/ReviewAdd";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import Footer from "../../src/components/Footer/Footer";
import { IReviewToServer } from "../../src/redux/reviews/types";
import { useDispatch } from "react-redux";
import { reduxStore } from "../../src/redux/with-redux-store";
import { addReview } from "../../src/redux/reviews/actions";

interface ReviewAddPageProps {}

const ReviewAddPage: React.FunctionComponent<ReviewAddPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <ReviewAdd />
      <Footer />
    </>
  );
};

export default ReviewAddPage;
