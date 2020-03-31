import * as React from "react";
import LogoutUser from "../../src/components/LogoutUser/LogoutUser";

export interface LogoutProps {}

const Logout: React.SFC<LogoutProps> = () => {
  return <LogoutUser />;
};

export default Logout;
