import * as React from "react";
import RegisterUser from "../../src/components/RegisterUser/RegisterUser";

export interface RegisterProps {}

const Register: React.SFC<RegisterProps> = () => {
  return <RegisterUser />;
};

export default Register;
