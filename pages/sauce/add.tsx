import * as React from "react";

import SauceAdd from "../../src/components/SauceAdd/SauceAdd";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import { Article } from "../../src/components/Article/Article";
import Footer from "../../src/components/Footer/Footer";

interface SauceAddPageProps {}

const SauceAddPage: React.FunctionComponent<SauceAddPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <Article size="md">
        <SauceAdd />
      </Article>
      <Footer />
    </>
  );
};

export default SauceAddPage;
