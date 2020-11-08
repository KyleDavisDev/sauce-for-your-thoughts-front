import * as React from "react";
import { Article } from "../../../src/components/Article/Article";
import HeaderSimple from "../../../src/components/HeaderSimple/HeaderSimple";
import UpdatePassword from "../../../src/components/UpdatePassword/UpdatePassword";

export interface PasswordPageProps {}

const PasswordPage: React.SFC<PasswordPageProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <UpdatePassword />
      </Article>
    </>
  );
};

export default PasswordPage;
