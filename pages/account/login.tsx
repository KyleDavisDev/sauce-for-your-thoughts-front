import * as React from "react";
import LoginUser from "../../src/components/LoginUser/LoginUser";

export interface LoginProps {}

const Login: React.SFC<LoginProps> = () => {
  return <LoginUser />;
};

export default Login;
