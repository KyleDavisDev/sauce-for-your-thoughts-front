import * as React from "react";
import UpdateDisplayName from "../../../src/components/UpdateDisplayName/UpdateDisplayName";
import HeaderSimple from "../../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../../src/components/Article/Article";

export interface DisplayNamePageProps {}

const DisplayNamePage: React.SFC<DisplayNamePageProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <UpdateDisplayName />
      </Article>
    </>
  );
};

export default DisplayNamePage;
