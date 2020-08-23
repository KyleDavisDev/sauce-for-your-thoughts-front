import * as React from "react";
import LoginUser from "../../src/components/LoginUser/LoginUser";
import HeaderSimple from "../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../src/components/Article/Article";

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <LoginUser />
      </Article>
    </>
  );
};

export default Login;
