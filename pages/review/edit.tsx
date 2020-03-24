import * as React from "react";

import ReviewEdit from "../../src/components/ReviewEdit/ReviewEdit";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import Footer from "../../src/components/Footer/Footer";
import { IReviewToServer } from "../../src/redux/reviews/types";
import { useDispatch } from "react-redux";
import { reduxStore } from "../../src/redux/with-redux-store";
import { editReview } from "../../src/redux/reviews/actions";
interface ReviewAddPageProps {}

const ReviewAddPage: React.FunctionComponent<ReviewAddPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <ReviewEdit />
      <Footer />
    </>
  );
};

export default ReviewAddPage;
