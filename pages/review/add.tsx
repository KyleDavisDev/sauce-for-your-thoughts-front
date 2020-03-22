import * as React from "react";

import ReviewForm from "../../src/components/ReviewForm/ReviewForm";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import Footer from "../../src/components/Footer/Footer";

interface ReviewAddPageProps {}

const ReviewAddPage: React.FunctionComponent<ReviewAddPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <ReviewForm />
      <Footer />
    </>
  );
};

export default ReviewAddPage;
