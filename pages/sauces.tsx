import * as React from "react";

import Sauces from "../src/components/Sauces/Sauces";
import TopBar from "../src/components/TopBar/TopBar";
import Navigation from "../src/components/Navigation/Navigation";
import { Article } from "../src/components/Article/Article";
import Footer from "../src/components/Footer/Footer";

interface ISaucesPageProps {}

const SaucesPage: React.FunctionComponent<ISaucesPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <Article size="lg">
        <Sauces />
      </Article>
      <Footer />
    </>
  );
};

export default SaucesPage;
