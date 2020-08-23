import * as React from "react";

import SauceEdit from "../../src/components/SauceEdit/SauceEdit";
import TopBar from "../../src/components/TopBar/TopBar";
import Navigation from "../../src/components/Navigation/Navigation";
import { Article } from "../../src/components/Article/Article";
import Footer from "../../src/components/Footer/Footer";

interface SauceEditPageProps {}

const SauceEditPage: React.FunctionComponent<SauceEditPageProps> = props => {
  return (
    <>
      <TopBar />
      <Navigation />
      <Article size="md">
        <SauceEdit />
      </Article>
      <Footer />
    </>
  );
};

export default SauceEditPage;
