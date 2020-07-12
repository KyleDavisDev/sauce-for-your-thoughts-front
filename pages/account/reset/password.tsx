import * as React from "react";
import ResetPassword from "../../../src/components/ResetPassword/ResetPassword";
import HeaderSimple from "../../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../../src/components/Article/Article";

export interface RegisterProps {}

const Register: React.SFC<RegisterProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <ResetPassword />
      </Article>
    </>
  );
};

export default Register;
