import * as React from "react";
import RequestPasswordReset from "../../../src/components/RequestPasswordReset/RequestPasswordReset";
import HeaderSimple from "../../../src/components/HeaderSimple/HeaderSimple";
import { Article } from "../../../src/components/Article/Article";

export interface ResetPasswordPageProps {}

const ResetPasswordPage: React.SFC<ResetPasswordPageProps> = () => {
  return (
    <>
      <HeaderSimple />
      <Article size="sm">
        <RequestPasswordReset />
      </Article>
    </>
  );
};

export default ResetPasswordPage;
