import * as React from "react";
import RegisterUser from "../../src/components/RegisterUser/RegisterUser";
import { Article } from "../../src/components/Article/Article";
import HeaderSimple from "../../src/components/HeaderSimple/HeaderSimple";

export interface RegisterProps {}

const Register: React.SFC<RegisterProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <RegisterUser />
      </Article>
    </>
  );
};

export default Register;
