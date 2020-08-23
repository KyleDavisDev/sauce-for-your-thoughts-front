import * as React from "react";

import ApproveSubmissions from "../../../src/components/ApproveSubmissions/ApproveSubmissions";
import TopBar from "../../../src/components/TopBar/TopBar";
import Navigation from "../../../src/components/Navigation/Navigation";
import { Article } from "../../../src/components/Article/Article";
import Footer from "../../../src/components/Footer/Footer";

interface IApproveProps {}

const Approve: React.SFC<IApproveProps> = () => {
  return (
    <>
      <TopBar />
      <Navigation />
      <Article size="md">
        <ApproveSubmissions />
      </Article>
      <Footer />
    </>
  );
};

export default Approve;
